#!/usr/bin/env bash
set -e

chmod 755 .env scripts/*.sh
./scripts/upload.sh
