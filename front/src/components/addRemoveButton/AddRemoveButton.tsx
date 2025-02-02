import { useState } from "react";

type Props = {
    addable: boolean;
    handleAdd: () => void;
    handleRemove: () => void;
    addText?: string;
    removeText?: string;
    addedText?: string;
    delayTimeMs?: number;
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
    const [delayedText, setDelayedText] = useState<string>(
        addable ? addText : removeText
    );

    function handleClick() {
        if (addable) {
            handleAdd();
            setDelayedText(addedText);
            setTimeout(() => setDelayedText(removeText), delayTimeMs);
        } else {
            handleRemove();
        }
    }

    return <button onClick={handleClick}>{delayedText}</button>;
}
