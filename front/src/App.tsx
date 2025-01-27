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
                onToggleMenu={() => toggleState(DrawerState.MENU)}
                onToggleSettings={() => toggleState(DrawerState.SETTINGS)}
            />
            <SpellbookContainer
                drawerState={drawerState}
                onSetDrawerState={setDrawerState}
            ></SpellbookContainer>
        </>
    );
}

export default App;
