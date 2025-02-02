import { useEffect, useState } from "react";

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
    addingText = "Adding...",
    delayTimeMs = 3000,
    className = "",
}: Props) {
    const [justAdded, setJustAdded] = useState<boolean>(false);

    const addOrRemoveText = addable ? addText : removeText;
    const justAddedDisplay = addable ? addingText : addedText;
    const displayText = justAdded ? justAddedDisplay : addOrRemoveText;

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
