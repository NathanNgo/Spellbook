import { ManifestSpellDetails } from "components/drawer/browseDrawer/types";
import styles from "components/searchResultsTable/SearchResultsTable.module.css";

type Props = {
    results: ManifestSpellDetails[];
    title: string;
};

function SearchResultsTable({ results, title }: Props) {
    if (results.length === 0) {
        return;
    }
    return (
        <div className={styles.searchResultsTable}>
            <h2>{title.toUpperCase()}</h2>
            {results.map((spell) => (
                <div className={styles.searchResult}>
                    <div className={styles.spellName}>{spell.name}</div>
                    <button className={styles.spellButton}>+ Add Spell</button>
                </div>
            ))}
        </div>
    );
}

export default SearchResultsTable;
