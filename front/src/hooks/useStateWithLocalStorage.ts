import { useEffect, useState, useRef } from "react";

function useStateWithLocalStorage<StateType>(
    key: string,
    defaultValue: StateType
) {
    const loadedFromStorage = useRef<boolean>(false);
    const [state, setState] = useState<StateType>(() => {
        const initialValue = localStorage.getItem(key);
        if (initialValue !== null) {
            try {
                loadedFromStorage.current = true;
                return JSON.parse(initialValue) as StateType;
            } catch {
                // Can't parse local storage value as json, invalid storage
                // Should just give back defaultValue
            }
        }
        loadedFromStorage.current = false;
        return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState, loadedFromStorage.current] as const;
}

export default useStateWithLocalStorage;
