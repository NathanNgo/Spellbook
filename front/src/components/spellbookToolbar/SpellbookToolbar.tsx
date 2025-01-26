import styles from "components/spellbookToolbar/SpellbookToolbar.module.css";
import SearchBar from "components/searchBar/SearchBar";

type Props = {
    onSearchQueryChange: (query: string) => void;
    searchQuery: string;
    openSettings: () => void;
    openBrowse: () => void;
};

function SpellbookToolbar({
    onSearchQueryChange,
    searchQuery,
    openSettings,
    openBrowse,
}: Props) {
    return (
        <div className={styles.toolbar}>
            <span className={styles.searchBar}>
                <SearchBar
                    onQueryChange={onSearchQueryChange}
                    query={searchQuery}
                    placeHolder="Search current spellbook"
                />
            </span>
            <span className={styles.buttonsContainer}>
                <button className={styles.browseButton} onClick={openBrowse}>
                    <span className="symbol magicTwinkleIcon">
                        book_4_spark
                    </span>
                    <p>Browse & Manage Spells</p>
                </button>
                <button
                    className={styles.settingsButton}
                    onClick={openSettings}
                >
                    <span className="symbol">settings</span>
                    <p>Settings</p>
                </button>
            </span>
        </div>
    );
}

export default SpellbookToolbar;
