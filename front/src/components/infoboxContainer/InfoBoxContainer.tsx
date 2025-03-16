import styles from "components/infoboxContainer/InfoBoxContainer.module.css";

type Props = {
    infoBoxes: JSX.Element[];
};

function InfoBoxContainer({ infoBoxes }: Props) {
    function itemStyle(span: number) {
        return span === 3 ? styles.threeSpan : styles.twoSpan;
    }

    const layout: number[] = [];
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
