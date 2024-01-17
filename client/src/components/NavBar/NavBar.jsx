import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";

import Logo from "/Logo.svg";

import styles from "./NavBar.module.scss";

export default function NavBar(props) {
  return (
    <nav id="navBar" className={styles.navContainer}>
      <div className={styles.firstSection}>
        <Link className={styles.linkLogo} to="/home">
          <img src={Logo} alt="Driver Logo" width="50px" />
          <span>Drivers</span>
        </Link>
      </div>

      <div className={styles.secondSection}>
        <div className={styles.navigate}>
          <Link className={styles.linkNav} to="/registerDriver">
            <span>New Driver</span>
          </Link>
          <Link className={styles.linkNav} to="/about">
            <span>About</span>
          </Link>
          <button onClick={props.logout}>Log Out</button>
        </div>

        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
