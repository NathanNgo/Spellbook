import styles from "components/textInput/TextInput.module.css";
import React from "react";

type Props = {
    onTextChange: (textValue: string) => void;
    textValue: string;
    placeHolder: string;
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
};

function TextInput({
    onTextChange,
    textValue,
    placeHolder,
    leftIcon,
    rightIcon,
}: Props) {
    return (
        <div className={styles.textInput}>
            <div className={`symbol ${styles.leftIcon}`}>{leftIcon}</div>
            <input
                type="text"
                placeholder={placeHolder}
                onChange={(event) => onTextChange(event.target.value)}
                value={textValue}
            />
            <div className={`symbol ${styles.rightIcon}`}>{rightIcon}</div>
        </div>
    );
}

export default TextInput;
