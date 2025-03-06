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

const INITIAL_SPELL_REQUEST_NAMES = [
    // "Skim", // Missing from db
    "Identify",
    "Unseen Servant",
    "Comprehend Languages",
    "Heightened Awareness",
    "Obscuring Mist",
    "Feather Fall",
    "Ear-Piercing Scream",
    "Alarm",
    "Protection From Evil",
    "Charm Person",
    "Silent Image",
    "Vanish",
    "Grease",
    "Mage Armor",
    "Color Spray",
    "Enlarge Person",
    "Wish",
];
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
    const [spellForPage, setSpellForPage] = useState<Spell | null>(null);

    useEffect(() => {
        fetchSpells(INITIAL_SPELL_REQUEST_NAMES).then((spells) => {
            setSpells((previousSpells) =>
                combineAndSortSpells(previousSpells, spells)
            );
            setSpellsLoaded(true);
        });
        fetchSpellSummaries().then((spellSummaries) => {
            sortAlphabetically(spellSummaries);
            setSpellSummaries(spellSummaries);
        });
    }, []);

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

    function handleOpenPage(spell: Spell) {
        onSetDrawerState(DrawerState.Page);
        setSpellForPage(spell);
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
            <PageDrawer
                isOpen={drawerState === DrawerState.Page}
                onClose={handleCloseDrawer}
                onAddSpell={handleAddSpell}
                onRemoveSpell={handleRemoveSpell}
                spell={spellForPage}
                hasSpell={spellForPage !== null && spells.findIndex(spell => spell.id === (spellForPage.id)) !== -1}
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
                    onOpenPage={handleOpenPage}
                />
            )}
        </div>
    );
}

export { DrawerState };
export default SpellbookContainer;
