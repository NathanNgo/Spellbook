import styles from "components/spellbookToolbar/SpellbookToolbar.module.css";
import SearchBar from "components/searchBar/SearchBar";

type Props = {
    handleSearch: (query: string) => void;
};

function SpellbookToolbar({ handleSearch }: Props) {
    return (
        <div className={styles.toolbar}>
            <span className={styles.searchBar}>
                <SearchBar handleSearch={handleSearch} />
            </span>
            <button className={styles.browseButton}>
                <span className="symbol magicTwinkleIcon">book_4_spark</span>
                Browse & Manage Spells
            </button>
            <button className={styles.settingsButton}>
                <span className="symbol">settings</span>
                Settings
            </button>
        </div>
    );
}

export default SpellbookToolbar;
