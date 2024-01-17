import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validator } from "./validator";

import Footer from "../Footer/Footer";

import styles from "./Login.module.scss";

export default function Login({ login }) {
  useEffect(() => {
    document.title = "Login - Drivers";

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
      login(userData);
    } else {
      window.alert("Please check the fields and try again");
    }
  };

  return (
    <div className={styles.loginContainer}>
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
              Log in
            </button>
          </div>
        </form>
      </div>
      <div className={styles.buttonContainer2}>
        <Link className={styles.linkNav} to="/register">
          <span>You do not have an account? Sign up here</span>
        </Link>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
