import Drawer, { DrawerSide } from "components/drawer/Drawer";
import Input from "components/input/Input";
import styles from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer.module.css";
import { useState } from "react";

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
    const [spellcastingModifier, setSpellcastingModifier] = useState<number>(0);

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side={DrawerSide.Left}
            width="35%"
        >
            <div className={styles.nameContainer}>
                <Input
                    placeHolder={"John Spellbook"}
                    onValueChange={onCharacterNameChanged}
                    value={characterName}
                />
            </div>
            <div className={styles.characterSection}>
                <h2>CHARACTER</h2>
                <div className={styles.characterContainer}>
                    <h3> Spellcasting Modifier </h3>
                    <div className={styles.spellcastingModifierContainer}>
                        <Input
                            placeHolder={"John Spellbook"}
                            onValueChange={setSpellcastingModifier}
                            value={String(spellcastingModifier)}
                            numberInput
                        />
                    </div>
                </div>
            </div>
            <div className={styles.spellbookSection}>
                <h2>SPELLBOOK</h2>
            </div>
        </Drawer>
    );
}

export default CharacterSettingsDrawer;
