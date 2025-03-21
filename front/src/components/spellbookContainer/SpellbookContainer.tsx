import Message from "components/message/Message";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { useEffect, useState } from "react";
import styles from "components/spellbookContainer/SpellbookContainer.module.css";
import CharacterSettingsDrawer from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer";
import BrowseDrawer from "components/drawer/browseDrawer/BrowseDrawer";
import MenuDrawer from "components/drawer/menuDrawer/MenuDrawer";
import type { SpellSummary, Spell, Character } from "types";
import fetchSpells from "remote/fetchSpells";
import fetchSpellSummaries from "remote/fetchSpellSummaries";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";

const LOADING_MESSAGE = <Message>Loading...</Message>;

const EMPTY_SPELLBOOK_MESSAGE = <Message>Spellbook is empty</Message>;

enum DrawerState {
    Settings,
    Browse,
    Menu,
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

const SPELLS_KEY = "spells";
const SPELL_SUMMARIES_KEY = "spellSummaries";

function SpellbookContainer({
    drawerState,
    onSetDrawerState,
    character,
    onCharacterValuesChanged,
}: Props) {
    const [spells, setSpells] = useStateWithLocalStorage<Spell[]>(
        SPELLS_KEY,
        []
    );
    const [
        spellSummaries,
        setSpellSummaries,
        spellSummariesLoadedFromLocalStorage,
    ] = useStateWithLocalStorage<SpellSummary[]>(SPELL_SUMMARIES_KEY, []);

    // When we keep track of users' spells in the backend, this will
    // be more meaningful, until then assume spells are always insta-loaded
    // since local storage is our only source of truth here
    const [spellsLoaded] = useState<boolean>(true);
    const [spellSummariesLoaded, setSpellSummariesLoaded] =
        useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (!spellSummariesLoaded && !spellSummariesLoadedFromLocalStorage) {
            fetchSpellSummaries().then((fetchedSpellSummaries) => {
                sortAlphabetically(fetchedSpellSummaries);
                setSpellSummaries(fetchedSpellSummaries);
                setSpellSummariesLoaded(true);
            });
        }
    }, [
        spellSummariesLoaded,
        setSpellSummaries,
        spellSummariesLoadedFromLocalStorage,
    ]);

    function handleCloseDrawer() {
        onSetDrawerState(DrawerState.None);
    }

    function handleAddSpell(requestedSpell: SpellSummary) {
        if (spells.some((spell) => spell.id === requestedSpell.id)) {
            return;
        }

        fetchSpells([requestedSpell.name]).then((spells) => {
            setSpells((previousSpells) =>
                combineAndSortSpells(previousSpells, spells)
            );
        });
    }

    function handleRemoveSpell(requestedSpell: SpellSummary) {
        if (!spells.some((spell) => spell.id === requestedSpell.id)) {
            return;
        }
        setSpells((previousSpells) =>
            previousSpells.filter((spell) => spell.id !== requestedSpell.id)
        );
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
                spellbookIds={spells.map((spell) => spell.id)}
                onAddSpell={handleAddSpell}
                onRemoveSpell={handleRemoveSpell}
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
                <Spellbook spells={filteredList} character={character} />
            )}
        </div>
    );
}

export { DrawerState };
export default SpellbookContainer;
