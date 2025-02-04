import styles from "components/checkbox/Checkbox.module.css";

type Props = {
    isEnabled: boolean;
    onClick: () => void;
};

function Checkbox({ isEnabled, onClick }: Props) {
    return (
        <input
            className={styles.checkbox}
            type="checkbox"
            checked={isEnabled}
            onChange={onClick}
        ></input>
    );
}

export default Checkbox;
