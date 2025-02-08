import { SpellArraySchema } from "schemas";
import { SPELLS_ENDPOINT } from "urls";

async function useFetchSpells(spellNames: string[]) {
    const response = await fetch(SPELLS_ENDPOINT, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ spellNames: spellNames }),
    });

    return SpellArraySchema.parse(await response.json());
}

export default useFetchSpells;
