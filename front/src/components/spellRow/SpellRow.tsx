import styles from "components/spellRow/SpellRow.module.css";
import { memo } from "react";
import type { Spell } from "types";

type Props = {
    spell: Spell;
    onClick: () => void;
};

function SpellRow({ spell, onClick }: Props) {
    return (
        <tr onClick={onClick} title={spell.shortDescription}>
            <td className={styles.spellName}>{spell.name}</td>
            <td>{spell.duration.trim()}</td>
            <td>{spell.range.trim()}</td>
            <td>{spell.savingThrow.trim()}</td>
            <td>{spell.spellResistance.trim()}</td>
        </tr>
    );
}

export default memo(SpellRow);
