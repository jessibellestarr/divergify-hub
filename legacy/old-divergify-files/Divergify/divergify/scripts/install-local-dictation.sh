#!/usr/bin/env bash
set -euo pipefail

print_step() {
  printf '\n[%s] %s\n' "dictation" "$1"
}

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WHISPER_ROOT="${WHISPER_ROOT:-$HOME/Tools/whisper.cpp}"
SCRIPT_TARGET_DIR="${DICTATE_BIN_DIR:-$HOME/Scripts}"
MODEL_SIZE="${DICTATE_MODEL:-base}"

APT_PACKAGES=(ffmpeg sox xclip build-essential git pkg-config libportaudio2 portaudio19-dev)

if command -v apt-get >/dev/null 2>&1; then
  MISSING=()
  for pkg in "${APT_PACKAGES[@]}"; do
    if ! dpkg -s "$pkg" >/dev/null 2>&1; then
      MISSING+=("$pkg")
    fi
  done
  if (( ${#MISSING[@]} > 0 )); then
    print_step "Installing packages: ${MISSING[*]}"
    sudo apt-get update
    sudo apt-get install -y "${MISSING[@]}"
  else
    print_step "All required apt packages already installed"
  fi
else
  print_step "Skipping apt packages (apt-get unavailable); install dependencies manually"
fi

if [ ! -d "$WHISPER_ROOT" ]; then
  print_step "Cloning whisper.cpp into $WHISPER_ROOT"
  git clone https://github.com/ggerganov/whisper.cpp.git "$WHISPER_ROOT"
else
  print_step "Updating whisper.cpp in $WHISPER_ROOT"
  git -C "$WHISPER_ROOT" pull --ff-only
fi

print_step "Building whisper binaries"
if make -C "$WHISPER_ROOT" main stream; then
  :
elif make -C "$WHISPER_ROOT" whisper stream; then
  :
else
  echo "Failed to build whisper binaries. Try running 'cmake -B build' followed by 'cmake --build build'" >&2
  exit 1
fi

MODEL_PATH="$WHISPER_ROOT/models/ggml-${MODEL_SIZE}.bin"
if [ ! -f "$MODEL_PATH" ]; then
  print_step "Downloading model ggml-${MODEL_SIZE}.bin"
  (cd "$WHISPER_ROOT" && ./models/download-ggml-model.sh "$MODEL_SIZE")
else
  print_step "Model ggml-${MODEL_SIZE}.bin already present"
fi

mkdir -p "$SCRIPT_TARGET_DIR"
print_step "Installing dictate helper into $SCRIPT_TARGET_DIR"
install -m 755 "$ROOT_DIR/scripts/dictate.sh" "$SCRIPT_TARGET_DIR/dictate"

print_step "Done. Try running: $SCRIPT_TARGET_DIR/dictate 8"
