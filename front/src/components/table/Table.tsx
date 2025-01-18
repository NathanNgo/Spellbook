// import React from "react";
import SpellRow from "components/table/Row";
import { Spell } from "components/table/types";
import styles from "components/table/Table.module.css";

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
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {spells.map((item, index) => (
                        <SpellRow {...item} key={index} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SpellTable;
