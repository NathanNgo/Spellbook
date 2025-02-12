import { useCallback, useEffect, useRef, useState } from "react";

function useActiveStateWithClickAway() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const areaRef = useRef<HTMLDivElement>(null);

    const handleToggleActive = useCallback(() => {
        setIsActive((prevValue) => !prevValue);
    }, []);

    useEffect(() => {
        function handleClickAway(event: MouseEvent) {
            if (!(event.target instanceof Node)) {
                return;
            }

            if (areaRef.current && !areaRef.current.contains(event.target)) {
                setIsActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickAway);

        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        };
    }, []);

    return { isActive, setIsActive, handleToggleActive, areaRef };
}

export default useActiveStateWithClickAway;
