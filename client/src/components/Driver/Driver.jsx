import { Link } from "react-router-dom";

import styles from "./Driver.module.scss";

export default function Driver(props) {
  const { id, name, last_name, image, teams } = props;

  return (
    <div className={styles.driverContainer}>
      <div className={styles.imageSection}>
        <Link className={styles.link} to={`/detail/${id}`}>
          <img className={styles.zoom} src={image} alt="" />
        </Link>
      </div>

      <div className={styles.infoSection}>
        <Link className={styles.link} to={`/detail/${id}`}>
          <h4 className={styles.name}>
            {name} {last_name}
          </h4>
        </Link>
        <hr />
        <p>
          <b>Teams:</b> {teams}
        </p>
      </div>
    </div>
  );
}
