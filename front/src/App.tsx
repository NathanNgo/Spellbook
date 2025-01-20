import { useState } from "react";
import "App.css";
import type { Spell } from "components/spellRow/types";
import Header from "components/header/Header";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";

function App() {
    // This is temporary and rough
    // const spells: Spell[] = [];
    const spells: Spell[] = [
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
