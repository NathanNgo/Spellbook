import styles from "components/header/Header.module.css";

type Props = {
    characterName: string;
    toggleMenu: () => void;
};

function Header({ characterName, toggleMenu }: Props) {
    return (
        <div className={styles.stickyHeaderContainer}>
            <header className={styles.mainHeader}>
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <span className="symbol">menu</span>
                </button>
                <h1 className={styles.pageTitle}>Spellbook</h1>
                <h2 className={styles.characterName}>
                    {characterName.toUpperCase()}
                </h2>
                <button className={styles.characterButton}>
                    <span className="spellbookIcon">&#xe900;</span>
                    {/* <p>{characterName}</p> */}
                </button>
            </header>
        </div>
    );
}

export default Header;
