import styles from "components/spellbookToolbar/SpellbookToolbar.module.css";
import SearchBar from "components/searchBar/SearchBar";
import bookUrl from "assets/book_4_spark_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

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
            <span className={styles.searchBarContainer}>
                <SearchBar
                    onQueryChange={onSearchQueryChange}
                    query={searchQuery}
                    placeHolder="Search current spellbook"
                />
            </span>
            <span className={styles.buttonsContainer}>
                <button className={styles.browseButton} onClick={onOpenBrowse}>
                    <img src={bookUrl} className="symbol magicTwinkleIcon" />
                    <p>Browse & Manage Spells</p>
                </button>
                <button
                    className={styles.settingsButton}
                    onClick={onOpenSettings}
                >
                    <span className="symbol">settings</span>
                    <p>Manage Character</p>
                </button>
            </span>
        </div>
    );
}

export default SpellbookToolbar;
