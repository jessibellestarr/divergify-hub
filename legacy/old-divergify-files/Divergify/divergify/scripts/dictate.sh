#!/usr/bin/env bash
set -euo pipefail

secs=${1:-6}
WHISPER_ROOT="${WHISPER_ROOT:-$HOME/Tools/whisper.cpp}"
MODEL_SIZE="${DICTATE_MODEL:-base}"
MODEL_PATH="$WHISPER_ROOT/models/ggml-${MODEL_SIZE}.bin"
MAIN_BIN="$WHISPER_ROOT/main"

if ! command -v rec >/dev/null 2>&1; then
  echo "Missing 'rec' binary (SoX). Install with 'sudo apt install sox'." >&2
  exit 1
fi
if [ ! -x "$MAIN_BIN" ]; then
  echo "Cannot find whisper.cpp binary at $MAIN_BIN. Run scripts/install-local-dictation.sh first." >&2
  exit 1
fi
if [ ! -f "$MODEL_PATH" ]; then
  echo "Model $MODEL_PATH not found. Set DICTATE_MODEL or rerun install script." >&2
  exit 1
fi

TMP_WAV="$(mktemp --suffix=.wav)"
cleanup() {
  rm -f "$TMP_WAV" "$TMP_WAV.txt"
}
trap cleanup EXIT

echo "Recording ${secs}s of audio..."
rec --channels=1 --rate=16000 --type wav "$TMP_WAV" trim 0 "$secs"

echo "Transcribing with whisper.cpp (${MODEL_SIZE})..."
"$MAIN_BIN" -m "$MODEL_PATH" -f "$TMP_WAV" -otxt --no-timestamps --threads "${DICTATE_THREADS:-4}" > "$TMP_WAV.txt"

cat "$TMP_WAV.txt"
if command -v xclip >/dev/null 2>&1; then
  xclip -selection clipboard < "$TMP_WAV.txt"
  echo "\n(Transcript copied to clipboard)"
fi
