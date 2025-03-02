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

const SPELL_NAMES_KEY = "spellNames";
const SPELL_MANIFEST_KEY = "manifest";

function getLocallyStoredSpellNames(): string[] {
    const locallyStoredSpellNamesJSON = localStorage.getItem(SPELL_NAMES_KEY);
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
    const locallyStoreSpellSummariesJSON =
        localStorage.getItem(SPELL_MANIFEST_KEY);
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
    const [spells, setSpells] = useState<Spell[]>([]);
    const [spellSummaries, setSpellSummaries] = useState<SpellSummary[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [spellsLoaded, setSpellsLoaded] = useState<boolean>(false);

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
            localStorage.setItem(
                SPELL_MANIFEST_KEY,
                JSON.stringify(spellSummaries)
            );
        }
    }, [spellSummaries]);

    useEffect(() => {
        const spellNames = spells.map((spell) => spell.name);
        if (spellsLoaded) {
            localStorage.setItem(SPELL_NAMES_KEY, JSON.stringify(spellNames));
        }
    }, [spells, spellsLoaded]);

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
            setSpellsLoaded(true);
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

    const noSpellsDisplayMessage = !spellsLoaded
        ? LOADING_MESSAGE
        : EMPTY_SPELLBOOK_MESSAGE;

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
