import Drawer, { DrawerSide } from "components/drawer/Drawer";
import Input from "components/input/Input";
import styles from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer.module.css";
import { useState } from "react";
import Dropdown from "components/dropdown/Dropdown";
import Checkbox from "components/checkbox/Checkbox";
import type { Character } from "App";

const CHARACTER_OPTIONS = ["Sorcerer", "Wizard", "Cleric", "Druid"];

type Props = {
    isOpen: boolean;
    onClose: () => void;
    character: Character;
    onCharacterChanged: (characterName: Character) => void;
};

function CharacterSettingsDrawer({
    isOpen,
    onClose,
    character,
    onCharacterChanged,
}: Props) {
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
                    onValueChange={(newName: string) =>
                        onCharacterChanged({ ...character, name: newName })
                    }
                    value={character.name}
                />
            </div>
            <div className={styles.characterSection}>
                <h2>CHARACTER</h2>
                <div className={styles.subheadingContainer}>
                    <h3>Class</h3>
                    <div className={styles.classInputContainer}>
                        <Dropdown
                            dropdownOptions={CHARACTER_OPTIONS}
                            currentOption={character.class}
                            onCurrentOptionChange={(newClass) =>
                                onCharacterChanged({
                                    ...character,
                                    class: newClass,
                                })
                            }
                        />
                    </div>
                </div>
                <div className={styles.subheadingContainer}>
                    <h3>Spellcasting Modifier</h3>
                    <div className={styles.spellcastingModifierInputContainer}>
                        <Input
                            placeHolder={"John Spellbook"}
                            value={character.spellCastingModifier}
                            onValueChange={(newSpellCastingModifer: number) =>
                                onCharacterChanged({
                                    ...character,
                                    spellCastingModifier:
                                        newSpellCastingModifer,
                                })
                            }
                            numberInput
                        />
                    </div>
                </div>
            </div>
            <div className={styles.spellbookSection}>
                <h2>SPELLBOOK</h2>
                <div className={styles.subheadingContainer}>
                    <h3>Show Spell Save DC's</h3>
                    <div className={styles.spellcastingModifierInputContainer}>
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
