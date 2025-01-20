#!/bin/sh

DB_PATH='./database/spellbook.db'

yarn tsc

if [ ! -f "$DB_PATH" ]; then
    cd database/
    ./setup_database.sh
    cd ../
fi

node index.js