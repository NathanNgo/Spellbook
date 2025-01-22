import style from "components/searchBar/SearchBar.module.css";
import React, { useState } from "react";

type Props = {
    handleSearch: (query: string) => void;
};

function SearchBar({ handleSearch }: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    };

    return (
        <div className={style.searchbar}>
            <input
                type="text"
                placeholder="Search current spellbook"
                onChange={handleInputChange}
            />
            <button className="symbol">search</button>
        </div>
    );
}

export default SearchBar;
