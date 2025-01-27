import { useEffect, useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    DrawerState,
} from "components/spellbookContainer/SpellbookContainer";

function App() {
    const [characterName, setCharacterName] = useState<string>("Josh Mann");
    const [drawerState, setDrawerState] = useState<DrawerState>(
        DrawerState.NONE
    );

    function toggleState(targetState: DrawerState) {
        setDrawerState(
            drawerState === targetState ? DrawerState.NONE : targetState
        );
    }

    return (
        <>
            <Header
                characterName={characterName}
                toggleMenu={() => toggleState(DrawerState.MENU)}
                toggleSettings={() => toggleState(DrawerState.SETTINGS)}
            />
            <SpellbookContainer
                drawerState={drawerState}
                setDrawerState={setDrawerState}
            ></SpellbookContainer>
        </>
    );
}

export default App;
