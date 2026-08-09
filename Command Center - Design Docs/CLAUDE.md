# Design Docs versioning rule

Files in this folder follow a `NN-name.md` / `NN-name-v2.md` / `NN-name-v3.md`
naming pattern (e.g. `02-game-design-document.md`, `-v2`, `-v3`, ...).

Whenever a brand new version of a doc shows up in this folder (a new
`-vN` file, or an unversioned doc gets superseded by a `-v2`), move the
previous version into `old/` so the top level only ever holds the latest
version of each doc. Keep the moved file's name as-is (don't rename it on
the way in). Create `old/` if it doesn't exist yet.

This applies whenever new/updated files are noticed in this folder during a
session — no need to wait for an explicit request to "clean up" or "archive".
