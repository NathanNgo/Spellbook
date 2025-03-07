import { useEffect, useState, useRef } from "react";

function useStateWithLocalStorage<T>(key: string, defaultValue: T) {
    const initialValue = localStorage.getItem(key);
    const loadedFromStorage = useRef<boolean>(initialValue !== null);
    const [state, _setState] = useState<T>(() => {
        if (initialValue !== null) {
            try {
                loadedFromStorage.current = true;
                return JSON.parse(initialValue) as T;
            } catch {
                loadedFromStorage.current = false;
                return defaultValue;
            }
        }
        return defaultValue;
    });

    function setState(newState: T | ((oldState: T) => T)) {
        loadedFromStorage.current = true;
        _setState(newState);
    }

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState, loadedFromStorage.current] as const;
}

export default useStateWithLocalStorage;
