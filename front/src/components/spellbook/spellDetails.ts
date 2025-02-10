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

export function classToCode(className: string) {
    className = className.toLowerCase();
    let classCode = className;

    switch (className) {
        case "wizard":
        case "arcanist":
            classCode = "wiz";
            break;
        case "sorcerer":
            classCode = "sor";
            break;
        case "summoner unchained":
            classCode = "summonerUnchained";
            break;
    }
    return classCode as keyof (Spell | SpellSummary);
}
