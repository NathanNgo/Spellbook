import { useEffect, useState, useRef } from "react";

function useStateWithLocalStorage<StateType>(
    key: string,
    defaultValue: StateType
) {
    const initialValue = localStorage.getItem(key);
    const loadedFromStorage = useRef<boolean>(initialValue !== null);
    const [state, setState] = useState<StateType>(() => {
        if (initialValue !== null) {
            try {
                loadedFromStorage.current = true;
                return JSON.parse(initialValue) as StateType;
            } catch {
                loadedFromStorage.current = false;
                return defaultValue;
            }
        }
        return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState, loadedFromStorage.current] as const;
}

export default useStateWithLocalStorage;
