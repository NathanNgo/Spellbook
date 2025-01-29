#!/bin/sh

DB_PATH='./database/spellbook.db'

if [ ! -f "$DB_PATH" ]; then
    cd database/
    ./setup_database.sh
    cd ../
fi

nodemon index.ts
