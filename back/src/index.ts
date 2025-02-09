import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import z from "zod";
import type { ZodObject } from "zod";
import type { StringTuple } from "src/types";
import type { Request, Response } from "express";
import type { ManifestSpellDetail, Spell } from "src/schemas";
import { ManifestSpellDetailArraySchema, SpellArraySchema } from "src/schemas";
import { toCamel } from "snake-camel";

const DATABASE_FILE_PATH = "database/spellbook.db";
const ERROR_STATUS_CLIENT = 400;
const PORT = 3000;
const TABLE_NAME = "d20pfsrd";
const NAME_COLUMN = "name";
const DATABASE_PLACEHOLDER_CHARACTER = "?";

const database = new sqlite3.Database(DATABASE_FILE_PATH, (err) => {
    if (err) {
        console.error("Could not open database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

let validSpellNames: string[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let SpellRequestSchema: ZodObject<any>;
database.all(
    `SELECT ${NAME_COLUMN} FROM ${TABLE_NAME};`,
    (_, rows: { [key: string]: string }[]) => {
        validSpellNames = rows.map((spell) => spell.name);
        SpellRequestSchema = z.object({
            spellNames: z.array(z.enum(validSpellNames as StringTuple)),
        });
    }
);

let manifestDetails: { [key: string]: string | number | null }[];
database.all(
    `
        SELECT
            name,
            id,
            short_description,
            sor,
            wiz,
            cleric,
            druid,
            ranger,
            bard,
            paladin,
            alchemist,
            summoner,
            witch,
            inquisitor,
            oracle,
            antipaladin,
            magus,
            adept,
            bloodrager,
            shaman,
            psychic,
            medium,
            mesmerist,
            occultist,
            spiritualist,
            skald,
            investigator,
            hunter,
            summoner_unchained
        FROM
            ${TABLE_NAME};
    `,
    (_, rows: { [key: string]: string | number | null }[]) => {
        manifestDetails = rows;
    }
);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/manifest", async (_: Request, response: Response) => {
    const manifest: ManifestSpellDetail[] =
        ManifestSpellDetailArraySchema.parse(manifestDetails);
    console.log(arrayToSnakeCase(manifest));
    response.send(arrayToSnakeCase(manifest));
});

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

        const spells: Spell[] = SpellArraySchema.parse(
            await queryDatabaseForSpells(spellNames)
        );

        console.log(arrayToSnakeCase(spells));
        response.send(arrayToSnakeCase(spells));
    } catch (error) {
        console.log(error);
        response.status(ERROR_STATUS_CLIENT);
        response.send("Invalid spell request\n");
    }
});

app.listen(PORT, () => {
    console.log(`Spellbook app listening on localhost:${PORT}`);
});

async function queryDatabaseForSpells(
    spellNames: string[]
): Promise<{ [key: string]: string | number | null }[]> {
    const placeholder_values = spellNames.map(
        () => DATABASE_PLACEHOLDER_CHARACTER
    );

    return new Promise((resolve, reject) => {
        database.all(
            `SELECT * FROM ${TABLE_NAME} WHERE name IN (${placeholder_values.join(
                ", "
            )})`,
            spellNames,
            (error, rows: { [key: string]: string | number | null }[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function arrayToSnakeCase(array: any[]): any[] {
    return array.map((item) => toCamel(item));
}
