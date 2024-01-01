import { useState, useEffect } from "react";
import { validator } from "./validator";
import { Link } from "react-router-dom";

import Team from "../Team/Team";

import styles from "./RegisterDriver.module.scss";

export default function RegisterDriver({ teams, registerDriver }) {
  const teamsSelected = {
    name: "",
  };

  useEffect(() => {
    document.title = "Driver Register - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  const [driverData, setDriverData] = useState({
    name: "",
    last_name: "",
    description: "",
    image: "",
    nationality: "",
    birthdate: "",
    teams: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setDriverData({ ...driverData, [event.target.name]: event.target.value });

    setErrors(
      validator({
        ...driverData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const addTeam = (event) => {
    event.preventDefault();
    let select = document.getElementById("teamsList");
    let value = select.options[select.selectedIndex].value;

    let validacion = driverData["teams"].includes(value);

    if (validacion) {
      return alert("Ya agregaste este team");
    } else {
      if (driverData["teams"].length == 0) {
        setDriverData({
          ...driverData,
          teams: value,
        });
      } else {
        setDriverData({
          ...driverData,
          teams: driverData["teams"] + ", " + value,
        });
      }
    }
  };

  const deleteTeam = (event) => {
    event.preventDefault();

    let equipos = driverData["teams"].split(", ").slice(0, -1).join(", ");

    setDriverData({
      ...driverData,
      teams: equipos,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.entries(errors).length === 0) {
      registerDriver(driverData);
      console.log(driverData);
    } else {
      window.alert("Please check the fields and try again");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Create a Driver</h1>
      <div className={styles.formContainer}>
        <form>
          <input
            id="name"
            type="text"
            name="name"
            value={driverData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <p>{errors.name}</p>
          <br />
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={driverData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <p>{errors.last_name}</p>
          <br />
          <input
            id="nationality"
            type="text"
            name="nationality"
            value={driverData.nationality}
            onChange={handleChange}
            placeholder="Nationality"
          />
          <p>{errors.nationality}</p>
          <br />
          <input
            id="image"
            type="url"
            name="image"
            value={driverData.image}
            onChange={handleChange}
            placeholder="URL Image"
          />
          <p>{errors.image}</p>
          <br />
          <input
            id="birthdate"
            type="date"
            name="birthdate"
            value={driverData.birthdate}
            onChange={handleChange}
          />
          <p>{errors.birthdate}</p>
          <br />
          <input
            id="description"
            type="textarea"
            name="description"
            value={driverData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <p>{errors.description}</p>
          <br />
          <select id="teamsList" name="teamsList">
            {teams.map((team) => (
              <Team key={team.id} id={team.id} name={team.name} />
            ))}
          </select>
          <button onClick={addTeam}>Add Team</button>
          <button onClick={deleteTeam}>Delete Last Team</button>
          <br />
          <label id="teams">Teams Seleccionados: {driverData.teams}</label>

          <div className={styles.buttonContainer}>
            <button type="Submit" onClick={handleSubmit}>
              Create Driver
            </button>
            <Link className={styles.linkNav} to="/home">
              <span>Cancel</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
