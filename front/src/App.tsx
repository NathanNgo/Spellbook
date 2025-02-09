import { useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    DrawerState,
} from "components/spellbookContainer/SpellbookContainer";

type Character = {
    name: string;
    class: string;
    spellCastingModifier: number;
    showSpellSaveDC: boolean;
};

function App() {
    const [character, setCharacter] = useState<Character>({
        name: "Josh Mann",
        class: "Sorcerer",
        spellCastingModifier: 0,
        showSpellSaveDC: true,
    });

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
export type { Character };
