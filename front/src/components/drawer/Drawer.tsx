import styles from "components/drawer/Drawer.module.css";
import React, { forwardRef } from "react";

export type DrawerRef = {
    scrollToTop: () => void;
};

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

function Drawer(
    {
        isOpen,
        onClose,
        children,
        side = DrawerSide.Right,
        width = "50%",
    }: Props,
    drawerRef: React.Ref<HTMLDivElement>
) {
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
                ref={drawerRef}
            >
                <div className={styles.drawerContentContainer}>{children}</div>
            </div>
        </div>
    );
}

export default forwardRef(Drawer);
export { DrawerSide };
