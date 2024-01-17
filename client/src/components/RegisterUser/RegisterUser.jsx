import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validator } from "./validator";

import Footer from "../Footer/Footer";

import styles from "./RegisterUser.module.scss";

export default function RegisterUser({ register }) {
  useEffect(() => {
    document.title = "Sign Up - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });

    setErrors(
      validator({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.entries(errors).length === 0) {
      register(userData);
    } else {
      window.alert("Please check the fields and try again");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <Link to="/">
        <img src="/Logo.svg" alt="Inicio" />
      </Link>
      <div className={styles.formContainer}>
        <form>
          <input
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <p>{errors.email}</p>
          <br />
          <input
            id="password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <p>{errors.password}</p>

          <div className={styles.buttonContainer}>
            <button type="Submit" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className={styles.buttonContainer2}>
        <Link className={styles.linkNav} to="/login">
          <span>Do you already have an account? Login here</span>
        </Link>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
