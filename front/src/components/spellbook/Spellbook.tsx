import SpellTable from "components/spellTable/SpellTable";
import type { Spell } from "components/spellRow/types";
import styles from "components/spellbook/Spellbook.module.css";

type Props = {
    spells: Spell[];
};

const LEVEL_TITLE = [
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

function Spellbook({ spells }: Props) {
    return (
        <div className={styles.spellBook}>
            {Array.from(Array(LEVEL_TITLE.length), (_, level) => {
                return (
                    <SpellTable
                        spells={spells.filter((spell) => spell.level === level)}
                        title={LEVEL_TITLE[level]}
                        key={level}
                    />
                );
            })}
            <SpellTable
                spells={spells.filter((spell) => spell.level === null)}
                title="Uncategorised"
                key={-1}
            />
        </div>
    );
}

export default Spellbook;
