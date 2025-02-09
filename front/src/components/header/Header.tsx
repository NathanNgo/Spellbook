import styles from "components/header/Header.module.css";

type Props = {
    characterName: string;
    onToggleMenu: () => void;
    onToggleSettings: () => void;
};

function Header({ characterName, onToggleMenu }: Props) {
    return (
        <div className={styles.stickyHeaderContainer}>
            <header className={styles.mainHeader}>
                <button className={styles.menuButton} onClick={onToggleMenu}>
                    <span className="symbol">menu</span>
                </button>
                <h1 className={styles.pageTitle}>Spellbook</h1>
                <div className={styles.rightDivider}></div>
                <h2 className={styles.characterName}>
                    {characterName.toUpperCase()}
                </h2>
                {/* <button
                    className={styles.characterButton}
                    onClick={onToggleSettings}
                >
                    <span className="spellbookIcon">&#xe900;</span>
                </button> */}
            </header>
        </div>
    );
}

export default Header;
