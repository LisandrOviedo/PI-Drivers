import { useEffect } from "react";

import Driver from "../Driver/Driver";
import styles from "./Drivers.module.scss";

export default function Drivers(props) {
  useEffect(() => {
    document.title = "Home - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  return (
    <div className={styles.driversContainer}>
      <br />
      <h1>Drivers</h1>
      <div className={styles.cardsContainer}>
        {props.drivers.map((driver) => (
          <Driver
            key={driver.id}
            id={driver.id}
            name={driver.name}
            last_name={driver.last_name}
            description={driver.description}
            image={driver.image}
            nationality={driver.nationality}
            birthdate={driver.birthdate}
            teams={driver.teams}
          />
        ))}
      </div>
    </div>
  );
}
