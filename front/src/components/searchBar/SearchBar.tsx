import Input from "components/input/Input";
import { useMemo } from "react";

type Props = {
    onQueryChange: (query: string) => void;
    query: string;
    placeHolder: string;
};

function SearchBar({ onQueryChange, query, placeHolder }: Props) {
    const searchIcon = useMemo(
        () => <span className="symbol">search</span>,
        []
    );

    return (
        <Input
            onValueChange={onQueryChange}
            value={query}
            placeHolder={placeHolder}
            leftIcon={searchIcon}
            showClearButton
        />
    );
}

export default SearchBar;
