import Drawer, { DrawerSide } from "components/drawer/Drawer";
import Input from "components/input/Input";
import styles from "components/drawer/charcterSettingsDrawer/CharacterSettingsDrawer.module.css";
import Dropdown from "components/dropdown/Dropdown";
import Checkbox from "components/checkbox/Checkbox";
import type { Character, UpdateSetter } from "types";

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
    character: Character;
    onCharacterChanged: UpdateSetter<Character>;
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
                        onCharacterChanged((previousCharacter: Character) => {
                            return { ...previousCharacter, name: newName };
                        })
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
                                onCharacterChanged(
                                    (previousCharacter: Character) => ({
                                        ...previousCharacter,
                                        class: newClass,
                                    })
                                )
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
                                onCharacterChanged(
                                    (previousCharacter: Character) => ({
                                        ...previousCharacter,
                                        spellCastingModifier:
                                            newSpellCastingModifer,
                                    })
                                )
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
                                onCharacterChanged(
                                    (previousCharacter: Character) => ({
                                        ...previousCharacter,
                                        showSpellSaveDC:
                                            !previousCharacter.showSpellSaveDC,
                                    })
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

export default CharacterSettingsDrawer;
