import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../Footer/Footer";

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

  const showID = () => {
    if (document.getElementById("ID").style.display == "none") {
      document.getElementById("ID").style.display = "block";
      document.getElementById("buttonID").innerText = "Hide ID 🚫";
    } else {
      document.getElementById("ID").style.display = "none";
      document.getElementById("buttonID").innerText = "Show ID 👁️";
    }
  };

  return (
    <div className={styles.detailContainer}>
      {driver.name && (
        <>
          <div className={styles.firstSection}>
            <h1>
              {driver.name} {driver.last_name}
            </h1>
            <button id="buttonID" onClick={showID}>
              Show ID 👁️
            </button>
            <br />
            <label id="ID">
              <b>ID:</b> {driver.id}
            </label>
            <img src={driver.image} alt={driver.name} />
            <p>
              <b>Nationality:</b> {driver.nationality}
            </p>
            <p>
              <b>Birthdate:</b> {driver.birthdate}
            </p>
            <p>
              <b>Description:</b> {driver.description}
            </p>
            <p>
              <b>Teams:</b> {driver.teams}
            </p>
          </div>
        </>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
