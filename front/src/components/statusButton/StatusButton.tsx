import { useState } from "react";
import styles from "components/statusButton/StatusButton.module.css";

enum Status {
    First,
    Second,
}

type Props = {
    status: Status;
    onChangeToSecond: () => void;
    onChangeToFirst: () => void;
    firstText?: string;
    secondText?: string;
    transitionFromFirstText?: string;
    transitionFromSecondText?: string;
    delayFromFirstTimeMs?: number;
    delayFromSecondTimeMs?: number;
};

function StatusButton({
    status,
    onChangeToFirst,
    onChangeToSecond,
    firstText = "First State",
    secondText = "Second State",
    transitionFromFirstText = "First -> Second",
    transitionFromSecondText = "Second -> First",
    delayFromFirstTimeMs = 1000,
    delayFromSecondTimeMs = 1000,
}: Props) {
    const [transitioning, setTransitioning] = useState<boolean>(false);
    const [displayedStatus, setDisplayedStatus] = useState<Status>(status);

    const endStatusText =
        displayedStatus === Status.First ? firstText : secondText;
    const transitionText =
        displayedStatus === Status.First
            ? transitionFromFirstText
            : transitionFromSecondText;
    const displayText = transitioning ? transitionText : endStatusText;

    const transitionStyle =
        displayedStatus === Status.First
            ? styles.fromFirstStyle
            : styles.fromSecondStyle;

    const className = `${styles.statusButton} ${
        transitioning ? transitionStyle : ""
    }`;

    function handleClick() {
        setTransitioning(true);
        const nextStatus =
            status === Status.First ? Status.Second : Status.First;
        const delayTime =
            status === Status.First
                ? delayFromFirstTimeMs
                : delayFromSecondTimeMs;
        if (status === Status.First) {
            onChangeToSecond();
        } else {
            onChangeToFirst();
        }
        setTimeout(() => {
            setTransitioning(false);
            setDisplayedStatus(nextStatus);
        }, delayTime);
    }

    return (
        <button onClick={handleClick} className={className}>
            {displayText}
        </button>
    );
}

export default StatusButton;
export { Status };
