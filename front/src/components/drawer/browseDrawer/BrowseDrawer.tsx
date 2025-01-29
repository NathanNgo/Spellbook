import Drawer, { DrawerSide } from "components/drawer/Drawer";
import drawerStyles from "components/drawer/Drawer.module.css";
import styles from "components/drawer/browseDrawer/BrowserDrawer.module.css";
import SearchBar from "components/searchBar/SearchBar";
import { LEVEL_TITLES } from "components/spellbook/Spellbook";
import ToggleButton from "components/toggleButton/ToggleButton";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const LEVEL_LABELS = [
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

const levelSelection = LEVEL_LABELS.map(() => false);

function BrowseDrawer({ isOpen, onClose }: Props) {
    const [query, setQuery] = useState<string>("");

    const [levelSelection, setLevelSelection] = useState<boolean[]>(
        LEVEL_LABELS.map(() => false)
    );

    function handleLevelSelect(toggleIndex: number) {
        setLevelSelection((prevLevelSelection) =>
            prevLevelSelection.map((isOn, index) =>
                index === toggleIndex ? !isOn : isOn
            )
        );
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side={DrawerSide.Right}
            width="60%"
        >
            <div className={drawerStyles.drawerContent}>
                <div className={styles.searchContainer}>
                    <SearchBar
                        onQueryChange={setQuery}
                        query={query}
                        placeHolder={"Search spells"}
                    />
                </div>
                <div className={styles.levelButtonsContainer}>
                    {LEVEL_LABELS.map((label, index) => (
                        <ToggleButton
                            key={index}
                            isOn={levelSelection[index]}
                            onToggle={() => handleLevelSelect(index)}
                        >
                            <p>{label}</p>
                        </ToggleButton>
                    ))}
                </div>
            </div>
        </Drawer>
    );
}

export default BrowseDrawer;
