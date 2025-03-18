import styles from "components/infoboxContainer/InfoBoxContainer.module.css";

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

    const FULL_SPAN = 6;
    const HALF_SPAN = 3;
    const THIRD_SPAN = 2;

    if (spans.length === infoBoxes.length) {
        layout = spans;
    } else {
        if (infoBoxes.length === 1) {
            layout.push(FULL_SPAN);
        } else if (infoBoxes.length % 3 === 1) {
            layout.push(
                ...Array(infoBoxes.length - 4).fill(THIRD_SPAN),
                ...Array(4).fill(HALF_SPAN)
            );
        } else if (infoBoxes.length % 3 === 2) {
            layout.push(
                ...Array(infoBoxes.length - 2).fill(THIRD_SPAN),
                ...Array(2).fill(HALF_SPAN)
            );
        } else {
            layout.push(...Array(infoBoxes.length).fill(THIRD_SPAN));
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
