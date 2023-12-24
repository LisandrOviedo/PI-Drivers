import { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Landing.module.scss";

export default function Landing() {
  useEffect(() => {
    document.title = "Drivers, by Lisandro Oviedo";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.hitthefloor}>Drivers by Lisandro Oviedo</h1>

      <Link className={styles.linkNav} to="/login">
        <button className={styles.ovbtngrowskew}>¡Vive la experiencia!</button>
      </Link>
    </div>
  );
}
