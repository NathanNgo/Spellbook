import styles from "components/spellbookToolbar/SpellbookToolbar.module.css";
import SearchBar from "components/searchBar/SearchBar";

type Props = {
    onSearchQueryChange: (query: string) => void;
    searchQuery: string;
};

function SpellbookToolbar({ onSearchQueryChange, searchQuery }: Props) {
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
                <button className={styles.browseButton}>
                    <span className="symbol magicTwinkleIcon">
                        book_4_spark
                    </span>
                    Browse & Manage Spells
                </button>
                <button className={styles.settingsButton}>
                    <span className="symbol">settings</span>
                    Settings
                </button>
            </span>
        </div>
    );
}

export default SpellbookToolbar;
