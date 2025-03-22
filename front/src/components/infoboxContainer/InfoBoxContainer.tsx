import styles from "components/infoboxContainer/InfoBoxContainer.module.css";

const FULL_SPAN = 6;
const HALF_SPAN = 3;
const THIRD_SPAN = 2;

// Eg. 10 boxes total ->  2 rows of 3 boxes each, then 2 rows of 2 boxes each
const TOTAL_HALF_WIDTHS_WHEN_ONE_OVER_THREE = 4;

// Eg. 11 boxes total -> 3 rows of 3 boxes each, then 1 row of 2 boxes each
const TOTAL_HALF_WIDTHS_WHEN_TWO_OVER_THREE = 2;
const TOTAL_HALF_WIDTHS_WHEN_ON_THREE = 0;

type Props = {
    infoBoxes: JSX.Element[];
    spans?: number[];
};

function InfoBoxContainer({ infoBoxes, spans = [] }: Props) {
    const spanClasses = [
        styles.span1,
        styles.span2,
        styles.span3,
        styles.span4,
        styles.span5,
        styles.span6,
    ];

    function itemStyle(span: number) {
        return span >= 1 && span <= 6 ? spanClasses[span - 1] : styles.span1;
    }

    let layout: number[] = [];

    let totalHalfWidthInfoBoxes = 0;

    if (spans.length === infoBoxes.length) {
        layout = spans;
    } else {
        if (infoBoxes.length === 1) {
            layout.push(FULL_SPAN);
        } else {
            if (infoBoxes.length % 3 === 1) {
                totalHalfWidthInfoBoxes = TOTAL_HALF_WIDTHS_WHEN_ONE_OVER_THREE;
            } else if (infoBoxes.length % 3 === 2) {
                totalHalfWidthInfoBoxes = TOTAL_HALF_WIDTHS_WHEN_TWO_OVER_THREE;
            } else {
                totalHalfWidthInfoBoxes = TOTAL_HALF_WIDTHS_WHEN_ON_THREE;
            }
            layout.push(
                ...Array(infoBoxes.length - totalHalfWidthInfoBoxes).fill(
                    THIRD_SPAN
                ),
                ...Array(totalHalfWidthInfoBoxes).fill(HALF_SPAN)
            );
        }
    }

    return (
        <div className={styles.infoContainer}>
            {infoBoxes.map((infoBox, index) => (
                <div key={index} className={itemStyle(layout[index])}>
                    {infoBox}
                </div>
            ))}
        </div>
    );
}

export default InfoBoxContainer;
