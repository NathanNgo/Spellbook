import styles from "./header.module.css";

type Props = {
    characterName: string;
};

const Header = ({ characterName }: Props) => {
    return (
        <div className={styles.stickyHeaderContainer}>
            <header className={styles.mainHeader}>
                <button className={styles.menuButton}>
                    <i className="fa fa-bars"></i>
                </button>
                <h1 className={styles.pageTitle}>Spellbook</h1>
                <h2 className={styles.characterName}>
                    {characterName.toUpperCase()}
                </h2>
            </header>
        </div>
    );
};

export default Header;
