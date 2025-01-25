import { useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer from "components/SpellbookContainer/SpellbookContainer";

function App() {
    const [characterName, setCharacterName] = useState<string>("Josh Mann");
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    return (
        <>
            <Header
                characterName={characterName}
                toggleMenu={() => setMenuIsOpen(!menuIsOpen)}
            />
            <SpellbookContainer
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
            ></SpellbookContainer>
        </>
    );
}

export default App;
