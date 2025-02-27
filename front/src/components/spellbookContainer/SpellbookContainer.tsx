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
    onCharacterChanged: (update: Partial<Character>) => void;
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

const SPELLNAMES_KEY = "spell_names";
const MANIFEST_KEY = "manifest";

function getLocallyStoredSpellNames(): string[] {
    const locallyStoredSpellNamesJSON = localStorage.getItem(SPELLNAMES_KEY);
    if (locallyStoredSpellNamesJSON === null) {
        return [];
    }
    const locallyStoredSpellNames: string[] = JSON.parse(
        locallyStoredSpellNamesJSON
    );
    return locallyStoredSpellNames;
}

function getLocallyStoredManifestAndSetState(
    setSpellSummaries: (spellSummaries: SpellSummary[]) => void
) {
    const locallyStoreSpellSummariesJSON = localStorage.getItem(MANIFEST_KEY);
    if (locallyStoreSpellSummariesJSON === null) {
        fetchSpellSummaries().then((spellSummaries) => {
            sortAlphabetically(spellSummaries);
            setSpellSummaries(spellSummaries);
        });
        return;
    }
    const locallyStoreSpellSummaries: SpellSummary[] = JSON.parse(
        locallyStoreSpellSummariesJSON
    );
    setSpellSummaries(locallyStoreSpellSummaries);
}

function SpellbookContainer({
    drawerState,
    onSetDrawerState,
    character,
    onCharacterChanged,
}: Props) {
    const [spells, setSpells, _spellsLoadedFromStorage] =
        useStateWithLocalStorage<Spell[]>(SPELLS_KEY, []);
    const [spellSummaries, setSpellSummaries, spellSummariesLoadedFromStorage] =
        useStateWithLocalStorage<SpellSummary[]>(SPELL_SUMMARIES_KEY, []);
    const [spellsLoaded, _setSpellsLoaded] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    useEffect(() => {
        const spellNames = getLocallyStoredSpellNames();
        fetchSpells(spellNames).then((spells) => {
            setSpells((previousSpells) =>
                combineAndSortSpells(previousSpells, spells)
            );
            setSpellsLoaded(true);
        });

        getLocallyStoredManifestAndSetState(setSpellSummaries);
    }, []);

    useEffect(() => {
        if (spellSummaries.length > 0) {
            localStorage.setItem(MANIFEST_KEY, JSON.stringify(spellSummaries));
        }
    }, [spellSummaries]);

    useEffect(() => {
        const spellNames = spells.map((spell) => spell.name);
        localStorage.setItem(SPELLNAMES_KEY, JSON.stringify(spellNames));
    }, [spells]);

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
                onCharacterChanged={onCharacterChanged}
            />
            <MenuDrawer
                isOpen={drawerState === DrawerState.Menu}
                onClose={handleCloseDrawer}
            />
            <BrowseDrawer
                isOpen={drawerState === DrawerState.Browse}
                onClose={handleCloseDrawer}
                spellSummaries={spellSummaries}
                spellSummariesLoaded={spellSummariesLoadedFromStorage}
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
