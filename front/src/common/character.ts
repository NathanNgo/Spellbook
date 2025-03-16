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

export enum ClassLevelName {
    Adept = "Adept",
    Alchemist = "Alchemist",
    Antipaladin = "Antipaladin",
    Bard = "Bard",
    Bloodrager = "Bloodrager",
    ClericOracle = "Cleric/Oracle",
    Druid = "Druid",
    Inquisitor = "Inquisitor",
    Investigator = "Investigator",
    Magus = "Magus",
    Medium = "Medium",
    Mesmerist = "Mesmerist",
    Occultist = "Occultist",
    Paladin = "Paladin",
    Psychic = "Psychic",
    Ranger = "Ranger",
    Shaman = "Shaman",
    SorcererWizard = "Sorcerer/Wizard",
    Spiritualist = "Spiritualist",
    SummonerSummonerUnchained = "Summoner/Summoner Unchained",
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

export const classLevelNameToClassCodeMapping: Record<
    ClassLevelName,
    ClassCode
> = {
    [ClassLevelName.Adept]: ClassCode.Adept,
    [ClassLevelName.Alchemist]: ClassCode.Alchemist,
    [ClassLevelName.Antipaladin]: ClassCode.Antipaladin,
    [ClassLevelName.Bard]: ClassCode.Bard,
    [ClassLevelName.Bloodrager]: ClassCode.Bloodrager,
    [ClassLevelName.ClericOracle]: ClassCode.Cleric, // Oracle and Cleric share levels
    [ClassLevelName.Druid]: ClassCode.Druid,
    [ClassLevelName.Inquisitor]: ClassCode.Inquisitor,
    [ClassLevelName.Investigator]: ClassCode.Investigator,
    [ClassLevelName.Magus]: ClassCode.Magus,
    [ClassLevelName.Medium]: ClassCode.Medium,
    [ClassLevelName.Mesmerist]: ClassCode.Mesmerist,
    [ClassLevelName.Occultist]: ClassCode.Occultist,
    [ClassLevelName.Paladin]: ClassCode.Paladin,
    [ClassLevelName.Psychic]: ClassCode.Psychic,
    [ClassLevelName.Ranger]: ClassCode.Ranger,
    [ClassLevelName.Shaman]: ClassCode.Shaman,
    [ClassLevelName.SorcererWizard]: ClassCode.Wiz, // Sorcerer and Wizard share levels
    [ClassLevelName.Spiritualist]: ClassCode.Spiritualist,
    [ClassLevelName.SummonerSummonerUnchained]: ClassCode.Summoner, // Both share same levels
    [ClassLevelName.Witch]: ClassCode.Witch,
};

export function classNameToClassCode(
    className: string
): keyof (Spell | SpellSummary) {
    return classNameToClassCodeMapping[className as ClassName] as keyof (
        | Spell
        | SpellSummary
    );
}

// export function spellClassLevel(
//     spell: Spell,
//     className: string
// ): number | null {
//     return spell[classNameToClassCode(className as ClassName)] as number | null;
// }

export function spellClassLevelNameToLevel(
    spell: Spell,
    classLevelName: string
): number | null {
    const classCode = classLevelNameToClassCodeMapping[
        classLevelName as ClassLevelName
    ] as keyof (Spell | SpellSummary);

    return spell[classCode] as number | null;
}
