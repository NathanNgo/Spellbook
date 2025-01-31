#!/bin/sh

DB_PATH='../src/database/spellbook.db'

if [ ! -f "$DB_PATH" ]; then
    ./setup_database.sh
fi

cd ../src/

nodemon index.ts
