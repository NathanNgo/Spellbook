import sqlite3 from "sqlite3";
import fs from "fs";
import csv from "csv-parser";

const DATABASE_FILE_PATH = "spellbook.db"
const INITIAL_CSV_FILE_PATH = "./spellbook.csv"

const database = new sqlite3.Database(DATABASE_FILE_PATH)

type Spell = {
  id: number;
  name: string;
  school: string;
  subschool?: string;
  descriptor?: string;
  spell_level: string;
  casting_time: string;
  components: string;
  costly_components: boolean;
  range: string;
  area?: string;
  effect?: string;
  targets?: string;
  duration: string;
  dismissible: boolean;
  shapeable: boolean;
  saving_throw?: string;
  spell_resistance?: string;
  description?: string;
  description_formatted?: string;
  source?: string;
  full_text?: string;
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  focus: boolean;
  divine_focus: boolean;
  sor?: number;
  wiz?: number;
  cleric?: number;
  druid?: number;
  ranger?: number;
  bard?: number;
  paladin?: number;
  alchemist?: number;
  summoner?: number;
  witch?: number;
  inquisitor?: number;
  oracle?: number;
  antipaladin?: number;
  magus?: number;
  adept?: number;
  bloodrager?: number;
  shaman?: number;
  psychic?: number;
  medium?: number;
  mesmerist?: number;
  occultist?: number;
  spiritualist?: number;
  skald?: number;
  investigator?: number;
  hunter?: number;
  summoner_unchained?: number;
  deity?: string;
  SLA_level?: number;
  domain?: string;
  short_description?: string;
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
  linktext?: string;
  material_costs?: number;
  bloodline?: string;
  patron?: string;
  mythic_text?: string;
  augmented?: string;
  haunt_statistics?: string;
};

function main() {
    const spells: Spell[] = []

    fs.createReadStream(INITIAL_CSV_FILE_PATH)
        .pipe(csv())
        .on("data", (data: Spell) => {
            // spells.push(data)
            console.log(data)
        })
        .on("end", () => {
            // insertIntoDatabase(spells)
        })
}

function insertIntoDatabase(spells: Spell[]) {
    return
}

main()