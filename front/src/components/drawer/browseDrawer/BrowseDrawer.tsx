import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/browseDrawer/BrowserDrawer.module.css";
import SearchBar from "components/searchBar/SearchBar";
import ToggleButton from "components/toggleButton/ToggleButton";
import { useEffect, useRef, useState } from "react";
import SearchResultsTable from "components/searchResultsTable/SearchResultsTable";
import Message from "components/message/Message";
import type { SpellSummary, Character } from "types";
import { LEVEL_TITLES } from "common/spells";
import { getLevelOfSpellByClass } from "common/character";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    spellSummaries: SpellSummary[];
    spellSummariesLoaded: boolean;
    character: Character;
    spellIds: number[];
    onAddSpell: (spell: SpellSummary) => void;
    onRemoveSpell: (spell: SpellSummary) => void;
    onOpenPage: (spell: SpellSummary) => void;
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
const UNCATEGORISED_LEVEL = -1;

const MINIMUM_QUERY_LENGTH = 2;

const INPUT_FOCUS_DEBOUNCE_TIME_MS = 100;

function BrowseDrawer({
    isOpen,
    onClose,
    spellSummaries,
    spellSummariesLoaded,
    spellIds,
    character,
    onAddSpell,
    onRemoveSpell,
    onOpenPage,
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
            // before it is focusable, so we wait for that moment and
            // then focus on it.
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
                getLevelOfSpellByClass(spell, character.class) === levelIndex
        )
    );

    const uncategorisedList = filteredList.filter(
        (spell) => getLevelOfSpellByClass(spell, character.class) === null
    );

    const someToggleSelected = levelSelection.some((flag) => flag);

    const filteredListHasResults =
        filteredList.length !== 0 &&
        filteredListsByLevel.some(
            (spellList, index) =>
                (levelSelection[index] || !someToggleSelected) &&
                spellList.length > 0
        );

    const uncategorisedListHasResults =
        uncategorisedList.length !== 0 && !someToggleSelected;

    const resultsFound = uncategorisedListHasResults || filteredListHasResults;

    const noResultsMessage = spellSummariesLoaded ? (
        <Message>No Spells Found</Message>
    ) : (
        <Message>Loading spells...</Message>
    );

    const noResults = !resultsFound && query.length >= MINIMUM_QUERY_LENGTH;

    let searchResultOutcome = noResultsMessage;

    if (!noResults) {
        const searchResultTables = LEVEL_TITLES.map(
            (levelTitle, levelIndex) => {
                if (!levelSelection[levelIndex] && someToggleSelected) {
                    return;
                }
                return (
                    <SearchResultsTable
                        results={filteredListsByLevel[levelIndex]}
                        title={levelTitle}
                        spellIds={spellIds}
                        onAddSpell={onAddSpell}
                        onRemoveSpell={onRemoveSpell}
                        key={levelIndex}
                        onOpenPage={onOpenPage}
                    />
                );
            }
        );

        if (uncategorisedListHasResults) {
            searchResultTables.push(
                <SearchResultsTable
                    results={uncategorisedList}
                    title={"Uncategorised"}
                    spellIds={spellIds}
                    onAddSpell={onAddSpell}
                    onRemoveSpell={onRemoveSpell}
                    key={UNCATEGORISED_LEVEL}
                    onOpenPage={onOpenPage}
                />
            );
        }

        searchResultOutcome = <>{searchResultTables}</>;
    }

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
            <div className={styles.searchResults}>{searchResultOutcome}</div>
        </Drawer>
    );
}

export default BrowseDrawer;
