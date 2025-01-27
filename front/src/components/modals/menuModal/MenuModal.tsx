import Modal, { ModalSide } from "components/modal/Modal";
import styles from "components/modals/menuModal/MenuModal.module.css";
import { useEffect, useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

enum Theme {
    Light = "light",
    Dark = "dark",
}

function MenuModal({ isOpen, onClose }: Props) {
    const [theme, setTheme] = useState<Theme>(Theme.Light);

    useEffect(() => {
        const rootNote = document.documentElement;
        rootNote.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            side={ModalSide.LEFT}
            width="35%"
        >
            <div className={styles.modalContent}>
                <h2>THEME</h2>
                <div className={styles.themeContainer}>
                    <button
                        onClick={() => setTheme(Theme.Light)}
                        disabled={theme === Theme.Light}
                    >
                        Laurelin
                    </button>
                    <button
                        onClick={() => setTheme(Theme.Dark)}
                        disabled={theme === Theme.Dark}
                    >
                        Telperion
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default MenuModal;
export { Theme };
