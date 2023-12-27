import { Link } from "react-router-dom";
import { addDriver, removeDriver } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect } from "react";

import styles from "./Driver.module.scss";

export function Driver(props) {
  useEffect(() => {
    addDriver({
      id: props.id,
      name: props.name,
      last_name: props.last_name,
      description: props.description,
      image: props.image,
      nationality: props.nationality,
      birthdate: props.birthdate,
      teams: props.teams,
    });
  }, []);

  const {
    id,
    name,
    last_name,
    description,
    image,
    nationality,
    birthdate,
    teams,
  } = props;

  return (
    <div className={styles.cardContainer}>
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
          <b>Description:</b> {description}
        </p>
        <p>
          <b>Nationality:</b> {nationality}
        </p>
        <p>
          <b>Birthdate:</b> {birthdate}
        </p>
        <p>
          <b>Teams:</b> {teams}
        </p>
      </div>
    </div>
  );
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addDriver: (driver) => {
      dispatch(addDriver(driver));
    },

    removeDriver: (id) => {
      dispatch(removeDriver(id));
    },
  };
};

export const mapStateToProps = (state) => {
  return {
    driversFilterOrder: state.driversFilterOrder,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
