import Drawer, { DrawerSide } from "components/drawer/Drawer";
import Input from "components/input/Input";
import styles from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer.module.css";
import { useState } from "react";
import Dropdown from "components/dropdown/Dropdown";
import Checkbox from "components/checkbox/Checkbox";

const CHARACTER_OPTIONS = [
    "Wizard",
    "Cleric",
    "Druid",
    "Sorcerer",
    "Arcanist",
    "Summoner",
];

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
    const [characterClass, setCharacterClass] = useState<string>(
        CHARACTER_OPTIONS[0]
    );
    const [showSpellSaveDC, setShowSpellSaveDC] = useState<boolean>(false);

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
                <div className={styles.subheadingContainer}>
                    <h3>Class</h3>
                    <div className={styles.classInputContainer}>
                        <Dropdown
                            dropdownOptions={CHARACTER_OPTIONS}
                            currentOption={characterClass}
                            onCurrentOptionChange={(option) =>
                                setCharacterClass(option)
                            }
                        />
                    </div>
                </div>
                <div className={styles.subheadingContainer}>
                    <h3>Spellcasting Modifier</h3>
                    <div className={styles.spellcastingModifierInputContainer}>
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
                <div className={styles.subheadingContainer}>
                    <h3>Show Spell Save DC</h3>
                    <div className={styles.spellSaveDCInputContainer}>
                        <Checkbox
                            isEnabled={showSpellSaveDC}
                            onClick={() =>
                                setShowSpellSaveDC((prevValue) => !prevValue)
                            }
                        />
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

export default CharacterSettingsDrawer;
