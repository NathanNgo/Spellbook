export type LoadedResult<LoadedValueType> = {
    value: LoadedValueType;
    loaded: boolean;
};

export function loadFromLocalStorage<StoredType>(
    key: string,
    defaultValue: StoredType
): LoadedResult<StoredType> {
    let loaded = false;
    let loadValue = defaultValue;
    const initialValue = localStorage.getItem(key);
    if (initialValue !== null) {
        try {
            loaded = true;
            loadValue = JSON.parse(initialValue) as StoredType;
        } catch {
            loaded = false;
            loadValue = defaultValue;
        }
    }

    return { value: loadValue, loaded: loaded };
}
