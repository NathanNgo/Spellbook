import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/menuDrawer/MenuDrawer.module.css";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";
import { useEffect } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

enum Theme {
    Light = "light",
    Dark = "dark",
}

const THEME_KEY = "theme";

function MenuDrawer({ isOpen, onClose }: Props) {
    const [theme, setTheme] = useStateWithLocalStorage<Theme>(
        THEME_KEY,
        Theme.Light
    );

    useEffect(() => {
        const rootNote = document.documentElement;
        rootNote.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side={DrawerSide.Left}
            width="35%"
        >
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
        </Drawer>
    );
}

export default MenuDrawer;
export { Theme };
