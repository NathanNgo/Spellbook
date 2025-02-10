import { useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    DrawerState,
} from "components/spellbookContainer/SpellbookContainer";
import { Character, Updater } from "types";

const INITIAL_CHARACTER: Character = {
    name: "Josh Mann",
    class: "Sorcerer",
    spellCastingModifier: 0,
    showSpellSaveDC: true,
};

function App() {
    const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);

    function handleUpdateCharacter(updater: Updater<Character>) {
        setCharacter(updater);
    }

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
                onCharacterChanged={handleUpdateCharacter}
            ></SpellbookContainer>
        </>
    );
}

export default App;
