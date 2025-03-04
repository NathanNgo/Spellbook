import { useEffect, useState } from "react";

type Props<T> = {
    key: string;
    defaultValue: T;
    fetchMethod?: () => Promise<T>;
    isOfType?: (value: unknown) => value is T;
};

function defaultIsOfType<T>(value: unknown): value is T {
    return true;
}

function useStateWithLocalStorageOrFetch<T>({
    key,
    defaultValue,
    fetchMethod,
    isOfType = defaultIsOfType,
}: Props<T>) {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            setLoaded(true);
            try {
                const parsedValue: T = JSON.parse(storedValue) as T;
                if (isOfType(parsedValue)) {
                    return parsedValue as T;
                } else {
                    return defaultValue;
                }
            } catch {
                return defaultValue;
            }
        }
        return defaultValue;
    });

    function setStorage() {
        localStorage.setItem(key, JSON.stringify(state));
    }

    useEffect(() => {
        if (!loaded && fetchMethod !== undefined) {
            fetchMethod().then((value) => {
                setState(value);
                setStorage();
                setLoaded(true);
            });
        }
    }, []);

    useEffect(() => {
        setStorage();
        setLoaded(true);
    }, [key, state]);

    return [state, setState, loaded] as const;
}

export default useStateWithLocalStorageOrFetch;
