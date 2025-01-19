import React from "react";
import type { Spell } from "components/table/types";

type Props = {
    spell: Spell;
};

function SpellRow({ spell }: Props) {
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
