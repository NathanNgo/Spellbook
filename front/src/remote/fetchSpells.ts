import { SpellArraySchema } from "schemas";
import { Spell } from "types";
import { SPELLS_ENDPOINT } from "urls";
import { loadFromLocalStorage } from "./caching";

const SPELL_STORAGE_KEY = "spells";

function getAllStoredSpells(): Spell[] {
    const loadResult = loadFromLocalStorage<Spell[]>(SPELL_STORAGE_KEY, []);

    return loadResult.value;
}

function getSpellsFromStorageByName(spellNames: string[]): Spell[] {
    return getAllStoredSpells().filter(
        (storedSpell) =>
            spellNames.find((spellName) => storedSpell.name == spellName) !==
            undefined
    );
}

function addSpellsToStorage(spells: Spell[]) {
    const spellNames = spells.map((spell) => spell.name);

    const spellsFromStorage = getSpellsFromStorageByName(spellNames);

    if (spells.length === spellsFromStorage.length) {
        return;
    }

    const uncachedSpells = spells.filter((spell) =>
        spellsFromStorage.every(
            (storedSpell) => storedSpell.name !== spell.name
        )
    );

    const newSpellCache = [...getAllStoredSpells(), ...uncachedSpells];
    localStorage.setItem(SPELL_STORAGE_KEY, JSON.stringify(newSpellCache));
}

async function getSpellsFromNetworkByName(
    spellNames: string[]
): Promise<Spell[]> {
    const response = await fetch(SPELLS_ENDPOINT, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ spellNames: spellNames }),
    });
    return SpellArraySchema.parse(await response.json());
}

async function fetchSpells(spellNames: string[]): Promise<Spell[]> {
    const spellsFromStorage = getSpellsFromStorageByName(spellNames);

    if (spellsFromStorage.length === spellNames.length) {
        return spellsFromStorage;
    }

    const remainingSpellNames = spellNames.filter(
        (spellName) =>
            spellsFromStorage.find(
                (storedSpell) => spellName === storedSpell.name
            ) === undefined
    );

    const spellsFromNetwork = await getSpellsFromNetworkByName(
        remainingSpellNames
    );

    addSpellsToStorage(spellsFromNetwork);

    return [...spellsFromStorage, ...spellsFromNetwork];
}

export default fetchSpells;
