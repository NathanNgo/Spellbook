import sqlite3 from "sqlite3";
import fs from "fs";
import csv from "csv-parser";
import z from "zod";
import type { Spell, SpellFromCSV } from "src/types";

const DATABASE_FILE_PATH = "spellbook.db";
const INITIAL_CSV_FILE_PATH = "./spellbook.csv";
const CSV_FALSE = "0";
const CSV_TRUE = "1";
const STRING_NULL = "NULL";
const TABLE_NAME = "d20pfsrd";

const database = new sqlite3.Database(DATABASE_FILE_PATH);

const booleanFromString = z.string().transform((val) => {
    if (val === CSV_TRUE) {
        return true;
    }
    if (val === CSV_FALSE) {
        return false;
    }
    throw new Error(`Invalid boolean value: ${val}`);
});

const numberFromNullableString = z.string().transform((val) => {
    return val === STRING_NULL ? null : Number(val);
});

const stringOrNull = z.string().transform((val) => {
    if (val === "" || val === STRING_NULL) {
        return null;
    }
    return val;
});

const D20PfsrdSchema = z.object({
    name: z.string(),
    school: z.string(),
    subschool: stringOrNull,
    descriptor: stringOrNull,
    spell_level: z.string(),
    casting_time: z.string(),
    components: z.string(),
    costly_components: booleanFromString,
    range: z.string(),
    area: stringOrNull,
    effect: stringOrNull,
    targets: stringOrNull,
    duration: z.string(),
    dismissible: booleanFromString,
    shapeable: booleanFromString,
    saving_throw: stringOrNull,
    spell_resistance: stringOrNull,
    description: stringOrNull,
    description_formatted: stringOrNull,
    source: stringOrNull,
    full_text: stringOrNull,
    verbal: booleanFromString,
    somatic: booleanFromString,
    material: booleanFromString,
    focus: booleanFromString,
    divine_focus: booleanFromString,
    sor: numberFromNullableString,
    wiz: numberFromNullableString,
    cleric: numberFromNullableString,
    druid: numberFromNullableString,
    ranger: numberFromNullableString,
    bard: numberFromNullableString,
    paladin: numberFromNullableString,
    alchemist: numberFromNullableString,
    summoner: numberFromNullableString,
    witch: numberFromNullableString,
    inquisitor: numberFromNullableString,
    oracle: numberFromNullableString,
    antipaladin: numberFromNullableString,
    magus: numberFromNullableString,
    adept: numberFromNullableString,
    bloodrager: numberFromNullableString,
    shaman: numberFromNullableString,
    psychic: numberFromNullableString,
    medium: numberFromNullableString,
    mesmerist: numberFromNullableString,
    occultist: numberFromNullableString,
    spiritualist: numberFromNullableString,
    skald: numberFromNullableString,
    investigator: numberFromNullableString,
    hunter: numberFromNullableString,
    summoner_unchained: numberFromNullableString,
    deity: stringOrNull,
    SLA_Level: numberFromNullableString,
    domain: stringOrNull,
    short_description: stringOrNull,
    acid: booleanFromString,
    chaotic: booleanFromString,
    cold: booleanFromString,
    curse: booleanFromString,
    darkness: booleanFromString,
    death: booleanFromString,
    disease: booleanFromString,
    earth: booleanFromString,
    electricity: booleanFromString,
    emotion: booleanFromString,
    evil: booleanFromString,
    fear: booleanFromString,
    fire: booleanFromString,
    force: booleanFromString,
    good: booleanFromString,
    language_dependent: booleanFromString,
    lawful: booleanFromString,
    light: booleanFromString,
    mind_affecting: booleanFromString,
    pain: booleanFromString,
    shadow: booleanFromString,
    sonic: booleanFromString,
    water: booleanFromString,
    ruse: booleanFromString,
    draconic: booleanFromString,
    meditative: booleanFromString,
    mythic: booleanFromString,
    linktext: stringOrNull,
    material_costs: numberFromNullableString,
    bloodline: stringOrNull,
    patron: stringOrNull,
    mythic_text: stringOrNull,
    augmented: stringOrNull,
    haunt_statistics: stringOrNull,
});

function main() {
    const spells: Spell[] = [];

    fs.createReadStream(INITIAL_CSV_FILE_PATH)
        .pipe(csv())
        .on("data", (data: SpellFromCSV) => {
            const validatedData = D20PfsrdSchema.parse(data);
            spells.push(validatedData);
        })
        .on("end", () => {
            insertIntoDatabase(spells);
        });
}

function insertIntoDatabase(spells: Spell[]) {
    for (const spell of spells) {
        const columnNames = Object.keys(spell).join(", ");
        const valueIndexes = Object.values(spell)
            .map((_, index) => `$${index + 1}`)
            .join(", ");
        const query = `
            INSERT INTO ${TABLE_NAME} (
                ${columnNames}
            ) VALUES (
                ${valueIndexes}
            )
        `;
        database.run(query, Object.values(spell));
    }
}

main();
