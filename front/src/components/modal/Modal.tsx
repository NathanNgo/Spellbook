import styles from "components/modal/Modal.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    side?: ModalSide;
    width?: string;
};

enum ModalSide {
    LEFT = "left",
    RIGHT = "right",
}

const sideStyle = {
    left: styles.left,
    right: styles.right,
};

function Modal({
    isOpen,
    onClose,
    children,
    side = ModalSide.RIGHT,
    width = "50%",
}: Props) {
    return (
        <div
            className={`${styles.modalOverlay} ${isOpen ? styles.show : ""}`}
            onClick={onClose}
        >
            <div
                className={`${styles.modal} ${
                    isOpen ? styles.open : styles.close
                } ${sideStyle[side]}`}
                style={{ width }}
                onClick={(e) => e.stopPropagation()}
            >
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
export { ModalSide };
