import styles from "components/infobox/InfoBox.module.css";

type Props = {
    title: string | JSX.Element;
    info: string | JSX.Element;
    flex?: string;
};

function InfoBox({ title, info, flex = "auto" }: Props) {
    return (
        <div className={styles.infoboxContainer} style={{ flex }}>
            <div className={styles.titleContainer}>{title}</div>
            <div className={styles.infoContainer}>{info}</div>
        </div>
    );
}

export default InfoBox;
