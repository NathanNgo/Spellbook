import { useState } from "react";
import "App.css";
import type { Spell } from "components/table/types";
import Header from "components/header/Header";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar_/SpellbookToolbar";

function App() {
    // This is temporary and rough
    const spells: Spell[] = [
        {
            name: "Fireball",
            description: "shoots a fireball, right?",
            levels: [0],
        },
        {
            name: "Some Random Bullshit Spell",
            description: "A very important spell...",
            levels: [0, 1],
        },
        {
            name: "The Josh Mann Spell",
            description: "Mat refused to answer the question",
            levels: [2, 3],
        },
        {
            name: "Depressionify",
            description: "Gives people clinical depression",
            levels: [9, 1],
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
