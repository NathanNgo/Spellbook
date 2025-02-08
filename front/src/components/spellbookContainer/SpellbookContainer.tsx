import Message from "components/message/Message";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { useEffect, useState } from "react";
import styles from "components/spellbookContainer/SpellbookContainer.module.css";
import SettingsDrawer from "components/drawer/settingsDrawer/SettingsDrawer";
import BrowseDrawer from "components/drawer/browseDrawer/BrowseDrawer";
import MenuDrawer from "components/drawer/menuDrawer/MenuDrawer";
import { ManifestSpellDetailArraySchema, SpellArraySchema } from "schemas";
import type { ManifestSpellDetails, Spells } from "schemas";
import useFetchSpells from "hooks/useFetchSpells";
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
};

function sortAlphabetically(spells: Spells | ManifestSpellDetails) {
    spells.sort((firstSpell, secondSpell) =>
        firstSpell.name.localeCompare(secondSpell.name)
    );
}

function combineSpells(previousSpells: Spells, newSpells: Spells) {
    const spellsToAdd = newSpells.filter(
        (spell) =>
            !previousSpells.some(
                (previousSpell) => previousSpell.id === spell.id
            )
    );
    const combinedSpells = [...previousSpells, ...spellsToAdd];
    sortAlphabetically(combinedSpells);
    return combinedSpells;
}

function SpellbookContainer({ drawerState, onSetDrawerState }: Props) {
    const [spells, setSpells] = useState<Spells>([]);
    const [spellManifest, setSpellManifest] = useState<ManifestSpellDetails>(
        []
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [spellsLoaded, setSpellsLoaded] = useState<boolean>(false);
    function handleSearchQueryChange(query: string) {
        setSearchQuery(query);
    }

    let filteredList: Spells = spells;
    const query = searchQuery.trim().toLowerCase();

    if (query !== "") {
        filteredList = spells.filter((spell) =>
            spell.name.toLowerCase().includes(query)
        );
    }

    async function requestSpells(requestedSpellNames: string[]) {
        const responseSpells = await useFetchSpells(requestedSpellNames);

        sortAlphabetically(responseSpells);
        if (spells.length === 0) {
            setSpells(responseSpells);
        } else {
            setSpells((previousSpells) =>
                combineSpells(previousSpells, responseSpells)
            );
        }
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
            .then((unvalidatedManifestSpellDetails: ManifestSpellDetails) => {
                const manifestSpellDetails =
                    ManifestSpellDetailArraySchema.parse(
                        unvalidatedManifestSpellDetails
                    );
                sortAlphabetically(manifestSpellDetails);
                setSpellManifest(manifestSpellDetails);
            });
    }, []);

    function handleCloseDrawer() {
        onSetDrawerState(DrawerState.None);
    }

    function handleAddSpell(spellId: number) {
        if (spells.some((spell) => spell.id === spellId)) {
            return;
        }
        const requestedSpell =
            spellManifest.find((spell) => spell.id == spellId)?.name || "";
        requestSpells([requestedSpell]);
    }

    function handleRemoveSpell(spellId: number) {
        if (!spells.some((spell) => spell.id === spellId)) {
            return;
        }
        setSpells((previousSpells) =>
            previousSpells.filter((spell) => spell.id !== spellId)
        );
    }

    const loadingMessage = <Message>Loading...</Message>;

    const emptySpellbookMessage = <Message>Spellbook is empty</Message>;

    const noSpellsDisplayMessage = !spellsLoaded
        ? loadingMessage
        : emptySpellbookMessage;

    return (
        <div className={styles.spellbookContainer}>
            <SettingsDrawer
                isOpen={drawerState === DrawerState.Settings}
                onClose={handleCloseDrawer}
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
