import SpellTable from "components/table/Table";
import type { Spell } from "components/table/types";
import styles from "components/spellbook/Spellbook.module.css";

type Props = {
    spells: Spell[];
};

function Spellbook({ spells }: Props) {
    return (
        <div className={styles.spellBook}>
            {Array.from(Array(10), (_, level) => {
                return (
                    <SpellTable
                        spells={spells.filter((spell) =>
                            spell.levels.includes(level)
                        )}
                        title={level == 0 ? "Cantrip" : `Level ${level}`}
                        key={level}
                    />
                );
            })}
        </div>
    );
}

export default Spellbook;
