import style from "components/searchbar/SearchBar.module.css";

function SearchBar() {
    return (
        <div className={style.searchbar}>
            <input type="text" placeholder="Search current spellbook" />
            <button className="symbol">search</button>
        </div>
    );
}

export default SearchBar;
