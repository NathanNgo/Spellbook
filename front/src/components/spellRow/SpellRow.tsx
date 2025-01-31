import styles from "components/spellRow/SpellRow.module.css";
import { memo } from "react";
import { Spell } from "schemas";

type Props = {
    spell: Spell;
};

function SpellRow({ spell }: Props) {
    return (
        <tr>
            <td className={styles.spellName}>{spell.name}</td>
            {/* <td>{spell.description.trim()}</td> */}
            <td>{spell.duration.trim()}</td>
            <td>{spell.range.trim()}</td>
            <td>{spell.savingThrow.trim()}</td>
            <td>{spell.spellResistance.trim()}</td>
        </tr>
    );
}

export default memo(SpellRow);
