import { ClassName } from "common/character";
import { SpellSchema, SpellSummarySchema } from "schemas";
import { z } from "zod";

export type Character = {
    name: string;
    class: ClassName;
    spellCastingModifier: number;
    showSpellSaveDC: boolean;
    id: string;
};

export type SpellSummary = z.infer<typeof SpellSummarySchema>;

export type Spell = z.infer<typeof SpellSchema>;
