#!/bin/sh

cd ../src/database/

echo "Creating database."
ts-node setup.ts
echo "Populating database (this can take a while)."
ts-node populateDatabase.ts
echo "Database setup complete!"
