import styles from "components/dropdown/Dropdown.module.css";
import useOpenStateWithClickAway from "hooks/useClickAway";

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
    const { isOpen, setIsOpen, handleToggleOpen, areaRef } =
        useOpenStateWithClickAway();

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
        setIsOpen(false);
    }

    return (
        <div className={styles.dropdownContainer} ref={areaRef}>
            <div
                className={`${styles.dropdownHeader} ${
                    isOpen && styles.dropdownHeaderSelected
                }`}
                onClick={() => handleToggleOpen()}
            >
                {currentOption}
            </div>
            {isOpen && dropdownMenu}
        </div>
    );
}

export default Dropdown;
