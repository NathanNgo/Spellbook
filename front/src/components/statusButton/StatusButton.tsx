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
    const [transitioningStatus, setTransitioningStatus] =
        useState<Status | null>(null);

    const endStatusText = status === Status.First ? firstText : secondText;
    const transitionText =
        transitioningStatus === Status.First
            ? transitionFromFirstText
            : transitionFromSecondText;
    const displayText =
        transitioningStatus !== null ? transitionText : endStatusText;

    const transitionStyle =
        transitioningStatus === Status.First
            ? styles.fromFirstStyle
            : styles.fromSecondStyle;

    const className = `${styles.statusButton} ${
        transitioningStatus !== null ? transitionStyle : ""
    }`;

    function handleClick() {
        setTransitioningStatus(status);
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
            setTransitioningStatus(null);
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
