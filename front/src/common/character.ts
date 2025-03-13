import type { Spell, SpellSummary } from "types";

export enum ClassName {
    Adept = "Adept",
    Alchemist = "Alchemist",
    Antipaladin = "Antipaladin",
    Arcanist = "Arcanist",
    Bard = "Bard",
    Bloodrager = "Bloodrager",
    Cleric = "Cleric",
    Druid = "Druid",
    Hunter = "Hunter",
    Inquisitor = "Inquisitor",
    Investigator = "Investigator",
    Magus = "Magus",
    Medium = "Medium",
    Mesmerist = "Mesmerist",
    Occultist = "Occultist",
    Oracle = "Oracle",
    Paladin = "Paladin",
    Psychic = "Psychic",
    Ranger = "Ranger",
    Shaman = "Shaman",
    Skald = "Skald",
    Sorcerer = "Sorcerer",
    Spiritualist = "Spiritualist",
    Summoner = "Summoner",
    SummonerUnchained = "Summoner Unchained",
    Wizard = "Wizard",
    Witch = "Witch",
}

enum ClassCode {
    Wiz = "wiz",
    Sor = "sor",
    Cleric = "cleric",
    Druid = "druid",
    Ranger = "ranger",
    Bard = "bard",
    Paladin = "paladin",
    Alchemist = "alchemist",
    Adept = "adept",
    Summoner = "summoner",
    Witch = "witch",
    Inquisitor = "inquisitor",
    Oracle = "oracle",
    Antipaladin = "antipaladin",
    Magus = "magus",
    Bloodrager = "bloodrager",
    Shaman = "shaman",
    Psychic = "psychic",
    Medium = "medium",
    Mesmerist = "mesmerist",
    Occultist = "occultist",
    Spiritualist = "spiritualist",
    Skald = "skald",
    Investigator = "investigator",
    Hunter = "hunter",
    SummonerUnchained = "summonerUnchained",
}

const classNameToClassCodeMapping: Record<ClassName, ClassCode> = {
    [ClassName.Wizard]: ClassCode.Wiz,
    [ClassName.Arcanist]: ClassCode.Wiz, // Arcanist has same levels as Wizard class
    [ClassName.Sorcerer]: ClassCode.Sor,
    [ClassName.SummonerUnchained]: ClassCode.SummonerUnchained,
    [ClassName.Cleric]: ClassCode.Cleric,
    [ClassName.Druid]: ClassCode.Druid,
    [ClassName.Ranger]: ClassCode.Ranger,
    [ClassName.Bard]: ClassCode.Bard,
    [ClassName.Paladin]: ClassCode.Paladin,
    [ClassName.Alchemist]: ClassCode.Alchemist,
    [ClassName.Summoner]: ClassCode.Summoner,
    [ClassName.Witch]: ClassCode.Witch,
    [ClassName.Inquisitor]: ClassCode.Inquisitor,
    [ClassName.Oracle]: ClassCode.Oracle,
    [ClassName.Antipaladin]: ClassCode.Antipaladin,
    [ClassName.Magus]: ClassCode.Magus,
    [ClassName.Bloodrager]: ClassCode.Bloodrager,
    [ClassName.Shaman]: ClassCode.Shaman,
    [ClassName.Psychic]: ClassCode.Psychic,
    [ClassName.Medium]: ClassCode.Medium,
    [ClassName.Mesmerist]: ClassCode.Mesmerist,
    [ClassName.Occultist]: ClassCode.Occultist,
    [ClassName.Spiritualist]: ClassCode.Spiritualist,
    [ClassName.Skald]: ClassCode.Skald,
    [ClassName.Investigator]: ClassCode.Investigator,
    [ClassName.Hunter]: ClassCode.Hunter,
    [ClassName.Adept]: ClassCode.Adept,
};

export function classNameToClassCode(
    className: string
): keyof (Spell | SpellSummary) {
    return classNameToClassCodeMapping[className as ClassName] as keyof (
        | Spell
        | SpellSummary
    );
}

export function spellClassLevel(
    spell: Spell,
    className: string
): number | null {
    return spell[classNameToClassCode(className as ClassName)] as number | null;
}
