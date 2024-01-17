import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p>
        Made by:{" "}
        <Link className={styles.linkAbout} to="/about">
          <span>Lisandro Oviedo</span>
        </Link>{" "}
        | Drivers © 2024
      </p>
    </div>
  );
}
