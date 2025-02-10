import { useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    DrawerState,
} from "components/spellbookContainer/SpellbookContainer";
import { Character } from "types";

const INITIAL_CHARACTER: Character = {
    name: "Josh Mann",
    class: "Sorcerer",
    spellCastingModifier: 0,
    showSpellSaveDC: true,
};

function App() {
    const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);

    const [drawerState, setDrawerState] = useState<DrawerState>(
        DrawerState.None
    );

    function toggleState(targetState: DrawerState) {
        setDrawerState(
            drawerState === targetState ? DrawerState.None : targetState
        );
    }

    return (
        <>
            <Header
                characterName={character.name}
                onToggleMenu={() => toggleState(DrawerState.Menu)}
                onToggleSettings={() => toggleState(DrawerState.Settings)}
            />
            <SpellbookContainer
                drawerState={drawerState}
                onSetDrawerState={setDrawerState}
                character={character}
                onCharacterChanged={setCharacter}
            ></SpellbookContainer>
        </>
    );
}

export default App;
