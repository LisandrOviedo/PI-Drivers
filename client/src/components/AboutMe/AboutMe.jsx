import { useEffect } from "react";

import Footer from "../Footer/Footer";

import styles from "./AboutMe.module.scss";

export default function About() {
  useEffect(() => {
    document.title = "About Me - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

  function calcularEdad() {
    let hoy = new Date();
    let edad = hoy.getFullYear() - 1998;
    let mes = hoy.getMonth() - 11;

    if (mes < 0 || (mes === 0 && hoy.getDate() <= 24)) {
      edad--;
    }

    return edad;
  }

  return (
    <div className={styles.aboutContainer}>
      <h1>About Me</h1>
      <img className={styles.zoom} src="/Lisandro.jpg" alt="Lisandro Avatar" />
      <h2>Lisandro Oviedo</h2>
      <h4>Junior Programmer</h4>
      <br />
      <hr />
      <br />
      <table>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>Lisandro Oviedo</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{calcularEdad()} years</td>
          </tr>
          <tr>
            <td>Nationality</td>
            <td>Venezuelan</td>
          </tr>
          <tr>
            <td>Maximum studies completed</td>
            <td>Computer engineering, computer technician</td>
          </tr>
          <tr>
            <td>Profession</td>
            <td>Programmer analyst</td>
          </tr>
          <tr>
            <td>Hobby</td>
            <td>Play video games</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
