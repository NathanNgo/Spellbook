import { useState } from "react";
import styles from "components/addRemoveButton/AddRemoveButton.module.css";

type Props = {
    addable: boolean;
    handleAdd: () => void;
    handleRemove: () => void;
    addText?: string;
    removeText?: string;
    addedText?: string;
    addingText?: string;
    delayTimeMs?: number;
    className?: string;
};

function AddRemoveButton({
    addable,
    handleAdd,
    handleRemove,
    addText = "+ Add",
    removeText = "- Remove",
    addedText = "Added",
    delayTimeMs = 1000,
}: Props) {
    const [justAdded, setJustAdded] = useState<boolean>(false);

    const addOrRemoveText = addable ? addText : removeText;
    const displayText = justAdded ? addedText : addOrRemoveText;
    const className = `${styles.addButton} ${
        justAdded ? styles.justAdded : ""
    }`;

    function handleClick() {
        if (addable) {
            handleAdd();
            setJustAdded(true);
            setTimeout(() => {
                setJustAdded(false);
            }, delayTimeMs);
        } else {
            handleRemove();
            setJustAdded(false);
        }
    }

    return (
        <button onClick={handleClick} className={className}>
            {displayText}
        </button>
    );
}

export default AddRemoveButton;
