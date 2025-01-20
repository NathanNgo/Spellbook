import sqlite3 from "sqlite3"
import fs from "fs"
import csv from "csv-parser"
import z, { number } from "zod"

const DATABASE_FILE_PATH = "spellbook.db"
const INITIAL_CSV_FILE_PATH = "./spellbook.csv"
const CSV_FALSE = "0"
const CSV_TRUE = "1"
const STRING_NULL = "NULL"
const TABLE_NAME = "d20pfsrd"

const database = new sqlite3.Database(DATABASE_FILE_PATH)

type SpellFromCSV = {
    name: string;
    school: string;
    subschool: string;
    descriptor: string;
    spell_level: string;
    casting_time: string;
    components: string;
    costly_components: string;
    range: string;
    area: string;
    effect: string;
    targets: string;
    duration: string;
    dismissible: string;
    shapeable: string;
    saving_throw: string;
    spell_resistance: string;
    description: string;
    description_formatted: string;
    source: string;
    full_text: string;
    verbal: string;
    somatic: string;
    material: string;
    focus: string;
    divine_focus: string;
    sor: string;
    wiz: string;
    cleric: string;
    druid: string;
    ranger: string;
    bard: string;
    paladin: string;
    alchemist: string;
    summoner: string;
    witch: string;
    inquisitor: string;
    oracle: string;
    antipaladin: string;
    magus: string;
    adept: string;
    bloodrager: string;
    shaman: string;
    psychic: string;
    medium: string;
    mesmerist: string;
    occultist: string;
    spiritualist: string;
    skald: string;
    investigator: string;
    hunter: string;
    summoner_unchained: string;
    deity: string;
    SLA_Level: string;
    domain: string;
    short_description: string;
    acid: string;
    chaotic: string;
    cold: string;
    curse: string;
    darkness: string;
    death: string;
    disease: string;
    earth: string;
    electricity: string;
    emotion: string;
    evil: string;
    fear: string;
    fire: string;
    force: string;
    good: string;
    language_dependent: string;
    lawful: string;
    light: string;
    mind_affecting: string;
    pain: string;
    shadow: string;
    sonic: string;
    water: string;
    ruse: string;
    draconic: string;
    meditative: string;
    mythic: string;
    linktext: string;
    material_costs: string;
    bloodline: string;
    patron: string;
    mythic_text: string;
    augmented: string;
    haunt_statistics: string;
};

type Spell = {
    name: string;
    school: string;
    subschool: string | null;
    descriptor: string | null;
    spell_level: string;
    casting_time: string;
    components: string;
    costly_components: boolean;
    range: string;
    area: string | null;
    effect: string | null;
    targets: string | null;
    duration: string;
    dismissible: boolean;
    shapeable: boolean;
    saving_throw: string | null;
    spell_resistance: string | null;
    description: string | null;
    description_formatted: string | null;
    source: string | null;
    full_text: string | null;
    verbal: boolean;
    somatic: boolean;
    material: boolean;
    focus: boolean;
    divine_focus: boolean;
    sor: number | null;
    wiz: number | null;
    cleric: number | null;
    druid: number | null;
    ranger: number | null;
    bard: number | null;
    paladin: number | null;
    alchemist: number | null;
    summoner: number | null;
    witch: number | null;
    inquisitor: number | null;
    oracle: number | null;
    antipaladin: number | null;
    magus: number | null;
    adept: number | null;
    bloodrager: number | null;
    shaman: number | null;
    psychic: number | null;
    medium: number | null;
    mesmerist: number | null;
    occultist: number | null;
    spiritualist: number | null;
    skald: number | null;
    investigator: number | null;
    hunter: number | null;
    summoner_unchained: number | null;
    deity: string | null;
    SLA_Level: number | null;
    domain: string | null;
    short_description: string | null;
    acid: boolean;
    chaotic: boolean;
    cold: boolean;
    curse: boolean;
    darkness: boolean;
    death: boolean;
    disease: boolean;
    earth: boolean;
    electricity: boolean;
    emotion: boolean;
    evil: boolean;
    fear: boolean;
    fire: boolean;
    force: boolean;
    good: boolean;
    language_dependent: boolean;
    lawful: boolean;
    light: boolean;
    mind_affecting: boolean;
    pain: boolean;
    shadow: boolean;
    sonic: boolean;
    water: boolean;
    ruse: boolean;
    draconic: boolean;
    meditative: boolean;
    mythic: boolean;
    linktext: string | null;
    material_costs: number | null;
    bloodline: string | null;
    patron: string | null;
    mythic_text: string | null;
    augmented: string | null;
    haunt_statistics: string | null;
};

const booleanFromString = z
    .string()
    .transform((val) => {
        if (val === CSV_TRUE) {
            return true;
        }
        if (val === CSV_FALSE) {
            return false;
        }
        throw new Error(`Invalid boolean value: ${val}`)
    })

const numberFromNullableString = z
    .string()
    .transform((val) => {
        return val === STRING_NULL ? null : Number(val)
    })

const stringOrNull = z
  .string()
  .transform((val) => {
    if (val === "" || val === STRING_NULL) {
        return null
    }
    return val
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
    const spells: Spell[] = []

    fs.createReadStream(INITIAL_CSV_FILE_PATH)
        .pipe(csv())
        .on("data", (data: SpellFromCSV) => {
            const validatedData = D20PfsrdSchema.parse(data)
            spells.push(validatedData)
        })
        .on("end", () => {
            insertIntoDatabase(spells)
        })
}

function insertIntoDatabase(spells: Spell[]) {
    for (const spell of spells) {
        const columnNames = Object.keys(spell).join(", ")
        const valueIndexes = Object.values(spell).map((_, index) => `$${index + 1}`).join(", ")
        const query = `
            INSERT INTO ${TABLE_NAME} (
                ${columnNames}
            ) VALUES (
                ${valueIndexes}
            )
        `
        // console.log(query)
        // console.log(Object.values(spell))
        database.run(query, Object.values(spell))
    }
}

main()