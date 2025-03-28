import { SpellArraySchema } from "schemas";
import { Spell } from "types";
import { SPELLS_ENDPOINT } from "urls";
import { loadFromLocalStorage } from "./caching";

const SPELLS_KEY = "spells";

function getAllStoredSpells(): Spell[] {
    const loadResult = loadFromLocalStorage<Spell[]>(SPELLS_KEY, []);

    return loadResult.value;
}

function getSpellsFromStorageByName(spellNames: string[]): Spell[] {
    return getAllStoredSpells().filter((storedSpell) =>
        spellNames.includes(storedSpell.name)
    );
}

function addSpellsToStorage(spells: Spell[]) {
    const allSpellsFromStorage = getAllStoredSpells();

    const spellsNotInStorage = spells.filter((spell) =>
        allSpellsFromStorage.every(
            (storedSpell) => storedSpell.name !== spell.name
        )
    );

    if (spellsNotInStorage.length === 0) {
        return;
    }

    localStorage.setItem(
        SPELLS_KEY,
        JSON.stringify([...allSpellsFromStorage, ...spellsNotInStorage])
    );
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
    const spellsFromStorageNames = spellsFromStorage.map((spell) => spell.name);

    if (spellsFromStorage.length === spellNames.length) {
        return spellsFromStorage;
    }

    const remainingSpellNames = spellNames.filter(
        (spellName) => !spellsFromStorageNames.includes(spellName)
    );

    const spellsFromNetwork = await getSpellsFromNetworkByName(
        remainingSpellNames
    );

    addSpellsToStorage(spellsFromNetwork);

    return [...spellsFromStorage, ...spellsFromNetwork];
}

export default fetchSpells;
