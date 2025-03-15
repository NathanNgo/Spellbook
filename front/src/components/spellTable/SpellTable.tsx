import SpellRow from "components/spellRow/SpellRow";
import styles from "components/spellTable/SpellTable.module.css";
import type { Spell } from "types";

type Props = {
    title: string;
    spells: Spell[];
    onOpenPage: (spell: Spell) => void;
};

function SpellTable({ title, spells, onOpenPage }: Props) {
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
                    {spells.map((spell) => (
                        <SpellRow
                            spell={spell}
                            key={spell.id}
                            onClick={() => onOpenPage(spell)}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SpellTable;
