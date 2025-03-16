import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/pageDrawer/PageDrawer.module.css";
import type { SpellSummary, Spell } from "types";
import InfoBox from "components/infobox/InfoBox";
import StatusButton, { Status } from "components/statusButton/StatusButton";
import { ClassLevelName, spellClassLevelNameToLevel } from "common/character";
import Message from "components/message/Message";
import MovingEllipsis from "components/movingEllipsis/MovingEllipsis";
import InfoBoxContainer from "components/infoboxContainer/InfoBoxContainer";

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
    showLoading: boolean;
    isFromBrowse: boolean;
    onOpenBrowse: () => void;
};

function PageDrawer({
    isOpen,
    onClose,
    onAddSpell,
    onRemoveSpell,
    spell,
    hasSpell,
    showLoading,
    isFromBrowse,
    onOpenBrowse,
}: Props) {
    function spellLevelDisplay(): JSX.Element {
        if (spell === null) {
            return <></>;
        }

        const classNames = Object.values(ClassLevelName);

        return classNames
            .map(
                (classLevelName: ClassLevelName) =>
                    [
                        classLevelName,
                        spellClassLevelNameToLevel(spell, classLevelName),
                    ] as const
            )
            .filter(([, level]) => level !== null)
            .map(([className, level], index, arr) => (
                <span className={styles.levelClassItems}>
                    <span className={styles.levelClassName}>{className}</span>{" "}
                    <span className={styles.levelValue}>{level}</span>
                    {index < arr.length - 1 && <span>,</span>}
                </span>
            ))
            .reduce((previous: JSX.Element, current: JSX.Element) => (
                <>
                    {previous}
                    {current}
                </>
            ));
    }

    function infoBox(infoTitle: string): JSX.Element | null {
        const info = spellInfo(infoTitle);
        if (info === "") {
            return null;
        }
        return <InfoBox title={infoTitle} info={spellInfo(infoTitle)} />;
    }

    function infoBoxes(infoTitles: string[]): JSX.Element[] {
        return infoTitles
            .map((infoTitle) => infoBox(infoTitle))
            .filter((element) => element !== null);
    }

    function spellInfo(infoTitle: string): JSX.Element | string {
        if (spell === null) {
            return "";
        }
        if (infoTitle === "Source") {
            return spell.source;
        }
        if (infoTitle === "Level") {
            return (
                <div className={styles.spellLevelDisplay}>
                    {spellLevelDisplay()}
                </div>
            );
        }
        if (infoTitle === "Casting Time") {
            return spell.castingTime;
        }
        if (infoTitle === "Components") {
            return spell.components;
        }
        if (infoTitle === "Range") {
            return spell.range;
        }
        if (infoTitle === "Area") {
            return spell.area;
        }
        if (infoTitle === "Duration") {
            return spell.duration;
        }
        if (infoTitle === "Saving Throw") {
            return spell.savingThrow;
        }
        if (infoTitle === "Spell Resistance") {
            return spell.spellResistance;
        }
        return "";
    }

    let pageContent = <></>;

    if (showLoading) {
        pageContent = (
            <div className={styles.loadingMessage}>
                <Message>
                    Loading Spell <MovingEllipsis />
                </Message>
            </div>
        );
    } else if (spell === null) {
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
                    <div
                        className={`${styles.backButtonContainer} ${
                            isFromBrowse ? "" : "hidden"
                        }`}
                    >
                        <button onClick={onOpenBrowse}>Back</button>
                    </div>
                </div>

                <div className={styles.topInfoContainer}>
                    <InfoBox title="Source" info={spell.source} flex="1" />
                    <InfoBox title="Level" info={spellInfo("Level")} flex="4" />
                </div>
                <h2>CASTING</h2>
                {/* <div className={styles.infoContainer}>
                    {showInfoBoxIfNonEmpty("Casting Time", spell.castingTime)}
                    {showInfoBoxIfNonEmpty("Components", spell.components)}
                </div> */}
                <InfoBoxContainer
                    infoBoxes={infoBoxes(["Casting Time", "Components"])}
                />
                <h2>EFFECT</h2>
                <InfoBoxContainer
                    infoBoxes={infoBoxes([
                        "Range",
                        "Area",
                        "Duration",
                        "Saving Throw",
                        "Spell Resistance",
                    ])}
                />
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
            width="75%"
        >
            <div className={styles.pageContainer}>{pageContent}</div>
        </Drawer>
    );
}

export default PageDrawer;
