import Message from "components/message/Message";
import SpellTable from "components/spellTable/SpellTable";
import styles from "components/spellbook/Spellbook.module.css";
import type { Spells, Spell, ManifestSpellDetail } from "schemas";
import type { Character } from "App";

type Props = {
    spells: Spells;
    character: Character;
};

function classToCode(className: string) {
    className = className.toLowerCase();
    if (className == "wizard") {
        return "wiz";
    }
    if (className == "sorcerer") {
        return "sor";
    }
    if (className == "summoner unchained") {
        return "summonerUnchained";
    }
    return className as keyof (Spell | ManifestSpellDetail);
}

const LEVEL_TITLES = [
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

const UNCATEGORISED_LEVEL = -1;

function Spellbook({ spells, character }: Props) {
    if (spells.length === 0) {
        return <Message>No spells found</Message>;
    }

    return (
        <div className={styles.spellBook}>
            {Array.from(Array(LEVEL_TITLES.length), (_, level) => {
                return (
                    <SpellTable
                        spells={spells.filter(
                            (spell) =>
                                spell[classToCode(character.class)] === level
                        )}
                        title={LEVEL_TITLES[level]}
                        key={level}
                    />
                );
            })}
            <SpellTable
                spells={spells.filter(
                    (spell) => spell[classToCode(character.class)] === null
                )}
                title="Uncategorised"
                key={UNCATEGORISED_LEVEL}
            />
        </div>
    );
}

export default Spellbook;
export { LEVEL_TITLES, classToCode };
