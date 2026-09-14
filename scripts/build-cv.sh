#!/usr/bin/env bash
# Render cv.html -> assets/cv.pdf with headless Chrome.
# Page size and margins come from the @page rule in cv.html.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME" >&2
  echo "Set CHROME=/path/to/chrome and re-run." >&2
  exit 1
fi

mkdir -p assets
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/assets/cv.pdf" "file://$PWD/cv.html" 2>/dev/null

echo "wrote assets/cv.pdf ($(du -h assets/cv.pdf | cut -f1))"
