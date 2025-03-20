import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/pageDrawer/PageDrawer.module.css";
import descriptionStyles from "components/drawer/pageDrawer/PageDrawerDescription.module.css";
import type { SpellSummary, Spell, Character } from "types";
import InfoBox from "components/infobox/InfoBox";
import StatusButton, { Status } from "components/statusButton/StatusButton";
import {
    ClassLevelName,
    spellClassLevel,
    spellClassLevelNameToLevel,
} from "common/character";
import Message from "components/message/Message";
import MovingEllipsis from "components/movingEllipsis/MovingEllipsis";
import InfoBoxContainer from "components/infoboxContainer/InfoBoxContainer";
import { useMemo } from "react";

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
    character: Character;
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
    character,
}: Props) {
    const infoMapping = useMemo(() => {
        return {
            Source: spell?.source,
            "Casting Time": spell?.castingTime,
            Components: spell?.components,
            Range: spell?.range,
            Area: spell?.area,
            Duration: spell?.duration,
            "Saving Throw": spell?.savingThrow,
            "Spell Resistance": spell?.spellResistance,
        };
    }, [spell]);

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

        if (infoTitle === "Level") {
            return (
                <div className={styles.spellLevelDisplay}>
                    {spellLevelDisplay()}
                </div>
            );
        }
        if (infoTitle in infoMapping) {
            const mappedInfo =
                infoMapping[infoTitle as keyof typeof infoMapping];
            if (mappedInfo !== undefined) {
                return mappedInfo;
            }
        }
        return "";
    }

    function characterLevelText() {
        if (spell === null) {
            return "";
        }
        const level = spellClassLevel(spell, character.class);
        if (level === null || level === 0) {
            return "";
        }
        return `Lvl. ${level}`;
    }

    let pageContent = <></>;

    if (showLoading) {
        pageContent = (
            <div className={styles.loadingMessage}>
                <div className={styles.loadingText}>
                    <Message>Loading Spell&nbsp;</Message>
                </div>
                <div className={styles.loadingEllipsis}>
                    <Message>
                        <MovingEllipsis />
                    </Message>
                </div>
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
                        (spell.name.length > 12
                            ? styles.longTitle
                            : styles.shortTitle)
                    }
                >
                    <h1>
                        <p>{spell.name}</p>
                        <p className={styles.pageTitleLevel}>
                            {characterLevelText()}
                        </p>
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
                    <p className={styles.pageTitleLevel}>
                        {characterLevelText()}
                    </p>
                    <div className={`${styles.backButtonContainer}`}>
                        {isFromBrowse && (
                            <button onClick={onOpenBrowse}>Back</button>
                        )}
                        {!isFromBrowse && (
                            <button onClick={onClose}>Close</button>
                        )}
                    </div>
                </div>
                <InfoBoxContainer
                    infoBoxes={infoBoxes(["Level", "Source"])}
                    spans={[5, 1]}
                />
                <h2>CASTING</h2>
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
                    className={descriptionStyles.descriptionContainer}
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
