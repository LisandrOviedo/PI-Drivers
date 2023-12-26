import { Link } from "react-router-dom";

// import RandomCharacter from "../RandomCharacter/RandomCharacter";
// import SearchBar from "../SearchBar/SearchBar";

import Logo from "/Logo.svg";

import styles from "./NavBar.module.scss";

export default function NavBar(props) {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.firstSection}>
        <Link className={styles.linkLogo} to="/home">
          <img src={Logo} alt="Morty Logo" width="50px" />
          <span>Drivers</span>
        </Link>
      </div>

      <div className={styles.secondSection}>
        <div className={styles.navigate}>
          <Link className={styles.linkNav} to="/createADriver">
            <span>New Driver</span>
          </Link>
          <Link className={styles.linkNav} to="/about">
            <span>About</span>
          </Link>
          <button onClick={props.logout}>Log Out</button>
        </div>

        <div className={styles.searchBar}>
          {/* <SearchBar onSearch={props.onSearch} />
          <RandomCharacter addRandomCharacter={props.addRandomCharacter} /> */}
        </div>
      </div>
    </nav>
  );
}
