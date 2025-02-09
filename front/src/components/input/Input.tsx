import styles from "components/input/Input.module.css";
import React from "react";

type stringOnValueChange = (value: string) => void;
type numberOnValueChange = (value: number) => void;

type Props = {
    onValueChange: stringOnValueChange | numberOnValueChange;
    value: string | number;
    placeHolder: string;
    leftIcon?: React.ReactElement;
    showClearButton?: boolean;
    numberInput?: boolean;
};

function Input({
    onValueChange,
    value,
    placeHolder,
    leftIcon,
    showClearButton = false,
    numberInput = false,
}: Props) {
    function handleClearText() {
        if (typeof value === "number") {
            (onValueChange as numberOnValueChange)(0);
        } else {
            (onValueChange as stringOnValueChange)("");
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;

        if (numberInput) {
            const parsedValue = newValue === "" ? 0 : Number(newValue);
            if (!isNaN(parsedValue)) {
                (onValueChange as numberOnValueChange)(parsedValue);
            }
        } else {
            (onValueChange as stringOnValueChange)(newValue);
        }
    }

    return (
        <div className={styles.input}>
            <div className={`symbol ${styles.leftIcon}`}>{leftIcon}</div>
            <input
                type={numberInput ? "number" : "text"}
                placeholder={placeHolder}
                onChange={handleChange}
                value={value}
            />
            {showClearButton && (
                <div
                    className={`symbol ${styles.clearButton}`}
                    onClick={handleClearText}
                >
                    close
                </div>
            )}
        </div>
    );
}

export default Input;
