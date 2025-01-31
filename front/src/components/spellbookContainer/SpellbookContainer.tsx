import Message from "components/message/Message";
import Drawer from "components/drawer/Drawer";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { useEffect, useState } from "react";
import styles from "components/spellbookContainer/SpellbookContainer.module.css";
import SettingsDrawer from "components/drawers/settingsDrawer/SettingsDrawer";
import BrowseDrawer from "components/drawers/browseDrawer/browseDrawer";
import MenuDrawer, { Theme } from "components/drawers/menuDrawer/MenuDrawer";
import { SpellArraySchema, Spells } from "schemas";

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

function sortAlphabetically(spells: Spells) {
    spells.sort((firstSpell, secondSpell) =>
        firstSpell.name.localeCompare(secondSpell.name)
    );
}

type UnvalidatedManifestSpell = {
    name: string;
    short_description: string;
    sor: number | null;
};

function SpellbookContainer({ drawerState, onSetDrawerState }: Props) {
    const [spells, setSpells] = useState<Spells>([]);
    const [spellManifest, setSpellManifest] = useState<ManifestSpellDetails[]>(
        []
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const spellsLoaded = spells.length > 0;
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

        fetch("http://localhost:3000/spells", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                spellNames: requestedSpellNames,
            }),
        })
            .then((response) => response.json())
            .then((unvalidatedSpells: Spells) => {
                const spells = SpellArraySchema.parse(unvalidatedSpells);
                sortAlphabetically(spells);
                setSpells(spells);

        fetch("http://localhost:3000/manifest")
            .then((response) => response.json())
            .then((unvalidatedManifestSpells: UnvalidatedManifestSpell[]) => {
                const validatedManifestSpells: ManifestSpellDetails[] =
                    unvalidatedManifestSpells.map(
                        (spell: UnvalidatedManifestSpell) => {
                            return {
                                name: spell.name,
                                short_description: spell.short_description,
                                level: spell.sor,
                            };
                        }
                    );
                setSpellManifest(validatedManifestSpells);
            });
    }, []);

    function handleCloseDrawer() {
        onSetDrawerState(DrawerState.None);
    }

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
            />
            <SpellbookToolbar
                onSearchQueryChange={handleSearchQueryChange}
                searchQuery={searchQuery}
                onOpenSettings={() => onSetDrawerState(DrawerState.Settings)}
                onOpenBrowse={() => onSetDrawerState(DrawerState.Browse)}
            />
            {spellsLoaded ? (
                <Spellbook spells={filteredList} />
            ) : (
                <Message>Loading...</Message>
            )}
        </div>
    );
}

export { DrawerState };
export default SpellbookContainer;
