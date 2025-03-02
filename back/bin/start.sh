#!/bin/sh

WORKDIR=$1

DB_PATH="${WORKDIR}/src/database/spellbook.db"

if [ ! -f "$DB_PATH" ]; then
    bash "${WORKDIR}/bin/setup_database.sh" "${WORKDIR}"
fi

nodemon "${WORKDIR}/src/index.ts"
