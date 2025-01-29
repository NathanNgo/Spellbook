import SpellTable from "components/spellTable/SpellTable";
import type { Spell } from "components/spellRow/types";
import styles from "components/spellbook/Spellbook.module.css";

type Props = {
    spells: Spell[];
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

function Spellbook({ spells }: Props) {
    return (
        <div className={styles.spellBook}>
            {Array.from(Array(LEVEL_TITLES.length), (_, level) => {
                return (
                    <SpellTable
                        spells={spells.filter((spell) => spell.level === level)}
                        title={LEVEL_TITLES[level]}
                        key={level}
                    />
                );
            })}
            <SpellTable
                spells={spells.filter((spell) => spell.level === null)}
                title="Uncategorised"
                key={UNCATEGORISED_LEVEL}
            />
        </div>
    );
}

export default Spellbook;
export { LEVEL_TITLES };
