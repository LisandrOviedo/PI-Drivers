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
    const selectOrigin = document.getElementById("selectOrigin");
    selectOrigin.value = "All";
    const selectTeam = document.getElementById("selectTeam");
    selectTeam.value = "All";
    const selectOrderName = document.getElementById("selectOrderName");
    selectOrderName.value = "All";
    const selectOrderBirthdate = document.getElementById(
      "selectOrderBirthdate"
    );
    selectOrderBirthdate.value = "All";

    dispatch(getDriverByName(name));

    const firstPage = document.getElementById("firstPage");
    firstPage.click();
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
