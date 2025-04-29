#!/bin/bash

echo "🏢 Starting BPO Management System Prototype"
echo "-------------------------------------------"

# Check if python is available (for simple HTTP server)
if command -v python3 &>/dev/null; then
    echo "Starting server with Python 3..."
    python3 -m http.server 8000
elif command -v python &>/dev/null; then
    echo "Starting server with Python..."
    python -m SimpleHTTPServer 8000
else
    echo "Python not found. Please open index.html directly in your browser."
    # Try to open with default browser on different OSes
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open index.html
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        open index.html
    elif [[ "$OSTYPE" == "msys" ]]; then
        start index.html
    else
        echo "Please open index.html manually in your browser."
    fi
fi 