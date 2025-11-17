#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4173}"
HOST="${HOST:-0.0.0.0}"

printf '\nStarter lokal server på http://%s:%s – åbn linket i din browser.\n' "$HOST" "$PORT"
printf 'Stop serveren igen med Ctrl + C.\n\n'

python3 -m http.server "$PORT" --bind "$HOST"
