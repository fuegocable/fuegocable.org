#!/usr/bin/env bash

# Remove unnecessary metadata from staged raster images.
# Requires ExifTool.

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR/../

if ! command -v exiftool >/dev/null 2>&1; then
  echo "Error: exiftool is not installed." >&2
  exit 1
fi

while IFS= read -r -d '' file; do
  case "${file,,}" in
    *.jpg|*.jpeg|*.png|*.gif|*.tif|*.tiff|*.bmp|*.webp|*.avif|*.heic|*.heif)
      ;;
    *)
      continue
      ;;
  esac

  # Ignore files that no longer exist in the working tree.
  if [[ ! -f "$file" ]]; then
    echo "Error: staged image is missing from the working tree: $file" >&2
    exit 1
  fi

  echo "Removing metadata from: $file" >&2

  # Preserve ICC profiles and orientation where supported.
  if ! exiftool \
    -all= \
    --icc_profile:all \
    -tagsfromfile @ -orientation \
    -overwrite_original \
    "$file"; then
    echo "Error: failed to process $file" >&2
    exit 1
  fi

  # Add the sanitized image to the index.
  git add -- "$file"

done < <(git diff --cached --name-only --diff-filter=ACMR -z)
