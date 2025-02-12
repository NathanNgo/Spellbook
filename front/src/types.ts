import { SpellSchema, SpellSummarySchema } from "schemas";
import { z } from "zod";

export type Character = {
    name: string;
    class: string;
    spellCastingModifier: number;
    showSpellSaveDC: boolean;
};

export type SpellSummary = z.infer<typeof SpellSummarySchema>;

export type Spell = z.infer<typeof SpellSchema>;
