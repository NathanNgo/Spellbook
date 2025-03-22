import { SpellArraySchema } from "schemas";
import { Spell } from "types";
import { SPELLS_ENDPOINT } from "urls";
import { loadFromLocalStorage } from "./caching";

const SPELLS_KEY = "spells";

function spellCache(): Spell[] {
    const loadResult = loadFromLocalStorage<Spell[]>(SPELLS_KEY, []);

    return loadResult.value;
}

function getCachedSpellsOrNone(spellNames: string[]): (Spell | undefined)[] {
    const cachedSpells = spellCache();
    return spellNames.map((spellName) =>
        cachedSpells.find((cachedSpell) => cachedSpell.name === spellName)
    );
}

function addSpellsToCache(spells: Spell[]) {
    const spellNames = spells.map((spell) => spell.name);

    const cachedSpellsOrNone = getCachedSpellsOrNone(spellNames);

    const uncachedSpells = spells.filter(
        (spell) =>
            cachedSpellsOrNone.find(
                (cachedSpellOrNone) =>
                    cachedSpellOrNone !== undefined &&
                    spell.name === cachedSpellOrNone.name
            ) === undefined
    );

    const newSpellCache = [...spellCache(), ...uncachedSpells];
    localStorage.setItem(SPELLS_KEY, JSON.stringify(newSpellCache));
}

async function fetchSpells(spellNames: string[]): Promise<Spell[]> {
    const cachedSpells = getCachedSpellsOrNone(spellNames).filter(
        (cachedSpellOrNone) => cachedSpellOrNone !== undefined
    );

    const uncachedSpellNames = spellNames.filter(
        (spellName) =>
            cachedSpells.find(
                (cachedSpell) => spellName === cachedSpell.name
            ) === undefined
    );

    if (uncachedSpellNames.length === 0) {
        return cachedSpells;
    }

    const response = await fetch(SPELLS_ENDPOINT, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ spellNames: uncachedSpellNames }),
    });
    const uncachedSpells = SpellArraySchema.parse(await response.json());

    addSpellsToCache(uncachedSpells);

    return [...cachedSpells, ...uncachedSpells];
}

export default fetchSpells;
