import { useEffect, useState, useRef } from "react";
import { loadFromLocalStorage } from "remote/caching";

function useStateWithLocalStorage<StateType>(
    key: string,
    defaultValue: StateType
) {
    const loadedFromStorage = useRef<boolean>(false);
    const [state, setState] = useState<StateType>(() => {
        const loadedResult = loadFromLocalStorage<StateType>(key, defaultValue);
        loadedFromStorage.current = loadedResult.loaded;
        return loadedResult.value;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState, loadedFromStorage.current] as const;
}

export default useStateWithLocalStorage;
