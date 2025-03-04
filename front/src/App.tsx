import { useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    DrawerState,
} from "components/spellbookContainer/SpellbookContainer";
import { Character } from "types";
import { ClassName } from "common/character";
import useStateWithLocalStorageOrFetch from "hooks/useStateWithLocalStorageOrFetch";

const INITIAL_CHARACTER: Character = {
    name: "Josh Mann",
    class: ClassName.Sorcerer,
    spellCastingModifier: 0,
    showSpellSaveDC: true,
    id: "",
};

const CHARACTERS_KEY = "characters";

function App() {
    const fallbackCharacter: Character = {
        ...INITIAL_CHARACTER,
        id: crypto.randomUUID(),
    };

    const [characters, setCharacters] =
        useStateWithLocalStorageOrFetch<Character[]>({
            key: CHARACTERS_KEY,
            defaultValue: [fallbackCharacter],
        });
    const [currentCharacterID, _setCurrentCharacterID] = useState<String>(
        characters[0].id
    );

    const currentCharacter: Character =
        characters.find((character) => character.id == currentCharacterID) ||
        fallbackCharacter;

    function handleUpdateCharacter(updatedCharacterValues: Partial<Character>) {
        setCharacters((previousCharacters) => {
            const updatedCharacter: Character = {
                ...currentCharacter,
                ...updatedCharacterValues,
            };
            return [
                ...previousCharacters.filter(
                    (character) => character.id !== currentCharacterID
                ),
                updatedCharacter,
            ];
        });
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
                characterName={currentCharacter.name}
                onToggleMenu={() => toggleState(DrawerState.Menu)}
                onToggleSettings={() => toggleState(DrawerState.Settings)}
            />
            <SpellbookContainer
                drawerState={drawerState}
                onSetDrawerState={setDrawerState}
                character={currentCharacter}
                onCharacterChanged={handleUpdateCharacter}
            ></SpellbookContainer>
        </>
    );
}

export default App;
