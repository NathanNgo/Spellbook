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
        },
        {
            name: "Some Random Bullshit Spell",
            description: "A very important spell...",
        },
        {
            name: "The Josh Mann Spell",
            description: "Mat refused to answer the question",
        },
    ];
    const [characterName, setCharacterName] = useState<string>("Josh Mann");

    return (
        <>
            {/* <header>[=] Spellbook! {characterName}</header> */}
            <Header {...{ characterName }} />
            <Spellbook spells={spells} />
            {/* <SpellTable spells={spells} /> */}
        </>
    );
}

export default App;
