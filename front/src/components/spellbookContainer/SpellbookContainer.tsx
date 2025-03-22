import Message from "components/message/Message";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { useEffect, useState } from "react";
import styles from "components/spellbookContainer/SpellbookContainer.module.css";
import CharacterSettingsDrawer from "components/drawer/characterSettingsDrawer/CharacterSettingsDrawer";
import BrowseDrawer from "components/drawer/browseDrawer/BrowseDrawer";
import MenuDrawer from "components/drawer/menuDrawer/MenuDrawer";
import type { SpellSummary, Spell, Character } from "types";
import fetchSpells from "remote/fetchSpells";
import fetchSpellSummaries from "remote/fetchSpellSummaries";
import PageDrawer from "components/drawer/pageDrawer/PageDrawer";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";
import { CharacterSpells } from "common/character";

const LOADING_MESSAGE = <Message>Loading...</Message>;

const EMPTY_SPELLBOOK_MESSAGE = <Message>Spellbook is empty</Message>;

enum DrawerState {
    Settings,
    Browse,
    Menu,
    Page,
    None,
}

type Props = {
    drawerState: DrawerState;
    onSetDrawerState: (drawerState: DrawerState) => void;
    character: Character;
    onCharacterValuesChanged: (update: Partial<Character>) => void;
};

function sortAlphabetically(spells: Spell[] | SpellSummary[]) {
    spells.sort((firstSpell, secondSpell) =>
        firstSpell.name.localeCompare(secondSpell.name)
    );
}

function combineAndSortSpells(previousSpells: Spell[], newSpells: Spell[]) {
    const previousSpellIds = previousSpells.map((spell) => spell.id);
    const spellsToAdd = newSpells.filter(
        (newSpell) => !previousSpellIds.includes(newSpell.id)
    );
    const combinedSpells = [...previousSpells, ...spellsToAdd];
    sortAlphabetically(combinedSpells);
    return combinedSpells;
}

const ALL_CHARACTER_SPELLS_KEY = "characterSpells";
const SPELL_SUMMARIES_KEY = "spellSummaries";

const DEFAULT_SPELLS: Spell[] = [];

function SpellbookContainer({
    drawerState,
    onSetDrawerState,
    character,
    onCharacterValuesChanged,
}: Props) {
    const [allCharacterSpells, setAllCharacterSpells] =
        useStateWithLocalStorage<CharacterSpells[]>(
            ALL_CHARACTER_SPELLS_KEY,
            []
        );

    function getSpellsForCharacter(character: Character): Spell[] | undefined {
        return allCharacterSpells.find(
            (characterSpells) =>
                characterSpells.characterName === character.name
        )?.spells;
    }

    function setCharacterSpells(character: Character, spellList: Spell[]) {
        const characterSpellIndex = allCharacterSpells.findIndex(
            (characterSpells) =>
                characterSpells.characterName === character.name
        );

        const newCharacterSpells: CharacterSpells = {
            characterName: character.name,
            spells: spellList,
        };

        if (characterSpellIndex !== -1) {
            setAllCharacterSpells((prevAllCharacterSpells) =>
                prevAllCharacterSpells.map((characterSpells, index) =>
                    index === characterSpellIndex
                        ? newCharacterSpells
                        : characterSpells
                )
            );
            return;
        }
        setAllCharacterSpells((prevAllCharacterSpells) => [
            ...prevAllCharacterSpells,
            newCharacterSpells,
        ]);
    }

    const currentCharacterSpells = getSpellsForCharacter(character);
    const spells =
        currentCharacterSpells === undefined
            ? DEFAULT_SPELLS
            : currentCharacterSpells;
    if (currentCharacterSpells === undefined) {
        setCharacterSpells(character, DEFAULT_SPELLS);
    }

    function setSpells(newSpells: Spell[]) {
        setCharacterSpells(character, newSpells);
    }

    const [
        spellSummaries,
        setSpellSummaries,
        spellSummariesLoadedFromLocalStorage,
    ] = useStateWithLocalStorage<SpellSummary[]>(SPELL_SUMMARIES_KEY, []);

    // When we keep track of users' spells in the backend, this will
    // be more meaningful, until then assume spells are always insta-loaded
    // since local storage is our only source of truth here
    const [spellsLoaded] = useState<boolean>(true);
    const [
        spellSummariesLoadedFromNetwork,
        setSpellSummariesLoadedFromNetwork,
    ] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [spellForPage, setSpellForPage] = useState<Spell | null>(null);
    const [spellPageIsLoading, setSpellPageIsLoading] =
        useState<boolean>(false);
    const [spellPageOpenedFromBrowse, setSpellPageOpenedFromBrowse] =
        useState<boolean>(false);

    useEffect(() => {
        if (
            !spellSummariesLoadedFromNetwork &&
            !spellSummariesLoadedFromLocalStorage
        ) {
            fetchSpellSummaries().then((fetchedSpellSummaries) => {
                sortAlphabetically(fetchedSpellSummaries);
                setSpellSummaries(fetchedSpellSummaries);
                setSpellSummariesLoadedFromNetwork(true);
            });
        }
    }, [
        spellSummariesLoadedFromNetwork,
        setSpellSummaries,
        spellSummariesLoadedFromLocalStorage,
    ]);

    const spellSummariesLoaded =
        spellSummariesLoadedFromNetwork || spellSummariesLoadedFromLocalStorage;

    function handleCloseDrawer() {
        onSetDrawerState(DrawerState.None);
    }

    function handleAddSpellToSpellbook(requestedSpell: SpellSummary) {
        if (spells.some((spell) => spell.id === requestedSpell.id)) {
            return;
        }

        fetchSpells([requestedSpell.name]).then((fetchedSpells) => {
            setSpells(combineAndSortSpells(spells, fetchedSpells));
        });
    }

    function handleRemoveSpellFromSpellbook(requestedSpell: SpellSummary) {
        if (!spells.some((spell) => spell.id === requestedSpell.id)) {
            return;
        }
        setSpells(spells.filter((spell) => spell.id !== requestedSpell.id));
    }

    const noSpellsDisplayMessage = spellsLoaded
        ? EMPTY_SPELLBOOK_MESSAGE
        : LOADING_MESSAGE;

    function handleSearchQueryChange(query: string) {
        setSearchQuery(query);
    }

    let filteredList: Spell[] = spells;
    const query = searchQuery.trim().toLowerCase();

    if (query !== "") {
        filteredList = spells.filter((spell) =>
            spell.name.toLowerCase().includes(query)
        );
    }

    function handleOpenPage(spell: Spell) {
        setSpellPageIsLoading(false);
        onSetDrawerState(DrawerState.Page);
        setSpellForPage(spell);
    }

    function handleOpenPageFromSpellbook(spell: Spell) {
        handleOpenPage(spell);
        setSpellPageOpenedFromBrowse(false);
    }

    function handleOpenSpellPageFromBrowse(spellSummary: SpellSummary) {
        setSpellPageOpenedFromBrowse(true);
        setSpellPageIsLoading(true);
        fetchSpells([spellSummary.name]).then(([spell]) => {
            setSpellForPage(spell);
            setSpellPageIsLoading(false);
        });
        onSetDrawerState(DrawerState.Page);
    }

    return (
        <div className={styles.spellbookContainer}>
            <CharacterSettingsDrawer
                isOpen={drawerState === DrawerState.Settings}
                onClose={handleCloseDrawer}
                character={character}
                onCharacterValuesChanged={onCharacterValuesChanged}
            />
            <MenuDrawer
                isOpen={drawerState === DrawerState.Menu}
                onClose={handleCloseDrawer}
            />
            <BrowseDrawer
                isOpen={drawerState === DrawerState.Browse}
                onClose={handleCloseDrawer}
                spellSummaries={spellSummaries}
                spellSummariesLoaded={spellSummariesLoaded}
                character={character}
                spellIds={spells.map((spell) => spell.id)}
                onAddSpell={handleAddSpellToSpellbook}
                onRemoveSpell={handleRemoveSpellFromSpellbook}
                onOpenPage={handleOpenSpellPageFromBrowse}
            />
            <PageDrawer
                isOpen={drawerState === DrawerState.Page}
                onClose={handleCloseDrawer}
                onAddSpell={handleAddSpellToSpellbook}
                onRemoveSpell={handleRemoveSpellFromSpellbook}
                spell={spellForPage}
                hasSpell={
                    spellForPage !== null &&
                    spells.map((spell) => spell.id).includes(spellForPage.id)
                }
                showLoading={spellPageIsLoading}
                isFromBrowse={spellPageOpenedFromBrowse}
                onOpenBrowse={() => onSetDrawerState(DrawerState.Browse)}
                character={character}
            />
            <SpellbookToolbar
                onSearchQueryChange={handleSearchQueryChange}
                searchQuery={searchQuery}
                onOpenSettings={() => onSetDrawerState(DrawerState.Settings)}
                onOpenBrowse={() => onSetDrawerState(DrawerState.Browse)}
            />

            {spells.length === 0 ? (
                noSpellsDisplayMessage
            ) : (
                <Spellbook
                    spells={filteredList}
                    character={character}
                    onOpenPage={handleOpenPageFromSpellbook}
                />
            )}
        </div>
    );
}

export { DrawerState };
export default SpellbookContainer;
