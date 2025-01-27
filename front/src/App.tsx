import { useEffect, useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    ModalState,
} from "components/spellbookContainer/SpellbookContainer";

function App() {
    const [characterName, setCharacterName] = useState<string>("Josh Mann");
    const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);

    function toggleState(targetState: ModalState) {
        setModalState(
            modalState === targetState ? ModalState.NONE : targetState
        );
    }

    return (
        <>
            <Header
                characterName={characterName}
                toggleMenu={() => toggleState(ModalState.MENU)}
                toggleSettings={() => toggleState(ModalState.SETTINGS)}
            />
            <SpellbookContainer
                modalState={modalState}
                setModalState={setModalState}
            ></SpellbookContainer>
        </>
    );
}

export default App;
