#!/bin/bash

echo "[+] Bootstrapping Goby backend..."

# Check Python
if ! command -v python3 &> /dev/null; then
  echo "[-] Python3 not found. Aborting."
  exit 1
fi

# Create venv and install
python3 -m venv goby_venv
source goby_venv/bin/activate
pip install -r requirements.txt

# Launch
uvicorn main:app --host 127.0.0.1 --port 8000 --reload