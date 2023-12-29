import { useState, useEffect } from "react";
import { validator } from "./validator";
import { Link } from "react-router-dom";

import styles from "./RegisterDriver.module.scss";

export default function RegisterDriver({ registerDriver }) {
  useEffect(() => {
    document.title = "Driver Register - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  const [driverData, setDriverData] = useState({
    name: "",
    last_name: "",
    nationality: "",
    image: "",
    birthdate: "",
    description: "",
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

          <div className={styles.buttonContainer}>
            <button type="Submit" onClick={handleSubmit}>
              Create Driver
            </button>
            <Link className={styles.linkNav} to="/home">
              <span>CANCEL</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
