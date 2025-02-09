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

const MINUS_SIGN = "-";

function signOfNumber(value: number) {
    return 1 / value > 0 ? 1 : -1;
}

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

    function handleClickAway() {
        if (numberInput && value === 0) {
            (onValueChange as numberOnValueChange)(0);
        }
    }

    function formatValue() {
        if (value === 0 && signOfNumber(value) < 0) {
            return MINUS_SIGN;
        }
        return value.toString();
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;

        if (numberInput) {
            let parsedValue = newValue === "" ? 0 : Number(newValue);
            if (newValue === MINUS_SIGN) {
                parsedValue = -0;
            }
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
                type={"text"}
                placeholder={placeHolder}
                onChange={handleChange}
                value={formatValue()}
                onBlur={handleClickAway}
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
