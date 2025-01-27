import styles from "components/drawer/Drawer.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    side?: DrawerSide;
    width?: string;
};

enum DrawerSide {
    Left,
    Right,
}

const sideStyle = {
    [DrawerSide.Left]: styles.left,
    [DrawerSide.Right]: styles.right,
};

function Drawer({
    isOpen,
    onClose,
    children,
    side = DrawerSide.Right,
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
            >
                <div className={styles.drawerContentContainer}>{children}</div>
            </div>
        </div>
    );
}

export default Drawer;
export { DrawerSide };
