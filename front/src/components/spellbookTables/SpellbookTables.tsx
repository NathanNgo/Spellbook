import { getLevelOfSpellByClass } from "common/character";
import { LEVEL_TITLES } from "common/spells";
import Message from "components/message/Message";
import SpellTable from "components/spellTable/SpellTable";
import styles from "components/spellbookTables/SpellbookTables.module.css";
import type { Spell, Character } from "types";

type Props = {
    spells: Spell[];
    character: Character;
    onOpenPage: (spell: Spell) => void;
};

const UNCATEGORISED_LEVEL = -1;

function SpellbookTables({ spells, character, onOpenPage }: Props) {
    if (spells.length === 0) {
        return <Message>No spells found</Message>;
    }

    return (
        <div className={styles.spellbookTables}>
            {Array.from(Array(LEVEL_TITLES.length), (_, level) => {
                return (
                    <SpellTable
                        spells={spells.filter(
                            (spell) =>
                                getLevelOfSpellByClass(
                                    spell,
                                    character.class
                                ) === level
                        )}
                        title={LEVEL_TITLES[level]}
                        key={level}
                        onOpenPage={onOpenPage}
                    />
                );
            })}
            <SpellTable
                spells={spells.filter(
                    (spell) =>
                        getLevelOfSpellByClass(spell, character.class) === null
                )}
                title="Uncategorised"
                key={UNCATEGORISED_LEVEL}
                onOpenPage={onOpenPage}
            />
        </div>
    );
}

export default SpellbookTables;
