import styles from "components/spellbookToolbar/SpellbookToolbar.module.css";
import SearchBar from "components/searchBar/SearchBar";

type Props = {
    onSearchQueryChange: (query: string) => void;
    searchQuery: string;
    onOpenSettings: () => void;
    onOpenBrowse: () => void;
};

function SpellbookToolbar({
    onSearchQueryChange,
    searchQuery,
    onOpenSettings,
    onOpenBrowse,
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
                <button className={styles.browseButton} onClick={onOpenBrowse}>
                    <span className="symbol magicTwinkleIcon">
                        book_4_spark
                    </span>
                    <p>Browse & Manage Spells</p>
                </button>
                <button
                    className={styles.settingsButton}
                    onClick={onOpenSettings}
                >
                    <span className="symbol">settings</span>
                    <p>Settings</p>
                </button>
            </span>
        </div>
    );
}

export default SpellbookToolbar;
