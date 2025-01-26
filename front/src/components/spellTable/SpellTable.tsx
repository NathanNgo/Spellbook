import SpellRow from "components/spellRow/SpellRow";
import type { Spell } from "components/spellRow/types";
import styles from "components/spellTable/SpellTable.module.css";

type Props = {
    title: string;
    spells: Spell[];
};

function SpellTable({ title, spells }: Props) {
    if (spells.length == 0) {
        return;
    }
    return (
        <>
            <h2 className={styles.spellTableTitle}>{title.toUpperCase()}</h2>
            <table className={styles.spellTable}>
                <thead>
                    <tr>
                        <th className="nameColumn">Name</th>
                        {/* <th>Description</th> */}
                        <th>Duration</th>
                        <th>Range</th>
                        <th>Saving Throw</th>
                        <th>Spell Resistance</th>
                    </tr>
                </thead>
                <tbody>
                    {spells.map((spell, index) => (
                        <SpellRow spell={spell} key={spell.id} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SpellTable;
