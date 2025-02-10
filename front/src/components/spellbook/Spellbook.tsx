import Message from "components/message/Message";
import SpellTable from "components/spellTable/SpellTable";
import styles from "components/spellbook/Spellbook.module.css";
import type { Spell, Character } from "types";
import {
    LEVEL_TITLES,
    classNameToClassCode,
} from "components/spellbook/spellDetails";

type Props = {
    spells: Spell[];
    character: Character;
};

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
                                spell[classNameToClassCode(character.class)] ===
                                level
                        )}
                        title={LEVEL_TITLES[level]}
                        key={level}
                    />
                );
            })}
            <SpellTable
                spells={spells.filter(
                    (spell) =>
                        spell[classNameToClassCode(character.class)] === null
                )}
                title="Uncategorised"
                key={UNCATEGORISED_LEVEL}
            />
        </div>
    );
}

export default Spellbook;
