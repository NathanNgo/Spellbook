import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/pageDrawer/PageDrawer.module.css";
import type { SpellSummary, Spell } from "types";
import InfoBox from "./InfoBox";
import StatusButton, { Status } from "components/statusButton/StatusButton";

const ASCII_WIZARD = `
  _____________________           .
/    THIS SPELL DOES    \\         
\\       NOT EXIST       /           .
 ----------------------  /^\\     .
              \\     /\\   "V"
               \\   /__\\   I      O  o
                  //..\\\\  I     .
                  \\].\`[/  I
                  /l\\/j\\  (]    .  O
                 /. ~~ ,\\/I          .
                 \\\\L__j^\\/I       o
                  \\/--v}  I     o   .
                  |    |  I   _________
                  |    |  I c(\`       ')o
                  |    l  I   \\.     ,/
                _/j  L l\\_!  _//^---^\\\\_
`;

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAddSpell: (spell: SpellSummary) => void;
    onRemoveSpell: (spell: SpellSummary) => void;
    spell: Spell | null;
    hasSpell: boolean;
};

function PageDrawer({
    isOpen,
    onClose,
    onAddSpell,
    onRemoveSpell,
    spell,
    hasSpell,
}: Props) {
    let pageContent = <></>;
    if (spell === null) {
        pageContent = (
            <>
                <textarea
                    readOnly
                    rows={ASCII_WIZARD.split("\n").length}
                    cols={Math.max(
                        ...ASCII_WIZARD.split("\n").map((line) => line.length)
                    )}
                    className={styles.errorText}
                    value={ASCII_WIZARD}
                />
                {/* {ASCII_WIZARD}
                </textarea> */}
            </>
        );
    } else {
        pageContent = (
            <>
                <div className={styles.pageTitleContainer}>
                    <h1>
                        <i>{spell.name}</i>
                    </h1>
                    <div className={styles.addButtonContainer}>
                        <StatusButton
                            status={!hasSpell ? Status.First : Status.Second}
                            onChangeToSecond={() => onAddSpell(spell)}
                            onChangeToFirst={() => onRemoveSpell(spell)}
                            firstText="+ Add"
                            secondText="- Remove"
                            transitionFromFirstText="Added"
                            transitionFromSecondText="Removed"
                        />
                    </div>
                </div>
                <h2>CASTING</h2>
                <div className={styles.infoContainer}>
                    <InfoBox title="Casting Time" info={spell.castingTime} />
                    <InfoBox title="Components" info={spell.components} />
                </div>
                <h2>EFFECT</h2>
                <div className={styles.infoContainer}>
                    <InfoBox title="Range" info={spell.range} />
                    <InfoBox title="Area" info={spell.area} />
                    <InfoBox title="Duration" info={spell.duration} />
                    <InfoBox title="Saving Throw" info={spell.savingThrow} />
                    <InfoBox
                        title="Spell Resistance"
                        info={spell.spellResistance}
                    />
                </div>
                <h2>DESCRIPTION</h2>
                <div
                    className={styles.descriptionContainer}
                    dangerouslySetInnerHTML={{
                        __html: spell.descriptionFormatted,
                    }}
                />
            </>
        );
    }
    return (
        <Drawer
            side={DrawerSide.Right}
            isOpen={isOpen}
            onClose={onClose}
            width="60%"
        >
            <div className={styles.pageContainer}>{pageContent}</div>
        </Drawer>
    );
}

export default PageDrawer;
