import Message from "components/message/Message";
import Modal from "components/modal/Modal";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { Spell } from "components/spellRow/types";
import { useEffect, useState } from "react";
import styles from "components/SpellbookContainer/SpellbookContainer.module.css";

type Props = {
    menuIsOpen: boolean;
    onCloseMenu: () => void;
};

type UnvalidatedSpell = {
    id: number;
    name: string;
    short_description: string;
    sor: number;
    duration: string;
    range: string;
    saving_throw: string;
    spell_resistance: string;
};

function SpellbookContainer({ menuIsOpen, onCloseMenu }: Props) {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
    const [browseIsOpen, setBrowseIsOpen] = useState<boolean>(false);
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

    useEffect(() => {
        const requestedSpellNames = [
            "Wish",
            "Fireball",
            "Magic Missile",
            "Grease",
            "Charm Person",
            "Wall Of Fire",
            "Wall Of Ice",
        ];
        fetch("http://localhost:3000", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                spellNames: requestedSpellNames,
            }),
        })
            .then((response) => response.json())
            .then((unvalidatedSpells: UnvalidatedSpell[]) => {
                unvalidatedSpells.sort((a, b) => a.name.localeCompare(b.name));
                const convertedSpells = unvalidatedSpells.map(
                    (spell): Spell => {
                        return {
                            id: spell.id,
                            name: spell.name,
                            description: spell.short_description,
                            level: spell.sor,
                            duration: spell.duration,
                            range: spell.range,
                            savingThrow: spell.saving_throw,
                            spellResistance: spell.spell_resistance,
                        };
                    }
                );
                setSpells(convertedSpells);
            })
            .finally(() => setSpellsLoaded(true));
    }, []);

    return (
        <div className={styles.spellbookContainer}>
            <Modal
                isOpen={settingsIsOpen}
                onClose={() => setSettingsIsOpen(false)}
                side="left"
                width="35%"
            >
                hi this is the settings!
            </Modal>

            <Modal
                isOpen={browseIsOpen}
                onClose={() => setBrowseIsOpen(false)}
                side="right"
                width="60%"
            >
                hi browse spells here!
            </Modal>
            <Modal
                isOpen={menuIsOpen}
                onClose={onCloseMenu}
                side="left"
                width="35%"
            >
                Burger menu :3
            </Modal>
            <SpellbookToolbar
                onSearchQueryChange={handleSearchQueryChange}
                searchQuery={searchQuery}
                openSettings={() => setSettingsIsOpen(true)}
                openBrowse={() => setBrowseIsOpen(true)}
            />
            {spellsLoaded ? (
                <Spellbook spells={filteredList} />
            ) : (
                <Message>Loading...</Message>
            )}
        </div>
    );
}

export default SpellbookContainer;
