import sqlite3 from "sqlite3";
import fs from "fs";
import csv from "csv-parser";
import z from "zod";

const DATABASE_FILE_PATH = "./src/database/spellbook.db";
const INITIAL_CSV_FILE_PATH = "./src/database/spellbook.csv";
const CSV_FALSE = "0";
const CSV_TRUE = "1";
const STRING_NULL = "NULL";
const SPELLS_TABLE_NAME = "spells_d20pfsrd";

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

const numberOrNullFromNullableString = z.string().transform((val) => {
    return val === STRING_NULL ? null : Number(val);
});

const stringFromStringOrNull = z.string().transform((val) => {
    if (val === "" || val === STRING_NULL) {
        return "";
    }
    return val;
});

const D20pfsrdSpellSchema = z.object({
    name: stringFromStringOrNull,
    school: stringFromStringOrNull,
    subschool: stringFromStringOrNull,
    descriptor: stringFromStringOrNull,
    spell_level: stringFromStringOrNull,
    casting_time: stringFromStringOrNull,
    components: stringFromStringOrNull,
    costly_components: booleanFromString,
    range: stringFromStringOrNull,
    area: stringFromStringOrNull,
    effect: stringFromStringOrNull,
    targets: stringFromStringOrNull,
    duration: stringFromStringOrNull,
    dismissible: booleanFromString,
    shapeable: booleanFromString,
    saving_throw: stringFromStringOrNull,
    spell_resistance: stringFromStringOrNull,
    description: stringFromStringOrNull,
    description_formatted: stringFromStringOrNull,
    source: stringFromStringOrNull,
    full_text: stringFromStringOrNull,
    verbal: booleanFromString,
    somatic: booleanFromString,
    material: booleanFromString,
    focus: booleanFromString,
    divine_focus: booleanFromString,
    sor: numberOrNullFromNullableString,
    wiz: numberOrNullFromNullableString,
    cleric: numberOrNullFromNullableString,
    druid: numberOrNullFromNullableString,
    ranger: numberOrNullFromNullableString,
    bard: numberOrNullFromNullableString,
    paladin: numberOrNullFromNullableString,
    alchemist: numberOrNullFromNullableString,
    summoner: numberOrNullFromNullableString,
    witch: numberOrNullFromNullableString,
    inquisitor: numberOrNullFromNullableString,
    oracle: numberOrNullFromNullableString,
    antipaladin: numberOrNullFromNullableString,
    magus: numberOrNullFromNullableString,
    adept: numberOrNullFromNullableString,
    bloodrager: numberOrNullFromNullableString,
    shaman: numberOrNullFromNullableString,
    psychic: numberOrNullFromNullableString,
    medium: numberOrNullFromNullableString,
    mesmerist: numberOrNullFromNullableString,
    occultist: numberOrNullFromNullableString,
    spiritualist: numberOrNullFromNullableString,
    skald: numberOrNullFromNullableString,
    investigator: numberOrNullFromNullableString,
    hunter: numberOrNullFromNullableString,
    summoner_unchained: numberOrNullFromNullableString,
    deity: stringFromStringOrNull,
    SLA_Level: numberOrNullFromNullableString,
    domain: stringFromStringOrNull,
    short_description: stringFromStringOrNull,
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
    linktext: stringFromStringOrNull,
    material_costs: numberOrNullFromNullableString,
    bloodline: stringFromStringOrNull,
    patron: stringFromStringOrNull,
    mythic_text: stringFromStringOrNull,
    augmented: stringFromStringOrNull,
    haunt_statistics: stringFromStringOrNull,
});
type D20pfsrdSpell = z.infer<typeof D20pfsrdSpellSchema>;

function main() {
    const spells: D20pfsrdSpell[] = [];

    fs.createReadStream(INITIAL_CSV_FILE_PATH)
        .pipe(csv())
        .on("data", (data: { [key: string]: string }) => {
            const validatedData = D20pfsrdSpellSchema.parse(data);
            spells.push(validatedData);
        })
        .on("end", () => {
            insertIntoDatabase(spells);
        });
}

function insertIntoDatabase(spells: D20pfsrdSpell[]) {
    for (const spell of spells) {
        const columnNames = Object.keys(spell).join(", ");
        const valueIndexes = Object.values(spell)
            .map((_, index) => `$${index + 1}`)
            .join(", ");
        const query = `
            INSERT INTO ${SPELLS_TABLE_NAME} (
                ${columnNames}
            ) VALUES (
                ${valueIndexes}
            )
        `;
        database.run(query, Object.values(spell));
    }
}

main();
