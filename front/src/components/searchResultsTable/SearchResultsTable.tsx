import styles from "components/searchResultsTable/SearchResultsTable.module.css";
import type { ManifestSpellDetail } from "schemas";
import StatusButton, { Status } from "components/statusButton/StatusButton";

type Props = {
    results: ManifestSpellDetail[];
    title: string;
    spellbookIds: number[];
    onAddSpell: (id: number) => void;
    onRemoveSpell: (id: number) => void;
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
                <div className={styles.searchResult} key={index}>
                    <div className={styles.spellName}>
                        <span className="symbol">
                            {spellbookIds.includes(spell.id)
                                ? "book_4_spark"
                                : ""}
                        </span>
                        <p>{spell.name}</p>
                    </div>
                    <div className={styles.addButtonContainer}>
                        <StatusButton
                            status={
                                !spellbookIds.includes(spell.id)
                                    ? Status.First
                                    : Status.Second
                            }
                            onChangeToSecond={() => onAddSpell(spell.id)}
                            onChangeToFirst={() => onRemoveSpell(spell.id)}
                            firstText="+ Add"
                            secondText="- Remove"
                            transitionFromFirstText="Added"
                            transitionFromSecondText="Removed"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchResultsTable;
