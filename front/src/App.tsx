import { useEffect, useState } from "react";
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

const CHARACTERS_KEY = "characters";

function getLocallyStoredCharacter(): Character {
    const locallyStoredCharactersJSON = localStorage.getItem(CHARACTERS_KEY);
    if (locallyStoredCharactersJSON === null) {
        return { ...INITIAL_CHARACTER, id: crypto.randomUUID() };
    }
    const locallyStoredCharacters: Character[] = JSON.parse(
        locallyStoredCharactersJSON
    );
    const firstCharacter = locallyStoredCharacters[0];
    return {
        name: firstCharacter.name,
        class: firstCharacter.class,
        spellCastingModifier: firstCharacter.spellCastingModifier,
        showSpellSaveDC: firstCharacter.showSpellSaveDC,
        id: firstCharacter.id,
    };
}

function App() {
    const [character, setCharacter] = useState<Character>(
        getLocallyStoredCharacter()
    );

    useEffect(() => {
        localStorage.setItem(CHARACTERS_KEY, JSON.stringify([character]));
    }, [character]);

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
