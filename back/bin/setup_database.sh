#!/bin/sh

WORKDIR=$1

echo "Creating database."
ts-node "${WORKDIR}/src/database/setup.ts"
echo "Populating database (this can take a while)."
ts-node "${WORKDIR}/src/database/populateDatabase.ts"
echo "Database setup complete"
