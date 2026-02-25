#!/usr/bin/env bash
set -euo pipefail

echo "=== ELLA Agent Browser Setup ==="

# Check if agent-browser is installed
if ! command -v agent-browser &>/dev/null; then
  echo "Installing agent-browser globally..."
  pnpm add -g agent-browser
fi

# Install/verify Chromium
echo "Ensuring Chromium is installed..."
agent-browser install

# Create profile directory
PROFILE_DIR=".browser-profile"
if [ ! -d "$PROFILE_DIR" ]; then
  echo "Creating browser profile at $PROFILE_DIR..."
  mkdir -p "$PROFILE_DIR"
fi

echo ""
echo "Setup complete! Profile directory: $PROFILE_DIR"
echo ""
echo "To initialize a session with your local Payload CMS:"
echo "  agent-browser --headed open http://localhost:3000/admin"
echo "  (Log in manually, then close — session is saved to the profile)"
echo ""
echo "After that, agent-browser commands will reuse the authenticated session."
