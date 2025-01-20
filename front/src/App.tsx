import { useEffect, useState } from "react";
import "App.css";
import type { Spell } from "components/spellRow/types";
import Header from "components/header/Header";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";

type UnvalidatedSpell = {
    name: string;
    short_description: string;
    sor: number;
    duration: string;
    range: string;
    saving_throw: string;
    spell_resistance: string;
};

function App() {
    const [spells, setSpells] = useState<Spell[]>([]);

    useEffect(() => {
        // (async function () {
        //     await fetch("http://localhost:3000");
        // })();
        fetch("http://localhost:3000")
            .then((response) => response.json())
            .then((spells: UnvalidatedSpell[]) => {
                spells.sort((a, b) => a.name.localeCompare(b.name));
                setSpells(
                    spells.map((spell): Spell => {
                        return {
                            name: spell.name,
                            description: spell.short_description,
                            level: spell.sor,
                            duration: spell.duration,
                            range: spell.range,
                            savingThrow: spell.saving_throw,
                            spellResistance: spell.spell_resistance,
                        };
                    })
                );
            });
    }, []);

    let _spells = [
        {
            name: "Fireball",
            description: "shoots a fireball, right?",
            level: 0,
        },
        {
            name: "Some Random Bullshit Spell",
            description: "A very important spell...",
            level: 0,
        },
        {
            name: "The Josh Mann Spell",
            description: "Mat refused to answer the question",
            level: 1,
        },
        {
            name: "Depressionify",
            description: "Gives people clinical depression",
            level: 3,
        },
    ];

    const [characterName, setCharacterName] = useState<string>("Josh Mann");

    return (
        <>
            <Header characterName={characterName} />
            <SpellbookToolbar />
            <Spellbook spells={spells} />
        </>
    );
}

export default App;
