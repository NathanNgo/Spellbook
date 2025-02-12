import styles from "components/dropdown/Dropdown.module.css";
import useActiveStateWithClickAway from "hooks/useActiveStateWithClickAway";

type Props = {
    dropdownOptions: string[];
    currentOption: string;
    onCurrentOptionChange: (option: string) => void;
};

function Dropdown({
    dropdownOptions,
    currentOption,
    onCurrentOptionChange,
}: Props) {
    const { isActive, setIsActive, handleToggleActive, areaRef } =
        useActiveStateWithClickAway();

    const options = dropdownOptions.map((option) => {
        return (
            <div
                title={option}
                className={styles.dropdownOption}
                onClick={handleOptionClick}
                key={option}
            >
                {option}
            </div>
        );
    });
    const dropdownMenu = <div className={styles.dropdownMenu}>{options}</div>;

    function handleOptionClick(event: React.MouseEvent<HTMLDivElement>) {
        onCurrentOptionChange(event.currentTarget.title);
        setIsActive(false);
    }

    return (
        <div className={styles.dropdownContainer} ref={areaRef}>
            <div
                className={`${styles.dropdownHeader} ${
                    isActive && styles.dropdownHeaderSelected
                }`}
                onClick={() => handleToggleActive()}
            >
                <span className={`symbol ${styles.dropdownIcon}`}>
                    keyboard_arrow_down
                </span>
                <p>{currentOption}</p>
            </div>
            {isActive && dropdownMenu}
        </div>
    );
}

export default Dropdown;
