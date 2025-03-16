import type { SpellSummary } from "types";
import StatusButton, { Status } from "components/statusButton/StatusButton";
import styles from "components/searchResult/SearchResult.module.css";

type Props = {
    spell: SpellSummary;
    spellbookIds: number[];
    onAddSpell: () => void;
    onRemoveSpell: () => void;
    onOpenPage: () => void;
};

function SearchResult({
    spell,
    spellbookIds,
    onAddSpell,
    onRemoveSpell,
    onOpenPage,
}: Props) {
    return (
        <div className={styles.searchResult}>
            <div className={styles.spellName} onClick={onOpenPage}>
                <span className="symbol">
                    {spellbookIds.includes(spell.id) && "book_4_spark"}
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
                    onChangeToSecond={onAddSpell}
                    onChangeToFirst={onRemoveSpell}
                    firstText="+ Add"
                    secondText="- Remove"
                    transitionFromFirstText="Added"
                    transitionFromSecondText="Removed"
                />
            </div>
        </div>
    );
}

export default SearchResult;
