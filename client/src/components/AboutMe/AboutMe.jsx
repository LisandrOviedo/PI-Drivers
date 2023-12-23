import { useEffect } from "react";

import styles from "./AboutMe.module.scss";

export default function About() {
  useEffect(() => {
    document.title = "About Me - Drivers";

    return () => {
      document.title = "Drivers";
    };
  }, []);

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
            <td>24 years</td>
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
    </div>
  );
}
