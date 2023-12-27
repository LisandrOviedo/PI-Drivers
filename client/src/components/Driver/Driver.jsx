import { Link } from "react-router-dom";
import { addDriver, removeDriver } from "../../redux/actions";
import { connect } from "react-redux";

import styles from "./Driver.module.scss";

export function Driver(props) {
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
