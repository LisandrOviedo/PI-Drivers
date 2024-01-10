import { useEffect, useState } from "react";
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

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9;

  const indexFinal = currentPage * driversPerPage;
  const indexInicial = indexFinal - driversPerPage;

  const dataDrivers = driversFilter.slice(indexInicial, indexFinal);

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

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      setCurrentPage(prevPage);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    const pageCount = Math.ceil(driversFilter.length / driversPerPage);

    if (nextPage - 1 < pageCount) {
      setCurrentPage(nextPage);
    }
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
          <option value="All">Order Name</option>
          <option value="Asc">A-Z</option>
          <option value="Des">Z-A</option>
        </select>

        <select onChange={handleOrderBirthdate}>
          <option value="All">Order Birthdate</option>
          <option value="Des">Most recent first</option>
          <option value="Asc">Less recent first</option>
        </select>
      </div>
      <br />
      <div className={styles.pagination}>
        <button onClick={handlePrevPage}>Prev</button>
        <label>Current page: {currentPage}</label>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <br />
      <div className={styles.cardsContainer}>
        {dataDrivers.map((driver) => (
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
