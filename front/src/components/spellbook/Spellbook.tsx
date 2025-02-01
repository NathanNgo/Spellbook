import Message from "components/message/Message";
import SpellTable from "components/spellTable/SpellTable";
import styles from "components/spellbook/Spellbook.module.css";
import type { Spells } from "schemas";

type Props = {
    spellsToDisplay: Spells;
    totalSpellCount: number;
};

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

function Spellbook({ spellsToDisplay, totalSpellCount }: Props) {
    if (totalSpellCount === 0) {
        return <Message>Spellbook is empty</Message>;
    }

    if (spellsToDisplay.length === 0) {
        return <Message>No results found</Message>;
    }

    return (
        <div className={styles.spellBook}>
            {Array.from(Array(LEVEL_TITLES.length), (_, level) => {
                return (
                    <SpellTable
                        spells={spellsToDisplay.filter(
                            (spell) => spell.sor === level
                        )}
                        title={LEVEL_TITLES[level]}
                        key={level}
                    />
                );
            })}
            <SpellTable
                spells={spellsToDisplay.filter((spell) => spell.sor === null)}
                title="Uncategorised"
                key={UNCATEGORISED_LEVEL}
            />
        </div>
    );
}

export default Spellbook;
export { LEVEL_TITLES };
