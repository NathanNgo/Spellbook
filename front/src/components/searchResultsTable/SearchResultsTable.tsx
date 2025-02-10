import styles from "components/searchResultsTable/SearchResultsTable.module.css";
import type { SpellSummary } from "types";
import SearchResult from "components/SearchResult/SearchResult";

type Props = {
    results: SpellSummary[];
    title: string;
    spellbookIds: number[];
    onAddSpell: (spell: SpellSummary) => void;
    onRemoveSpell: (spell: SpellSummary) => void;
};

function SearchResultsTable({
    results,
    title,
    spellbookIds,
    onAddSpell,
    onRemoveSpell,
}: Props) {
    if (results.length === 0) {
        return;
    }
    return (
        <div className={styles.searchResultsTable}>
            <h2>{title.toUpperCase()}</h2>
            {results.map((spell, index) => (
                <SearchResult
                    spell={spell}
                    spellbookIds={spellbookIds}
                    onAddSpell={() => onAddSpell(spell)}
                    onRemoveSpell={() => onRemoveSpell(spell)}
                    key={index}
                />
            ))}
        </div>
    );
}

export default SearchResultsTable;
