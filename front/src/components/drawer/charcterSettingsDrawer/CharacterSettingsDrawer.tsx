import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    characterName: string;
    onCharacterNameChanged: (characterName: string) => void;
};

function CharacterSettingsDrawer({
    isOpen,
    onClose,
    characterName,
    onCharacterNameChanged,
}: Props) {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side={DrawerSide.Left}
            width="35%"
        >
            <h2>CHARACTER</h2>
            <input
                className={styles.nameInput}
                type="text"
                placeholder={"John Spellbook"}
                onChange={(event) => onCharacterNameChanged(event.target.value)}
                value={characterName}
            />
        </Drawer>
    );
}

export default CharacterSettingsDrawer;
