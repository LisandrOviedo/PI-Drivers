import { getTeams } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "./validator";

import Team from "../Team/Team";

import styles from "./RegisterDriver.module.scss";

export default function RegisterDriver({ registerDriver }) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Driver Register - Drivers";

    dispatch(getTeams());

    return () => {
      document.title = "Drivers";
    };
  }, []);

  const allTeams = useSelector((state) => state.allTeams);

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
    const select = document.getElementById("teamsList");
    const value = select.options[select.selectedIndex].value;

    const teamValidatorInclude = driverData["teams"].includes(value);

    if (teamValidatorInclude) {
      return alert("You already added this team");
    }

    if (driverData["teams"].length === 0) {
      return setDriverData({
        ...driverData,
        teams: value,
      });
    }

    return setDriverData({
      ...driverData,
      teams: driverData["teams"] + ", " + value,
    });
  };

  const deleteTeam = (event) => {
    event.preventDefault();

    if (driverData["teams"].length === 0) {
      return alert("You have not currently added any team");
    }

    const newTeams = driverData["teams"].split(", ").slice(0, -1).join(", ");

    return setDriverData({
      ...driverData,
      teams: newTeams,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.entries(errors).length === 0) {
      registerDriver(driverData);
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
            {allTeams.map((team) => (
              <Team key={team.id} id={team.id} name={team.name} />
            ))}
          </select>
          <button className={styles.addTeam} onClick={addTeam}>
            Add Team
          </button>
          <button className={styles.deleteTeam} onClick={deleteTeam}>
            Remove Last Team
          </button>
          <br />
          <label id="teams">Teams Seleccionados: {driverData.teams}</label>

          <div className={styles.buttonContainer}>
            <button type="Submit" onClick={handleSubmit}>
              Create Driver
            </button>
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}
