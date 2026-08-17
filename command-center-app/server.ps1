<#
  Command Center — local game server (zero install).

  Serves the game and stores your save in a plain-text file you can edit
  by hand:  save-data.json

  Start it:   right-click server.ps1 -> "Run with PowerShell"
              (or:  powershell -ExecutionPolicy Bypass -File server.ps1)
  Then open:  http://localhost:8080
  Stop it:    press Ctrl+C in the window

  API
    GET  /api/state  -> contents of save-data.json
    POST /api/state  -> overwrites save-data.json
#>

param(
  [int]$Port = 8080,
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$root     = Split-Path -Parent $MyInvocation.MyCommand.Path
$saveFile = Join-Path $root 'save-data.json'
# the shared art library lives beside this folder: fin-game\assets
$assetRoot = [System.IO.Path]::GetFullPath((Join-Path $root '..\assets'))

# ---------------------------------------------------------------- save file
if (-not (Test-Path $saveFile)) {
  '{}' | Out-File -FilePath $saveFile -Encoding utf8
  Write-Host "Created a new save file: $saveFile" -ForegroundColor Yellow
}

function Read-Save {
  try { return (Get-Content -Path $saveFile -Raw -Encoding UTF8) }
  catch { return '{}' }
}

function Write-Save([string]$json) {
  # write to a temp file then move, so an editor never sees a half-written file
  $tmp = "$saveFile.tmp"
  [System.IO.File]::WriteAllText($tmp, $json, (New-Object System.Text.UTF8Encoding($false)))
  Move-Item -Path $tmp -Destination $saveFile -Force
}

# ---------------------------------------------------------------- mime types
$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.htm'  = 'text/html; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.woff' = 'font/woff'
  '.woff2'= 'font/woff2'
}

# ---------------------------------------------------------------- listener
$listener = New-Object System.Net.HttpListener
$prefix   = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Write-Host ""
  Write-Host "Could not open $prefix" -ForegroundColor Red
  Write-Host $_.Exception.Message -ForegroundColor Red
  Write-Host ""
  Write-Host "Usually this means the port is already in use, or Windows wants" -ForegroundColor Yellow
  Write-Host "permission. Try a different port:" -ForegroundColor Yellow
  Write-Host "    powershell -ExecutionPolicy Bypass -File server.ps1 -Port 8090" -ForegroundColor Cyan
  Write-Host "or re-run this window as Administrator once." -ForegroundColor Yellow
  Read-Host "Press Enter to close"
  exit 1
}

Write-Host ""
Write-Host "  Command Center is running" -ForegroundColor Green
Write-Host "  --------------------------------------------" -ForegroundColor DarkGray
Write-Host "  Play at :  $prefix" -ForegroundColor Cyan
Write-Host "  Save file: $saveFile" -ForegroundColor Cyan
Write-Host "  (edit that file by hand any time - then press Sync in the game)" -ForegroundColor DarkGray
Write-Host "  Stop with Ctrl+C" -ForegroundColor DarkGray
Write-Host ""

if (-not $NoBrowser) { Start-Process $prefix }

# ---------------------------------------------------------------- serve loop
try {
  while ($listener.IsListening) {

    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $path = $req.Url.AbsolutePath

    try {
      # ---------- API ----------
      if ($path -eq '/api/state') {

        if ($req.HttpMethod -eq 'GET') {
          $body = Read-Save
          $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
          $res.ContentType = 'application/json; charset=utf-8'
          $res.Headers.Add('Cache-Control', 'no-store')
          $res.ContentLength64 = $bytes.Length
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        elseif ($req.HttpMethod -eq 'POST') {
          $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
          $body = $reader.ReadToEnd()
          $reader.Close()
          # only write if it actually parses as JSON - never corrupt the save
          $ok = $true
          try { $null = ConvertFrom-Json $body } catch { $ok = $false }
          if ($ok) {
            Write-Save $body
            $out = '{"ok":true}'
          } else {
            $res.StatusCode = 400
            $out = '{"ok":false,"error":"invalid JSON"}'
          }
          $bytes = [System.Text.Encoding]::UTF8.GetBytes($out)
          $res.ContentType = 'application/json; charset=utf-8'
          $res.ContentLength64 = $bytes.Length
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
          $res.StatusCode = 405
        }
      }
      # ---------- static files ----------
      else {
        if ($path -eq '/') { $path = '/index.html' }
        $rel = [uri]::UnescapeDataString($path.TrimStart('/')) -replace '/', '\'

        # /assets/... is served straight from the real asset library next door,
        # so nothing has to be duplicated into this folder.
        if ($rel -like 'assets\*') {
          $file = Join-Path $assetRoot ($rel.Substring(7))
          $baseDir = $assetRoot
        } else {
          $file = Join-Path $root $rel
          $baseDir = $root
        }

        $full = [System.IO.Path]::GetFullPath($file)
        if (-not $full.StartsWith([System.IO.Path]::GetFullPath($baseDir))) {
          $res.StatusCode = 403
        }
        elseif (Test-Path $full -PathType Leaf) {
          $ext = [System.IO.Path]::GetExtension($full).ToLower()
          $ct  = $mime[$ext]
          if (-not $ct) { $ct = 'application/octet-stream' }
          $bytes = [System.IO.File]::ReadAllBytes($full)
          $res.ContentType = $ct
          $res.Headers.Add('Cache-Control', 'no-store')
          $res.ContentLength64 = $bytes.Length
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
          $res.StatusCode = 404
          $bytes = [System.Text.Encoding]::UTF8.GetBytes('Not found: ' + $path)
          $res.ContentLength64 = $bytes.Length
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
      }
    }
    catch {
      Write-Host ("  ! " + $_.Exception.Message) -ForegroundColor Red
      try { $res.StatusCode = 500 } catch {}
    }
    finally {
      try { $res.OutputStream.Close() } catch {}
    }
  }
}
finally {
  try { $listener.Stop(); $listener.Close() } catch {}
  Write-Host "Server stopped." -ForegroundColor Yellow
}
