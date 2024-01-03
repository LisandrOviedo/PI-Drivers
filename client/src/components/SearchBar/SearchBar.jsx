import { useState } from "react";

import { useDispatch } from "react-redux";
import { getDriverByName } from "../../redux/actions";

import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = (name) => {
    dispatch(getDriverByName(name));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(name);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        id="input"
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          handleSearch(name);
        }}
      >
        🔍
      </button>
    </div>
  );
}
