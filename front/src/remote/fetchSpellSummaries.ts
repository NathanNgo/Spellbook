import { SpellSummaryArraySchema } from "schemas";
import { SPELL_SUMMARIES_ENDPOINT } from "urls";

async function fetchSpellSummaries() {
    const response = await fetch(SPELL_SUMMARIES_ENDPOINT, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    });

    return SpellSummaryArraySchema.parse(await response.json());
}

export default fetchSpellSummaries;
