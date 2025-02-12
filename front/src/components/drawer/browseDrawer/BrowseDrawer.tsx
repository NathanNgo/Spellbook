import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/browseDrawer/BrowserDrawer.module.css";
import SearchBar from "components/searchBar/SearchBar";
import ToggleButton from "components/toggleButton/ToggleButton";
import { useEffect, useRef, useState } from "react";
import SearchResultsTable from "components/searchResultsTable/SearchResultsTable";
import Message from "components/message/Message";
import type { SpellSummary, Character } from "types";
import { LEVEL_TITLES } from "common/spells";
import { classNameToClassCode } from "common/character";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    spellSummaries: SpellSummary[];
    character: Character;
    spellbookIds: number[];
    onAddSpell: (spell: SpellSummary) => void;
    onRemoveSpell: (spell: SpellSummary) => void;
};

const TOGGLE_BUTTON_LEVEL_LABELS = [
    "Cantrip",
    "1ST",
    "2ND",
    "3RD",
    "4TH",
    "5TH",
    "6TH",
    "7TH",
    "8TH",
    "9TH",
];

const MINIMUM_QUERY_LENGTH = 2;

const INPUT_FOCUS_DEBOUNCE_TIME_MS = 100;

function BrowseDrawer({
    isOpen,
    onClose,
    spellSummaries,
    spellbookIds,
    character,
    onAddSpell,
    onRemoveSpell,
}: Props) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [levelSelection, setLevelSelection] = useState<boolean[]>(
        TOGGLE_BUTTON_LEVEL_LABELS.map(() => false)
    );

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Calling `.focus()` on the input element straight away
            // won't focus it for some reason, there's some loading time
            // before it is focusable.
            setTimeout(() => {
                inputRef.current?.focus();
            }, INPUT_FOCUS_DEBOUNCE_TIME_MS);
        }
    }, [isOpen]);

    function handleLevelSelect(toggleIndex: number) {
        setLevelSelection((prevLevelSelection) =>
            prevLevelSelection.map((isOn, index) =>
                index === toggleIndex ? !isOn : isOn
            )
        );
    }

    let filteredList: SpellSummary[] = [];
    const query = searchQuery.trim().toLowerCase();

    if (query !== "" && query.length >= MINIMUM_QUERY_LENGTH) {
        filteredList = spellSummaries.filter((spell) =>
            spell.name.toLowerCase().includes(query)
        );
    }

    const filteredListsByLevel = LEVEL_TITLES.map((_, levelIndex) =>
        // Need to generalise to level for any class based on character info
        filteredList.filter(
            (spell) =>
                spell[classNameToClassCode(character.class)] === levelIndex
        )
    );

    const someToggleSelected = levelSelection.some((flag) => flag);

    const resultsFound =
        filteredList.length !== 0 &&
        filteredListsByLevel.some(
            (spellList, index) =>
                (levelSelection[index] || !someToggleSelected) &&
                spellList.length > 0
        );

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side={DrawerSide.Right}
            width="60%"
        >
            <div className={styles.searchContainer}>
                <SearchBar
                    onQueryChange={setSearchQuery}
                    query={searchQuery}
                    placeHolder={"Search spells"}
                    inputRef={inputRef}
                />
            </div>
            <div className={styles.levelButtonsContainer}>
                {TOGGLE_BUTTON_LEVEL_LABELS.map((label, index) => (
                    <ToggleButton
                        key={index}
                        isOn={levelSelection[index]}
                        onToggle={() => handleLevelSelect(index)}
                    >
                        <p>{label}</p>
                    </ToggleButton>
                ))}
            </div>
            <div className={styles.searchResults}>
                {!resultsFound && query.length >= MINIMUM_QUERY_LENGTH ? (
                    <Message>No spells found</Message>
                ) : (
                    LEVEL_TITLES.map((levelTitle, levelIndex) => {
                        if (levelSelection[levelIndex] || !someToggleSelected) {
                            return (
                                <SearchResultsTable
                                    results={filteredListsByLevel[levelIndex]}
                                    title={levelTitle}
                                    spellbookIds={spellbookIds}
                                    onAddSpell={onAddSpell}
                                    onRemoveSpell={onRemoveSpell}
                                    key={levelIndex}
                                />
                            );
                        }
                    })
                )}
            </div>
        </Drawer>
    );
}

export default BrowseDrawer;
