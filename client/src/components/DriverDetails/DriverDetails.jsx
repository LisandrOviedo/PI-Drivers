import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./DriverDetails.module.scss";

export default function DriverDetails() {
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const URL_DETAIL = `${URL_SERVER}/drivers/${id}`;

  useEffect(() => {
    document.title = `Detail ${id} - Drivers`;

    axios(URL_DETAIL).then(({ data }) => {
      if (data.name) {
        setDriver(data);
      } else {
        window.alert("There are no drivers with this ID!");
      }
    });
    return setDriver({});
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      {driver.name && (
        <>
          <div className={styles.firstSection}>
            <h1>
              {driver.name} {driver.last_name}
            </h1>
            <img src={driver.image} alt={driver.name} />
            <p>
              <b>Description:</b> {driver.description}
            </p>
            <p>
              <b>Nationality:</b> {driver.nationality}
            </p>
            <p>
              <b>Birthdate:</b> {driver.birthdate}
            </p>
            <p>
              <b>Teams:</b> {driver.teams}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
