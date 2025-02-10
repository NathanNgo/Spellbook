import type { Spell, SpellSummary } from "types";

export const LEVEL_TITLES = [
    "Cantrip",
    "1st Level",
    "2nd Level",
    "3rd Level",
    "4th Level",
    "5th Level",
    "6th Level",
    "7th Level",
    "8th Level",
    "9th Level",
];

enum ClassName {
    Wizard = "Wizard",
    Arcanist = "Arcanist",
    Sorcerer = "Sorcerer",
    SummonerUnchained = "Summoner Unchained",
}

enum ClassCode {
    Wiz = "wiz",
    Sor = "sor",
    SummonerUnchained = "summonerUnchained",
}
const classNameToClassCodeMapping: Record<ClassName, ClassCode> = {
    [ClassName.Wizard]: ClassCode.Wiz,
    [ClassName.Arcanist]: ClassCode.Wiz,
    [ClassName.Sorcerer]: ClassCode.Sor,
    [ClassName.SummonerUnchained]: ClassCode.SummonerUnchained,
};
export function classNameToClassCode(
    className: string
): keyof (Spell | SpellSummary) {
    const classCode =
        classNameToClassCodeMapping[className as ClassName] ||
        className.toLowerCase();
    return classCode as keyof (Spell | SpellSummary);
}
