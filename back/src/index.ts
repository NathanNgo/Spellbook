import express from 'express'
import sqlite3 from "sqlite3"
import type { Request, Response } from 'express'

const DATABASE_FILE_PATH = "database/spellbook.db"

const app = express()
const port = 3000

const database = new sqlite3.Database(DATABASE_FILE_PATH,  (err) => {
  if (err) {
    console.error("Could not open database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

app.get('/', (_: Request, res: Response) => {
  database.all("SELECT * FROM d20pfsrd WHERE name = 'Fireball' OR name = 'Magic Missle' OR name = 'Wish';", (_, rows) => {
    console.log(rows)
    res.send(rows)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})