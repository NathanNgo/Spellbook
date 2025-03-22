import styles from "components/searchResultsTable/SearchResultsTable.module.css";
import type { SpellSummary } from "types";
import SearchResult from "components/searchResult/SearchResult";

type Props = {
    results: SpellSummary[];
    title: string;
    spellIds: number[];
    onAddSpell: (spell: SpellSummary) => void;
    onRemoveSpell: (spell: SpellSummary) => void;
    onOpenPage: (spell: SpellSummary) => void;
};

function SearchResultsTable({
    results,
    title,
    spellIds,
    onAddSpell,
    onRemoveSpell,
    onOpenPage,
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
                    spellIds={spellIds}
                    onAddSpell={() => onAddSpell(spell)}
                    onRemoveSpell={() => onRemoveSpell(spell)}
                    onOpenPage={() => onOpenPage(spell)}
                    key={index}
                />
            ))}
        </div>
    );
}

export default SearchResultsTable;
