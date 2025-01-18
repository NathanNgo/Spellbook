import React from "react";
import { Spell } from "components/table/types";

function SpellRow(spell: Spell) {
    return (
        <tr>
            <td>
                <i>{spell.name}</i>
            </td>
            <td>{spell.description}</td>
        </tr>
    );
}

export default SpellRow;
