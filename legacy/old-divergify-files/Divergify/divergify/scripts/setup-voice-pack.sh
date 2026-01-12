#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARCHIVE="${VOICE_ARCHIVE:-$ROOT_DIR/resources/voice/divergify-voice-pack.zip}"
TARGET_DIR="${VOICE_TARGET:-$ROOT_DIR/services/voice}"
INSTALL_DEPS=1
FORCE=0

usage() {
  cat <<USAGE
Usage: ${0##*/} [options]
  --target <dir>    Destination directory (default: $TARGET_DIR)
  --archive <file>  Voice pack zip path (default: $ARCHIVE)
  --force           Replace existing directory
  --no-install      Skip npm install step
USAGE
}

while (( "$#" )); do
  case "$1" in
    --target)
      TARGET_DIR="$2"
      shift 2
      ;;
    --archive)
      ARCHIVE="$2"
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    --no-install)
      INSTALL_DEPS=0
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [ ! -f "$ARCHIVE" ]; then
  echo "Voice pack archive not found at $ARCHIVE" >&2
  exit 1
fi

if [ -d "$TARGET_DIR" ]; then
  if [ "$FORCE" -ne 1 ]; then
    echo "Target directory $TARGET_DIR already exists. Use --force to replace." >&2
    exit 1
  fi
  rm -rf "$TARGET_DIR"
fi

mkdir -p "$TARGET_DIR"
unzip -q "$ARCHIVE" -d "$TARGET_DIR"

env_file="$TARGET_DIR/.env"
if [ ! -f "$env_file" ] && [ -f "$TARGET_DIR/.env.example" ]; then
  cp "$TARGET_DIR/.env.example" "$env_file"
  sed -i 's/sk-REPLACE_ME//g' "$env_file"
  echo "Created $env_file. Fill in OPENAI_API_KEY before starting the service."
fi

if [ "$INSTALL_DEPS" -eq 1 ]; then
  if ! command -v npm >/dev/null 2>&1; then
    echo "npm is required to install voice pack dependencies." >&2
    exit 1
  fi
  echo "Installing voice pack dependencies..."
  npm install --prefix "$TARGET_DIR"
fi

echo "Voice service ready at $TARGET_DIR"
echo "Start it with: npm run dev --prefix $TARGET_DIR"
