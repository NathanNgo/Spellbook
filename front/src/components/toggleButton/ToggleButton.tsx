import React from "react";
import styles from "components/toggleButton/ToggleButton.module.css";

type Props = {
    isOn: boolean;
    onToggle: () => void;
    children: React.ReactNode;
};
function ToggleButton({ isOn, onToggle, children }: Props) {
    return (
        <button
            onClick={onToggle}
            className={isOn ? styles.toggleOn : styles.toggleOff}
        >
            {children}
        </button>
    );
}

export default ToggleButton;
