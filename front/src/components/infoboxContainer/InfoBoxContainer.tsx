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
    const length = infoBoxes.length;

    if (length === 1) {
        layout.push(6);
    } else if (length % 3 === 1) {
        for (let i = 0; i < length - 4; i += 3) layout.push(2, 2, 2);
        layout.push(3, 3, 3, 3);
    } else if (length % 3 === 2) {
        for (let i = 0; i < length - 2; i += 3) layout.push(2, 2, 2);
        layout.push(3, 3);
    } else {
        for (let i = 0; i < length; i += 3) layout.push(2, 2, 2);
    }

    if (spans.length === infoBoxes.length) {
        layout = spans;
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
