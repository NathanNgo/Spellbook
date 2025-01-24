import styles from "components/modal/Modal.module.css";
// IGNORE FOR NOW, ILL COME BACK TO IT
type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: Props) {
    return (
        <div
            className={`${styles.modalOverlay} ${isOpen ? styles.show : ""}`}
            onClick={onClose}
        >
            <div
                className={`${styles.modal} ${
                    isOpen ? styles.open : styles.close
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose}>X</button>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
