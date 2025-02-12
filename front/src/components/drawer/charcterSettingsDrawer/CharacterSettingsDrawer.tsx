import Drawer, { DrawerSide } from "components/drawer/Drawer";
import Input from "components/input/Input";
import styles from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer.module.css";
import Dropdown from "components/dropdown/Dropdown";
import Checkbox from "components/checkbox/Checkbox";
import type { Character } from "types";
import { ClassName } from "common/character";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    character: Character;
    onCharacterChanged: (update: Partial<Character>) => void;
};

function CharacterSettingsDrawer({
    isOpen,
    onClose,
    character,
    onCharacterChanged,
}: Props) {
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
                        onCharacterChanged({ name: newName })
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
                            dropdownOptions={Object.values(ClassName).sort()}
                            currentOption={character.class}
                            onCurrentOptionChange={(newClass) =>
                                onCharacterChanged({ class: newClass })
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
                    <h3>Show Spell Save DC</h3>
                    <div className={styles.spellSaveDCInputContainer}>
                        <Checkbox
                            isEnabled={character.showSpellSaveDC}
                            onClick={() =>
                                onCharacterChanged({
                                    showSpellSaveDC: !character.showSpellSaveDC,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

export default CharacterSettingsDrawer;
