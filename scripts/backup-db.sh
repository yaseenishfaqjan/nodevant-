#!/usr/bin/env bash
# Nodevant — daily Postgres backup. Dumps the leads DB, gzips it, and prunes
# backups older than KEEP_DAYS. Intended to run from cron on the VPS.
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/opt/nodevant/backups}"
KEEP_DAYS="${KEEP_DAYS:-14}"
DB_CONTAINER="${DB_CONTAINER:-nodevant-db}"
DB_USER="${DB_USER:-nodevant}"
DB_NAME="${DB_NAME:-nodevant}"

mkdir -p "$BACKUP_DIR"
TS="$(date +%F_%H%M%S)"
OUT="$BACKUP_DIR/nodevant-$TS.sql.gz"

docker exec "$DB_CONTAINER" pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$OUT"

# prune old backups
find "$BACKUP_DIR" -name 'nodevant-*.sql.gz' -mtime "+$KEEP_DAYS" -delete 2>/dev/null || true

echo "$(date '+%F %T') backup ok -> $OUT ($(du -h "$OUT" | cut -f1))"
