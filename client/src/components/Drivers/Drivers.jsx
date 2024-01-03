import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../redux/actions";

import Driver from "../Driver/Driver";
import styles from "./Drivers.module.scss";

export default function Drivers() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home - Drivers";

    dispatch(getDrivers());

    return () => {
      document.title = "Drivers";
    };
  }, []);

  const allDrivers = useSelector((state) => state.allDrivers);

  return (
    <div className={styles.driversContainer}>
      <br />
      <h1>Drivers</h1>
      <br />
      <br />
      <div className={styles.cardsContainer}>
        {allDrivers.map((driver) => (
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
