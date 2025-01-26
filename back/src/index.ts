import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import z from "zod";
import type { ZodObject } from "zod";
import type { Spell, SpellWithOnlyName, StringTuple } from "src/types";
import type { Request, Response } from "express";

const DATABASE_FILE_PATH = "database/spellbook.db";
const ERROR_STATUS_CLIENT = 400;
const PORT = 3000;
const TABLE_NAME = "d20pfsrd";
const NAME_COLUMN = "name";
const DATABASE_PLACEHOLDER_CHARACTER = "?,";

const database = new sqlite3.Database(DATABASE_FILE_PATH, (err) => {
    if (err) {
        console.error("Could not open database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

let validSpellNames: string[] = [];
let SpellRequestSchema: ZodObject<any>;

database.all(
    `SELECT ${NAME_COLUMN} FROM ${TABLE_NAME};`,
    (_, rows: SpellWithOnlyName[]) => {
        validSpellNames = rows.map((spell) => spell.name);
        SpellRequestSchema = z.object({
            spellNames: z.array(z.enum(validSpellNames as StringTuple)),
        });
    }
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/spells", async (request: Request, response: Response) => {
    try {
        const validatedRequest = SpellRequestSchema.parse(request.body);
        const spellNames: string[] = validatedRequest.spellNames.map(
            (validatedSpellName: string) => {
                return validSpellNames[
                    /* Call it paranoia, but I still don't want to pass user input
                    directly to the DB even though we've validated it through the
                    SpellRequestSchema. Doing it this way means we only pass our
                    server-defined values to the DB, making SQL injection impossible. */
                    validSpellNames.indexOf(validatedSpellName)
                ];
            }
        );

        const spells = await queryDatabaseForSpells(spellNames);
        console.log(spells);
        response.send(spells);
    } catch (error) {
        console.log(error);
        response.status(ERROR_STATUS_CLIENT);
        response.send("Invalid spell request\n");
    }
});

app.listen(PORT, () => {
    console.log(`Spellbook app listenin on localhost:${PORT}`);
});

async function queryDatabaseForSpells(spellNames: string[]): Promise<Spell[]> {
    return new Promise((resolve, reject) => {
        database.all(
            `SELECT * FROM ${TABLE_NAME} WHERE name IN (${DATABASE_PLACEHOLDER_CHARACTER.repeat(
                spellNames.length
            )})`,
            spellNames,
            (error, rows: Spell[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}
