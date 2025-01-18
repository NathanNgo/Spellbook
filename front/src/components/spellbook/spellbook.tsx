import SpellTable from "../table/table";
import { Spell } from "../table/types";
import styles from "./spellbook.module.css";
type Props = {
    spells: Spell[];
};

const Spellbook = ({ spells }: Props) => {
    return (
        <div className={styles.spellBook}>
            <SpellTable spells={spells} title="cantrip" />
            <SpellTable spells={spells} title="1st level" />
            {/* <SpellTable spells={spells} title="2nd level" /> */}
        </div>
    );
};

export default Spellbook;
