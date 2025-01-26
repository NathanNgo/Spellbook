import { useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    ModalState,
} from "components/spellbookContainer/SpellbookContainer";

function App() {
    const [characterName, setCharacterName] = useState<string>("Josh Mann");
    const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);

    return (
        <>
            <Header
                characterName={characterName}
                toggleMenu={() =>
                    setModalState(
                        modalState === ModalState.MENU
                            ? ModalState.NONE
                            : ModalState.MENU
                    )
                }
            />
            <SpellbookContainer
                modalState={modalState}
                setModalState={setModalState}
            ></SpellbookContainer>
        </>
    );
}

export default App;
