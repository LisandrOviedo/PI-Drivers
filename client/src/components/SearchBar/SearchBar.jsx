import { useState } from "react";

import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = (name) => {
    props.onSearch(name);
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
