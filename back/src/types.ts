import { z } from "zod";
import { SpellSchema, SpellSummarySchema } from "src/schemas";

export type StringTuple = [string, ...string[]];

export type Spell = z.infer<typeof SpellSchema>;

export type SpellSummary = z.infer<typeof SpellSummarySchema>;
