import Drawer, { DrawerSide } from "components/drawer/Drawer";
import styles from "components/drawer/pageDrawer/PageDrawer.module.css";
import type { SpellSummary, Spell } from "types";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    spell: Spell | null;
    onAddSpell: (spell: SpellSummary) => void;
    onRemoveSpell: (spell: SpellSummary) => void;
};
//                         |
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

console.log(ASCII_WIZARD);
function PageDrawer({
    isOpen,
    onClose,
    onAddSpell,
    onRemoveSpell,
    spell,
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
                >
                    {ASCII_WIZARD}
                </textarea>
            </>
        );
    } else {
        pageContent = (
            <>
                <h1>
                    <i>{spell.name}</i>
                </h1>
                <p
                    dangerouslySetInnerHTML={{
                        __html: spell.descriptionFormatted,
                    }}
                ></p>
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
