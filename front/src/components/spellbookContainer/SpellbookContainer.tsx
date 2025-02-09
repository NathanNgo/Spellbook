import Message from "components/message/Message";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { useEffect, useState } from "react";
import styles from "components/spellbookContainer/SpellbookContainer.module.css";
import CharacterSettingsDrawer from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer";
import BrowseDrawer from "components/drawer/browseDrawer/BrowseDrawer";
import MenuDrawer from "components/drawer/menuDrawer/MenuDrawer";
import { SpellSummaryArraySchema } from "schemas";
import type { SpellSummary, Spell } from "schemas";
import fetchSpells from "remote/fetchSpells";
import { MANIFEST_ENDPOINT } from "urls";

enum DrawerState {
    Settings,
    Browse,
    Menu,
    None,
}

type Props = {
    drawerState: DrawerState;
    onSetDrawerState: (drawerState: DrawerState) => void;
    characterName: string;
    onCharacterNameChanged: (characterName: string) => void;
};

function sortAlphabetically(spells: Spell[] | SpellSummary[]) {
    spells.sort((firstSpell, secondSpell) =>
        firstSpell.name.localeCompare(secondSpell.name)
    );
}

function combineSpells(previousSpells: Spell[], newSpells: Spell[]) {
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
    characterName,
    onCharacterNameChanged,
}: Props) {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [spellManifest, setSpellManifest] = useState<SpellSummary[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [spellsLoaded, setSpellsLoaded] = useState<boolean>(false);
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

    async function requestSpells(requestedSpellNames: string[]) {
        const responseSpells = await fetchSpells(requestedSpellNames);
        setSpells((previousSpells) =>
            combineSpells(previousSpells, responseSpells)
        );
    }

    useEffect(() => {
        const requestedSpellNames = [
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

        requestSpells(requestedSpellNames).then(() => setSpellsLoaded(true));

        fetch(MANIFEST_ENDPOINT)
            .then((response) => response.json())
            .then((unvalidatedSpellSummarys: SpellSummary[]) => {
                const spellSummaries = SpellSummaryArraySchema.parse(
                    unvalidatedSpellSummarys
                );
                sortAlphabetically(spellSummaries);
                setSpellManifest(spellSummaries);
            });
    }, []);

    function handleCloseDrawer() {
        onSetDrawerState(DrawerState.None);
    }

    function handleAddSpell(requestedSpell: SpellSummary) {
        if (spells.some((spell) => spell.id === requestedSpell.id)) {
            return;
        }

        requestSpells([requestedSpell.name]);
    }

    function handleRemoveSpell(requestedSpell: SpellSummary) {
        if (!spells.some((spell) => spell.id === requestedSpell.id)) {
            return;
        }
        setSpells((previousSpells) =>
            previousSpells.filter((spell) => spell.id !== requestedSpell.id)
        );
    }

    const loadingMessage = <Message>Loading...</Message>;

    const emptySpellbookMessage = <Message>Spellbook is empty</Message>;

    const noSpellsDisplayMessage = !spellsLoaded
        ? loadingMessage
        : emptySpellbookMessage;

    return (
        <div className={styles.spellbookContainer}>
            <CharacterSettingsDrawer
                isOpen={drawerState === DrawerState.Settings}
                onClose={handleCloseDrawer}
                characterName={characterName}
                onCharacterNameChanged={onCharacterNameChanged}
            />
            <MenuDrawer
                isOpen={drawerState === DrawerState.Menu}
                onClose={handleCloseDrawer}
            />
            <BrowseDrawer
                isOpen={drawerState === DrawerState.Browse}
                onClose={handleCloseDrawer}
                spellManifest={spellManifest}
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
                <Spellbook spells={filteredList} />
            )}
        </div>
    );
}

export { DrawerState };
export default SpellbookContainer;
