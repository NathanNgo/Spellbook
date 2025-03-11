import { useMemo, useState } from "react";
import "App.css";
import Header from "components/header/Header";
import SpellbookContainer, {
    DrawerState,
} from "components/spellbookContainer/SpellbookContainer";
import { Character } from "types";
import { ClassName } from "common/character";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";

const INITIAL_CHARACTER: Character = {
    name: "Josh Mann",
    class: ClassName.Sorcerer,
    spellCastingModifier: 0,
    showSpellSaveDC: true,
    id: crypto.randomUUID(),
};

const CHARACTERS_KEY = "characters";
const CHARACTER_ID_KEY = "character_id";

function App() {
    const [characters, setCharacters] = useStateWithLocalStorage<Character[]>(
        CHARACTERS_KEY,
        [INITIAL_CHARACTER]
    );
    const [currentCharacterID] = useStateWithLocalStorage<string>(
        CHARACTER_ID_KEY,
        characters[0].id
    );

    const currentCharacter: Character = useMemo(() => {
        return (
            characters.find(
                (character) => character.id == currentCharacterID
            ) || INITIAL_CHARACTER
        );
    }, [characters, currentCharacterID]);

    function handleCharacterValuesChanged(
        updatedCharacterValues: Partial<Character>
    ) {
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
                onCharacterValuesChanged={handleCharacterValuesChanged}
            ></SpellbookContainer>
        </>
    );
}

export default App;
