import { useCallback, useEffect, useRef, useState } from "react";

function useOpenStateWithClickAway() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const areaRef = useRef<HTMLDivElement>(null);

    const handleToggleOpen = useCallback(() => {
        setIsOpen((prevValue) => !prevValue);
    }, []);

    useEffect(() => {
        function handleClickAway(event: MouseEvent) {
            if (!(event.target instanceof Node)) {
                return;
            }

            if (areaRef.current && !areaRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickAway);

        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        };
    }, []);

    return { isOpen, setIsOpen, handleToggleOpen, areaRef };
}

export default useOpenStateWithClickAway;
