import sqlite3 from "sqlite3";
import fs from "fs";

const DATABASE_FILE_PATH = "spellbook.db"
const DATABASE_SETUP_FILE = "./setup.sql"

const database = new sqlite3.Database(DATABASE_FILE_PATH)

function main() {
    const sqlQuery = fs.readFileSync(DATABASE_SETUP_FILE, { encoding: "utf8", flag: "r" })
    database.exec(sqlQuery)
}

main()