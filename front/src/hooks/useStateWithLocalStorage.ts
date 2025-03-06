import { useEffect, useState, useRef } from "react";

function useStateWithLocalStorage<T>(key: string, defaultValue: T) {
    const initialValue = localStorage.getItem(key);
    const loadedFromStorage = useRef<boolean>(initialValue !== null);
    const [state, _setState] = useState<T>(() => {
        if (initialValue !== null) {
            loadedFromStorage.current = true;
            return JSON.parse(initialValue) as T;
        }
        return defaultValue;
    });

    function setState(newState: T | ((oldState: T) => T)) {
        loadedFromStorage.current = true;
        _setState(newState);
    }

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState, loadedFromStorage.current] as const;
}

export default useStateWithLocalStorage;
