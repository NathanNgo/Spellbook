import style from "components/searchBar/SearchBar.module.css";
import React, { useState } from "react";

type Props = {
    onQueryChange: (query: string) => void;
    query: string;
    placeHolder: string;
};

function SearchBar({ onQueryChange, query, placeHolder }: Props) {
    function handleClearText() {
        onQueryChange("");
    }

    return (
        <div className={style.searchbar}>
            <span className="symbol">search</span>
            <input
                type="text"
                placeholder={placeHolder}
                onChange={(event) => onQueryChange(event.target.value)}
                value={query}
            />
            <div className="symbol" onClick={handleClearText}>
                close
            </div>
        </div>
    );
}

export default SearchBar;
