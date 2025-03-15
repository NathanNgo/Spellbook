import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/pageDrawer/PageDrawer.module.css";
import type { SpellSummary, Spell } from "types";
import InfoBox from "components/infobox/InfoBox";
import StatusButton, { Status } from "components/statusButton/StatusButton";
import { ClassName, spellClassLevel } from "common/character";

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
    function showInfoBoxIfNonEmpty(title: string, info: string): JSX.Element {
        if (info.length == 0) {
            return <></>;
        }
        return <InfoBox title={title} info={info} />;
    }

    function spellLevelDisplay(): JSX.Element {
        if (spell === null) {
            return <></>;
        }

        const classNames = Object.values(ClassName);

        return classNames
            .map(
                (className: ClassName) =>
                    [className, spellClassLevel(spell, className)] as const
            )
            .filter(([, level]) => level !== null)
            .map(([className, level]) => (
                <span>
                    <span className={styles.levelClassName}>{className}</span>{" "}
                    <span className={styles.levelValue}>{level}</span>
                </span>
            ))
            .reduce((previous: JSX.Element, current: JSX.Element) => (
                <>
                    {previous}
                    <span>,&nbsp;</span>
                    {current}
                </>
            ));
    }

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
            </>
        );
    } else {
        pageContent = (
            <>
                <div
                    className={
                        styles.pageTitleContainer +
                        " " +
                        (spell.name.length > 6
                            ? styles.longTitle
                            : styles.shortTitle)
                    }
                >
                    <h1>{spell.name}</h1>
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
                    <div className={styles.backButtonContainer}>
                        <button>Back</button>
                    </div>
                </div>

                <div className={styles.topInfoContainer}>
                    <InfoBox title="Source" info={spell.source} flex="1" />
                    <InfoBox
                        title="Level"
                        info={
                            <div className={styles.spellLevelDisplay}>
                                {spellLevelDisplay()}
                            </div>
                        }
                        flex="4"
                    />
                </div>
                <h2>CASTING</h2>
                <div className={styles.infoContainer}>
                    {/* <InfoBox title="Casting Time" info={spell.castingTime} />
                    <InfoBox title="Components" info={spell.components} /> */}
                    {showInfoBoxIfNonEmpty("Casting Time", spell.castingTime)}
                    {showInfoBoxIfNonEmpty("Components", spell.components)}
                </div>
                <h2>EFFECT</h2>
                <div className={styles.infoContainer}>
                    {/* <InfoBox title="Range" info={spell.range} /> */}
                    {showInfoBoxIfNonEmpty("Range", spell.range)}
                    {showInfoBoxIfNonEmpty("Area", spell.area)}
                    {showInfoBoxIfNonEmpty("Duration", spell.duration)}
                    {showInfoBoxIfNonEmpty("Saving Throw", spell.savingThrow)}
                    {showInfoBoxIfNonEmpty(
                        "Spell Resistance",
                        spell.spellResistance
                    )}
                    {/* <InfoBox title="Area" info={spell.area} />
                    <InfoBox title="Duration" info={spell.duration} />
                    <InfoBox title="Saving Throw" info={spell.savingThrow} /> */}
                    {/* <InfoBox
                        title="Spell Resistance"
                        info={spell.spellResistance}
                    /> */}
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
