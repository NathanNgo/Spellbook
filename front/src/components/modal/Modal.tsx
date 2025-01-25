import styles from "components/modal/Modal.module.css";
// IGNORE FOR NOW, ILL COME BACK TO IT
type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    side?: "left" | "right";
    width?: string;
};

const sideStyle = {
    right: styles.right,
    left: styles.left,
};

function Modal({
    isOpen,
    onClose,
    children,
    side = "right",
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
                <button onClick={onClose}>X</button>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
