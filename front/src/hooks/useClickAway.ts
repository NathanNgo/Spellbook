import { useCallback, useEffect, useRef, useState } from "react";

function useOpenStateWithClickAway() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggleState = useCallback(() => {
        setIsOpen((prevValue) => !prevValue);
    }, []);

    useEffect(() => {
        function handleClickAway(event: MouseEvent) {
            if (!(event.target instanceof Node)) {
                return;
            }

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickAway);

        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        };
    }, []);

    return { isOpen, setIsOpen, handleToggleState, dropdownRef };
}

export default useOpenStateWithClickAway;
