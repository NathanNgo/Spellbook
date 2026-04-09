import Message from "components/message/Message";
import SpellbookTables from "components/spellbookTables/SpellbookTables";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { useEffect, useRef, useState } from "react";
import styles from "components/spellbook/Spellbook.module.css";
import CharacterSettingsDrawer from "components/drawer/characterSettingsDrawer/CharacterSettingsDrawer";
import BrowseDrawer from "components/drawer/browseDrawer/BrowseDrawer";
import MenuDrawer from "components/drawer/menuDrawer/MenuDrawer";
import type { SpellSummary, Spell, Character } from "types";
import fetchSpells from "remote/fetchSpells";
import fetchSpellSummaries from "remote/fetchSpellSummaries";
import SpellPageDrawer from "components/drawer/spellPageDrawer/SpellPageDrawer";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";

const LOADING_MESSAGE = <Message>Loading...</Message>;

const EMPTY_SPELLBOOK_MESSAGE = <Message>Spellbook is empty</Message>;

enum DrawerState {
    Settings,
    Browse,
    Menu,
    SpellPage,
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

const SPELLS_KEY = "spellbookSpells";
const SPELL_SUMMARIES_KEY = "spellSummaries";

function Spellbook({
    drawerState,
    onSetDrawerState,
    character,
    onCharacterValuesChanged,
}: Props) {
    const [spells, setSpells] = useStateWithLocalStorage<Spell[]>(SPELLS_KEY, []);
    const [spellSummaries, setSpellSummaries, spellSummariesLoadedFromLocalStorage] =
        useStateWithLocalStorage<SpellSummary[]>(SPELL_SUMMARIES_KEY, []);

    const spellPageDrawerRef = useRef<HTMLDivElement>(null);

    // When we keep track of users' spells in the backend, this will
    // be more meaningful, until then assume spells are always insta-loaded
    // since local storage is our only source of truth here
    const [spellsLoaded] = useState<boolean>(true);
    const [spellSummariesLoadedFromNetwork, setSpellSummariesLoadedFromNetwork] =
        useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [spellForPage, setSpellForPage] = useState<Spell | null>(null);
    const [spellPageIsLoading, setSpellPageIsLoading] = useState<boolean>(false);
    const [spellPageOpenedFromBrowse, setSpellPageOpenedFromBrowse] =
        useState<boolean>(false);

    useEffect(() => {
        if (!spellSummariesLoadedFromNetwork && !spellSummariesLoadedFromLocalStorage) {
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

    function handleOpenDrawer(newDrawerState: DrawerState) {
        if (newDrawerState === DrawerState.SpellPage && spellPageDrawerRef.current) {
            spellPageDrawerRef.current.scrollTop = 0;
        }
        onSetDrawerState(newDrawerState);
    }

    function handleCloseDrawer() {
        onSetDrawerState(DrawerState.None);
    }

    function handleAddSpellToSpellbook(requestedSpell: SpellSummary) {
        if (spells.some((spell) => spell.id === requestedSpell.id)) {
            return;
        }

        fetchSpells([requestedSpell.name]).then((spells) => {
            setSpells((previousSpells) => combineAndSortSpells(previousSpells, spells));
        });
    }

    function handleRemoveSpellFromSpellbook(requestedSpell: SpellSummary) {
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
        filteredList = spells.filter((spell) => spell.name.toLowerCase().includes(query));
    }

    function handleOpenPage(spell: Spell) {
        setSpellPageIsLoading(false);
        handleOpenDrawer(DrawerState.SpellPage);
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
        handleOpenDrawer(DrawerState.SpellPage);
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
            <SpellPageDrawer
                isOpen={drawerState === DrawerState.SpellPage}
                onClose={handleCloseDrawer}
                onAddSpell={handleAddSpellToSpellbook}
                onRemoveSpell={handleRemoveSpellFromSpellbook}
                spell={spellForPage}
                characterHasSpellInSpellbook={
                    spellForPage !== null &&
                    spells.map((spell) => spell.id).includes(spellForPage.id)
                }
                showLoading={spellPageIsLoading}
                isFromBrowse={spellPageOpenedFromBrowse}
                onBackButtonClicked={() => handleOpenDrawer(DrawerState.Browse)}
                character={character}
                drawerRef={spellPageDrawerRef}
            />
            <SpellbookToolbar
                onSearchQueryChange={handleSearchQueryChange}
                searchQuery={searchQuery}
                onOpenSettings={() => handleOpenDrawer(DrawerState.Settings)}
                onOpenBrowse={() => handleOpenDrawer(DrawerState.Browse)}
            />

            {spells.length === 0 ? (
                noSpellsDisplayMessage
            ) : (
                <SpellbookTables
                    spells={filteredList}
                    character={character}
                    onOpenPage={handleOpenPageFromSpellbook}
                />
            )}
        </div>
    );
}

export { DrawerState };
export default Spellbook;
