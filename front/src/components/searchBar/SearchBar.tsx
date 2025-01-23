import style from "components/searchBar/SearchBar.module.css";
import React, { useState } from "react";

type Props = {
    onQueryChange: (query: string) => void;
    query: string;
    placeHolder: string;
};

function SearchBar({ onQueryChange, query, placeHolder }: Props) {
    return (
        <div className={style.searchbar}>
            <input
                type="text"
                placeholder={placeHolder}
                onChange={(event) => onQueryChange(event.target.value)}
                value={query}
            />
            <button className="symbol">search</button>
        </div>
    );
}

export default SearchBar;
