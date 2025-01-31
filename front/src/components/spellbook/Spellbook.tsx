import SpellTable from "components/spellTable/SpellTable";
import styles from "components/spellbook/Spellbook.module.css";
import { Spells } from "schemas";

type Props = {
    spells: Spells;
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

const UNCATEGORISED_LEVEL = -1;

function Spellbook({ spells }: Props) {
    return (
        <div className={styles.spellBook}>
            {Array.from(Array(LEVEL_TITLE.length), (_, level) => {
                return (
                    <SpellTable
                        spells={spells.filter((spell) => spell.sor === level)}
                        title={LEVEL_TITLE[level]}
                        key={level}
                    />
                );
            })}
            <SpellTable
                spells={spells.filter((spell) => spell.sor === null)}
                title="Uncategorised"
                key={UNCATEGORISED_LEVEL}
            />
        </div>
    );
}

export default Spellbook;
