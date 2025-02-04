import { useState } from "react";
import styles from "components/dropdown/Dropdown.module.css";

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
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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
        setDropdownOpen(false);
    }

    return (
        <>
            <div className={styles.clickAway}></div>
            <div className={styles.dropdownContainer}>
                <div
                    className={styles.dropdownHeader}
                    onClick={() => setDropdownOpen((prevValue) => !prevValue)}
                >
                    {currentOption}
                </div>
                {dropdownOpen && dropdownMenu}
            </div>
        </>
    );
}

export default Dropdown;
