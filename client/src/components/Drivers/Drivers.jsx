import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  getTeams,
  filterOrigin,
  filterTeam,
  orderName,
  orderBirthdate,
} from "../../redux/actions";

import Team from "../Team/Team";

import Driver from "../Driver/Driver";
import styles from "./Drivers.module.scss";

export default function Drivers() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home - Drivers";

    dispatch(getDrivers());
    dispatch(getTeams());

    return () => {
      document.title = "Drivers";
    };
  }, []);

  const driversFilter = useSelector((state) => state.driversFilter);
  const allTeams = useSelector((state) => state.allTeams);

  const handleFilterOrigin = (event) => {
    dispatch(filterOrigin(event.target.value));
  };

  const handleFilterTeam = (event) => {
    console.log(event.target.value);
    dispatch(filterTeam(event.target.value));
  };

  const handleOrderName = (event) => {
    dispatch(orderName(event.target.value));
  };

  const handleOrderBirthdate = (event) => {
    dispatch(orderBirthdate(event.target.value));
  };

  return (
    <div className={styles.driversContainer}>
      <br />
      <h1>Drivers</h1>
      <br />
      <br />
      <div className={styles.filters}>
        <select onChange={handleFilterOrigin}>
          <option value="All">All Origins</option>
          <option value="BD">DataBase</option>
          <option value="API">API</option>
        </select>

        <select onChange={handleFilterTeam}>
          <option value="All">All Teams</option>
          {allTeams.map((team) => (
            <Team key={team.id} id={team.id} name={team.name} />
          ))}
        </select>

        <select onChange={handleOrderName}>
          <option value="Asc">Ascending Name</option>
          <option value="Des">Descending Name</option>
        </select>

        <select onChange={handleOrderBirthdate}>
          <option value="Asc">Birthdate Ascending</option>
          <option value="Des">Birthdate Descending</option>
        </select>
      </div>
      <br />
      <div className={styles.cardsContainer}>
        {driversFilter.map((driver) => (
          <Driver
            key={driver.id}
            id={driver.id}
            name={driver.name}
            last_name={driver.last_name}
            description={driver.description}
            image={driver.image}
            nationality={driver.nationality}
            birthdate={driver.birthdate}
            teams={driver.teams}
          />
        ))}
      </div>
    </div>
  );
}
