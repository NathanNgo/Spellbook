import SpellTable from "../table/table";
import { Spell } from "../table/types";
import styles from "./spellbook.module.css";
type Props = {
    spells: Spell[];
};

const Spellbook = ({ spells }: Props) => {
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
};

export default Spellbook;
