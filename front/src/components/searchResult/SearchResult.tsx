import type { SpellSummary } from "types";
import StatusButton, { Status } from "components/statusButton/StatusButton";
import styles from "components/searchResult/SearchResult.module.css";

type Props = {
    spell: SpellSummary;
    spellIds: number[];
    onAddSpell: () => void;
    onRemoveSpell: () => void;
};

function SearchResult({ spell, spellIds, onAddSpell, onRemoveSpell }: Props) {
    return (
        <div className={styles.searchResult}>
            <div className={styles.spellName}>
                <span className="symbol">
                    {spellIds.includes(spell.id) && "book_4_spark"}
                </span>
                <p>{spell.name}</p>
            </div>
            <div className={styles.addButtonContainer}>
                <StatusButton
                    status={
                        !spellIds.includes(spell.id)
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
