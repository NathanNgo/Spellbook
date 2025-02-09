import Message from "components/message/Message";
import SpellTable from "components/spellTable/SpellTable";
import styles from "components/spellbook/Spellbook.module.css";
import type { Spell } from "schemas";
import { LEVEL_TITLES } from "components/spellbook/spellDetails";

type Props = {
    spells: Spell[];
};

const UNCATEGORISED_LEVEL = -1;

function Spellbook({ spells }: Props) {
    if (spells.length === 0) {
        return <Message>No spells found</Message>;
    }

    return (
        <div className={styles.spellBook}>
            {Array.from(Array(LEVEL_TITLES.length), (_, level) => {
                return (
                    <SpellTable
                        spells={spells.filter((spell) => spell.sor === level)}
                        title={LEVEL_TITLES[level]}
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
