import styles from "components/searchBar/SearchBar.module.css";
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
        <div className={styles.searchbar}>
            <span className={`symbol ${styles.searchIcon}`}>search</span>
            <input
                type="text"
                placeholder={placeHolder}
                onChange={(event) => onQueryChange(event.target.value)}
                value={query}
            />
            <div
                className={`symbol ${styles.closeIcon}`}
                onClick={handleClearText}
            >
                close
            </div>
        </div>
    );
}

export default SearchBar;
