import styles from "components/drawer/pageDrawer/InfoBox.module.css";

type Props = {
    title: string;
    info: string;
};

function InfoBox({ title, info }: Props) {
    return (
        <div className={styles.infoboxContainer}>
            <div className={styles.titleContainer}>{title}</div>
            <div className={styles.infoContainer}>{info}</div>
        </div>
    );
}

export default InfoBox;
