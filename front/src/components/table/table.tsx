// import React from "react";
import SpellRow from "./row";
import { Spell } from "./types";
import styles from "./table.module.css";

type Props = {
    title: string;
    spells: Spell[];
};

const SpellTable = ({ title, spells }: Props) => {
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
};

export default SpellTable;
