import styles from "components/drawer/Drawer.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    side?: DrawerSide;
    width?: string;
};

enum DrawerSide {
    LEFT = "left",
    RIGHT = "right",
}

const sideStyle = {
    left: styles.left,
    right: styles.right,
};

function Drawer({
    isOpen,
    onClose,
    children,
    side = DrawerSide.RIGHT,
    width = "50%",
}: Props) {
    return (
        <div
            className={`${styles.drawerOverlay} ${isOpen ? styles.show : ""}`}
            onClick={onClose}
        >
            <div
                className={`${styles.drawer} ${
                    isOpen ? styles.open : styles.close
                } ${sideStyle[side]}`}
                style={{ width }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.drawerContentContainer}>{children}</div>
            </div>
        </div>
    );
}

export default Drawer;
export { DrawerSide };
