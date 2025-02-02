import styles from "components/searchResultsTable/SearchResultsTable.module.css";
import type { ManifestSpellDetail } from "schemas";
import StatusButton, { Status } from "components/statusButton/StatusButton";

type Props = {
    results: ManifestSpellDetail[];
    title: string;
    spellbookIdSet: Set<number>;
    handleAddSpell: (id: number) => void;
    handleRemoveSpell: (id: number) => void;
};

function SearchResultsTable({
    results,
    title,
    spellbookIdSet,
    handleAddSpell,
    handleRemoveSpell,
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
                            {spellbookIdSet.has(spell.id) ? "book_4_spark" : ""}
                        </span>
                        <p>{spell.name}</p>
                    </div>
                    <div className={styles.addButtonContainer}>
                        <StatusButton
                            status={
                                !spellbookIdSet.has(spell.id)
                                    ? Status.First
                                    : Status.Second
                            }
                            handleChangeToSecond={() =>
                                handleAddSpell(spell.id)
                            }
                            handleChangeToFirst={() =>
                                handleRemoveSpell(spell.id)
                            }
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
