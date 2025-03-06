import { useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    DrawerState,
} from "components/spellbookContainer/SpellbookContainer";
import { Character } from "types";
import { ClassName } from "common/character";

const INITIAL_CHARACTER: Character = {
    name: "Josh Mann",
    class: ClassName.Sorcerer,
    spellCastingModifier: 0,
    showSpellSaveDC: true,
    id: "",
};

function App() {
    const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);

    function handleUpdateCharacter(updatedCharacterValues: Partial<Character>) {
        setCharacter((previousCharacter) => ({
            ...previousCharacter,
            ...updatedCharacterValues,
        }));
    }

    const [drawerState, setDrawerState] = useState<DrawerState>(
        DrawerState.None
    );

    function toggleState(targetState: DrawerState) {
        const isClosingDrawer = drawerState == targetState;
        setDrawerState(isClosingDrawer ? DrawerState.None : targetState);
        const body = document.body;
        if (isClosingDrawer) {
            body.classList.remove("noscroll");
        } else {
            body.classList.add("noscroll");
        }
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
