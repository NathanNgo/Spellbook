import { useState } from "react";
import "./App.css";
import { Spell } from "./components/table/types";
import SpellTable from "./components/table/table";
import Header from "./components/header/header";
import Spellbook from "./components/spellbook/spellbook";

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
            <Header {...{ characterName }} />
            <Spellbook spells={spells} />
        </>
    );
}

export default App;
