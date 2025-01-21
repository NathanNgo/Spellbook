import style from "components/searchBar/SearchBar.module.css";

function SearchBar() {
    return (
        <div className={style.searchbar}>
            <input
                type="text"
                className={style.searchbarInput}
                placeholder="Search current spellbook"
            />
            <button className="symbol">search</button>
        </div>
    );
}

export default SearchBar;
