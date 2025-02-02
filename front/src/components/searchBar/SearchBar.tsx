import TextInput from "components/textInput/TextInput";
import { useCallback, useMemo } from "react";

type Props = {
    onQueryChange: (query: string) => void;
    query: string;
    placeHolder: string;
};

function SearchBar({ onQueryChange, query, placeHolder }: Props) {
    const handleClearText = useCallback(() => {
        onQueryChange("");
    }, [onQueryChange]);

    const searchIcon = useMemo(
        () => <span className="symbol">search</span>,
        []
    );

    const clearButton = useMemo(
        () => (
            <div className="symbol" onClick={handleClearText}>
                close
            </div>
        ),
        [handleClearText]
    );

    return (
        <TextInput
            onTextChange={onQueryChange}
            textValue={query}
            placeHolder={placeHolder}
            leftIcon={searchIcon}
            rightIcon={clearButton}
        />
    );
}

export default SearchBar;
