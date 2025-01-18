import React from "react";
import { Spell } from "./types";

const SpellRow = (spell: Spell) => {
    return (
        <tr>
            <td style={{ fontStyle: "italic" }}>{spell.name}</td>
            <td>{spell.description}</td>
        </tr>
    );
};

export default SpellRow;
