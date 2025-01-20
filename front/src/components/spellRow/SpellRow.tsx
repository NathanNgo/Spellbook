import type { Spell } from "components/spellRow/types";
import styles from "components/spellRow/SpellRow.module.css";

type Props = {
    spell: Spell;
};

function SpellRow({ spell }: Props) {
    return (
        <tr>
            <td className={styles.spellName}>{spell.name}</td>
            <td>{spell.description}</td>
        </tr>
    );
}

export default SpellRow;
