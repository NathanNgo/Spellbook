import { SpellArraySchema } from "schemas";

async function useFetchSpells(spellNames: string[]) {
    const response = await fetch("http://localhost:3000/spells", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ spellNames: spellNames }),
    });

    return SpellArraySchema.parse(await response.json());
}

export default useFetchSpells;
