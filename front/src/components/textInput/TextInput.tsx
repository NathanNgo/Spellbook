import styles from "components/textInput/TextInput.module.css";
import React from "react";

type Props = {
    onTextChange: (textValue: string) => void;
    textValue: string;
    placeHolder: string;
    leftIcon?: React.ReactElement;
    showClearButton?: boolean;
};

function TextInput({
    onTextChange,
    textValue,
    placeHolder,
    leftIcon,
    showClearButton = false,
}: Props) {
    function handleClearText() {
        onTextChange("");
    }

    return (
        <div className={styles.textInput}>
            <div className={`symbol ${styles.leftIcon}`}>{leftIcon}</div>
            <input
                type="text"
                placeholder={placeHolder}
                onChange={(event) => onTextChange(event.target.value)}
                value={textValue}
            />
            {showClearButton ? (
                <div
                    className={`symbol ${styles.clearButton}`}
                    onClick={handleClearText}
                >
                    close
                </div>
            ) : undefined}
        </div>
    );
}

export default TextInput;
