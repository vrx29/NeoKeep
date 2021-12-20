import { RiSearchLine } from "react-icons/ri";

function Search() {
  return (
    <>
      <div className="search-cont">
        <RiSearchLine className="search-icon" />
        <input className="search-bar" />
      </div>
    </>
  );
}

export default Search;
