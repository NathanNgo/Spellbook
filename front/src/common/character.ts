import type { Spell, SpellSummary } from "types";

export enum CharacterClassName {
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

export enum SpellListName {
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

enum CharacterClassCode {
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

const characterClassNameToClassCodeMapping: Record<
    CharacterClassName,
    CharacterClassCode
> = {
    [CharacterClassName.Wizard]: CharacterClassCode.Wiz,
    [CharacterClassName.Arcanist]: CharacterClassCode.Wiz, // Arcanist has same levels as Wizard class
    [CharacterClassName.Sorcerer]: CharacterClassCode.Sor,
    [CharacterClassName.SummonerUnchained]:
        CharacterClassCode.SummonerUnchained,
    [CharacterClassName.Cleric]: CharacterClassCode.Cleric,
    [CharacterClassName.Druid]: CharacterClassCode.Druid,
    [CharacterClassName.Ranger]: CharacterClassCode.Ranger,
    [CharacterClassName.Bard]: CharacterClassCode.Bard,
    [CharacterClassName.Paladin]: CharacterClassCode.Paladin,
    [CharacterClassName.Alchemist]: CharacterClassCode.Alchemist,
    [CharacterClassName.Summoner]: CharacterClassCode.Summoner,
    [CharacterClassName.Witch]: CharacterClassCode.Witch,
    [CharacterClassName.Inquisitor]: CharacterClassCode.Inquisitor,
    [CharacterClassName.Oracle]: CharacterClassCode.Oracle,
    [CharacterClassName.Antipaladin]: CharacterClassCode.Antipaladin,
    [CharacterClassName.Magus]: CharacterClassCode.Magus,
    [CharacterClassName.Bloodrager]: CharacterClassCode.Bloodrager,
    [CharacterClassName.Shaman]: CharacterClassCode.Shaman,
    [CharacterClassName.Psychic]: CharacterClassCode.Psychic,
    [CharacterClassName.Medium]: CharacterClassCode.Medium,
    [CharacterClassName.Mesmerist]: CharacterClassCode.Mesmerist,
    [CharacterClassName.Occultist]: CharacterClassCode.Occultist,
    [CharacterClassName.Spiritualist]: CharacterClassCode.Spiritualist,
    [CharacterClassName.Skald]: CharacterClassCode.Skald,
    [CharacterClassName.Investigator]: CharacterClassCode.Investigator,
    [CharacterClassName.Hunter]: CharacterClassCode.Hunter,
    [CharacterClassName.Adept]: CharacterClassCode.Adept,
};

export const spellListNameToClassCodeMapping: Record<
    SpellListName,
    CharacterClassCode
> = {
    [SpellListName.Adept]: CharacterClassCode.Adept,
    [SpellListName.Alchemist]: CharacterClassCode.Alchemist,
    [SpellListName.Antipaladin]: CharacterClassCode.Antipaladin,
    [SpellListName.Bard]: CharacterClassCode.Bard,
    [SpellListName.Bloodrager]: CharacterClassCode.Bloodrager,
    [SpellListName.ClericOracle]: CharacterClassCode.Cleric, // Oracle and Cleric share levels
    [SpellListName.Druid]: CharacterClassCode.Druid,
    [SpellListName.Inquisitor]: CharacterClassCode.Inquisitor,
    [SpellListName.Investigator]: CharacterClassCode.Investigator,
    [SpellListName.Magus]: CharacterClassCode.Magus,
    [SpellListName.Medium]: CharacterClassCode.Medium,
    [SpellListName.Mesmerist]: CharacterClassCode.Mesmerist,
    [SpellListName.Occultist]: CharacterClassCode.Occultist,
    [SpellListName.Paladin]: CharacterClassCode.Paladin,
    [SpellListName.Psychic]: CharacterClassCode.Psychic,
    [SpellListName.Ranger]: CharacterClassCode.Ranger,
    [SpellListName.Shaman]: CharacterClassCode.Shaman,
    [SpellListName.SorcererWizard]: CharacterClassCode.Wiz, // Sorcerer and Wizard share levels
    [SpellListName.Spiritualist]: CharacterClassCode.Spiritualist,
    [SpellListName.SummonerSummonerUnchained]: CharacterClassCode.Summoner, // Both share same levels
    [SpellListName.Witch]: CharacterClassCode.Witch,
};

export const characterClassNameToSpellListNameMapping: Record<
    CharacterClassName,
    SpellListName
> = {
    [CharacterClassName.Adept]: SpellListName.Adept,
    [CharacterClassName.Alchemist]: SpellListName.Alchemist,
    [CharacterClassName.Antipaladin]: SpellListName.Antipaladin,
    [CharacterClassName.Arcanist]: SpellListName.SorcererWizard, // Arcanist uses the Sorcerer/Wizard spell list
    [CharacterClassName.Bard]: SpellListName.Bard,
    [CharacterClassName.Bloodrager]: SpellListName.Bloodrager,
    [CharacterClassName.Cleric]: SpellListName.ClericOracle, // Shares with Oracle
    [CharacterClassName.Druid]: SpellListName.Druid,
    [CharacterClassName.Hunter]: SpellListName.Druid, // Uses Druid spell list
    [CharacterClassName.Inquisitor]: SpellListName.Inquisitor,
    [CharacterClassName.Investigator]: SpellListName.Investigator,
    [CharacterClassName.Magus]: SpellListName.Magus,
    [CharacterClassName.Medium]: SpellListName.Medium,
    [CharacterClassName.Mesmerist]: SpellListName.Mesmerist,
    [CharacterClassName.Occultist]: SpellListName.Occultist,
    [CharacterClassName.Oracle]: SpellListName.ClericOracle, // Shares with Cleric
    [CharacterClassName.Paladin]: SpellListName.Paladin,
    [CharacterClassName.Psychic]: SpellListName.Psychic,
    [CharacterClassName.Ranger]: SpellListName.Ranger,
    [CharacterClassName.Shaman]: SpellListName.Shaman,
    [CharacterClassName.Skald]: SpellListName.Bard, // Uses Bard spell list
    [CharacterClassName.Sorcerer]: SpellListName.SorcererWizard, // Shares with Wizard
    [CharacterClassName.Spiritualist]: SpellListName.Spiritualist,
    [CharacterClassName.Summoner]: SpellListName.SummonerSummonerUnchained, // Shares with Unchained Summoner
    [CharacterClassName.SummonerUnchained]:
        SpellListName.SummonerSummonerUnchained, // Shares with Summoner
    [CharacterClassName.Wizard]: SpellListName.SorcererWizard, // Shares with Sorcerer
    [CharacterClassName.Witch]: SpellListName.Witch,
};

export function spellClassLevel(
    spell: Spell | SpellSummary,
    characterClassName: string
): number | null {
    const characterClassCode = characterClassNameToClassCodeMapping[
        characterClassName as CharacterClassName
    ] as keyof (Spell | SpellSummary);

    return spell[characterClassCode] as number | null;
}

export function spellAndSpellListNameToLevel(
    spell: Spell,
    spellListName: string
): number | null {
    const characterClassCode = spellListNameToClassCodeMapping[
        spellListName as SpellListName
    ] as keyof (Spell | SpellSummary);

    return spell[characterClassCode] as number | null;
}
