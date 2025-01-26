import Message from "components/message/Message";
import Modal from "components/modal/Modal";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";
import { Spell } from "components/spellRow/types";
import { useEffect, useState } from "react";
import styles from "components/SpellbookContainer/SpellbookContainer.module.css";
import SettingsModal from "components/modals/settingsModal/SettingsModal";
import BrowseModal from "components/modals/browseModal/browseModal";
import MenuModal from "components/modals/menuModal/MenuModal";

enum ModalState {
    SETTINGS,
    BROWSE,
    MENU,
    NONE,
}

type Props = {
    modalState: ModalState;
    setModalState: (modalState: ModalState) => void;
};

type UnvalidatedSpell = {
    id: number;
    name: string;
    short_description: string;
    sor: number | null;
    duration: string | null;
    range: string | null;
    saving_throw: string | null;
    spell_resistance: string | null;
};

function SpellbookContainer({ modalState, setModalState }: Props) {
    const [spells, setSpells] = useState<Spell[]>([]);
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

    useEffect(() => {
        const _requestedSpellNames = [
            "Wish",
            "Fireball",
            "Magic Missile",
            "Grease",
            "Charm Person",
            "Wall Of Fire",
            "Wall Of Ice",
        ];

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
            .then((unvalidatedSpells: UnvalidatedSpell[]) => {
                unvalidatedSpells.sort((a, b) => a.name.localeCompare(b.name));
                const convertedSpells = unvalidatedSpells.map(
                    (spell): Spell => {
                        return {
                            id: spell.id,
                            name: spell.name,
                            description: spell.short_description,
                            level: spell.sor || null,
                            duration: spell.duration || "",
                            range: spell.range || "",
                            savingThrow: spell.saving_throw || "",
                            spellResistance: spell.spell_resistance || "",
                        };
                    }
                );
                setSpells(convertedSpells);
            })
            .finally(() => setSpellsLoaded(true));
    }, []);

    return (
        <div className={styles.spellbookContainer}>
            <SettingsModal
                isOpen={modalState === ModalState.SETTINGS}
                onClose={() => setModalState(ModalState.NONE)}
            />
            <MenuModal
                isOpen={modalState === ModalState.MENU}
                onClose={() => setModalState(ModalState.NONE)}
            />
            <BrowseModal
                isOpen={modalState === ModalState.BROWSE}
                onClose={() => setModalState(ModalState.NONE)}
            />
            <SpellbookToolbar
                onSearchQueryChange={handleSearchQueryChange}
                searchQuery={searchQuery}
                openSettings={() => setModalState(ModalState.SETTINGS)}
                openBrowse={() => setModalState(ModalState.BROWSE)}
            />
            {spellsLoaded ? (
                <Spellbook spells={filteredList} />
            ) : (
                <Message>Loading...</Message>
            )}
        </div>
    );
}

export { ModalState };
export default SpellbookContainer;
