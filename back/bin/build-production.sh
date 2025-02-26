#!/bin/sh

yarn tsc

cd ../src/database/
echo "Creating database."
node setup.js
echo "Populating database (this can take a while)."
node populateDatabase.js
echo "Database setup complete!"