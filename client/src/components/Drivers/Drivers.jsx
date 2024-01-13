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

  const drivers = useSelector((state) => state.drivers);
  const allTeams = useSelector((state) => state.allTeams);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage, setDriversPerPage] = useState(9);

  const indexEnd = currentPage * driversPerPage;
  const indexStart = indexEnd - driversPerPage;

  const dataDrivers = drivers.slice(indexStart, indexEnd);
  const pageCount = Math.ceil(drivers.length / driversPerPage);

  const handleFilterOrigin = (event) => {
    const selectTeam = document.getElementById("selectTeam");
    selectTeam.value = "All";
    const selectOrderName = document.getElementById("selectOrderName");
    selectOrderName.value = "All";
    const selectOrderBirthdate = document.getElementById(
      "selectOrderBirthdate"
    );
    selectOrderBirthdate.value = "All";

    dispatch(filterOrigin(event.target.value));
  };

  const handleFilterTeam = (event) => {
    const selectOrderName = document.getElementById("selectOrderName");
    selectOrderName.value = "All";
    const selectOrderBirthdate = document.getElementById(
      "selectOrderBirthdate"
    );
    selectOrderBirthdate.value = "All";

    const select = document.getElementById("selectOrigin");
    const value = select.options[select.selectedIndex].value;

    dispatch(filterOrigin(value));

    dispatch(filterTeam(event.target.value));
  };

  const handleOrderName = (event) => {
    const selectOrigin = document.getElementById("selectOrigin");
    const valueOrigin = selectOrigin.options[selectOrigin.selectedIndex].value;

    const selectTeam = document.getElementById("selectTeam");
    const valueTeam = selectTeam.options[selectTeam.selectedIndex].value;

    const selectOrderBirthdate = document.getElementById(
      "selectOrderBirthdate"
    );
    selectOrderBirthdate.value = "All";

    if (event.target.value === "All") {
      dispatch(filterOrigin(valueOrigin));
      dispatch(filterTeam(valueTeam));
    }

    dispatch(orderName(event.target.value));
  };

  const handleOrderBirthdate = (event) => {
    const selectOrigin = document.getElementById("selectOrigin");
    const valueOrigin = selectOrigin.options[selectOrigin.selectedIndex].value;

    const selectTeam = document.getElementById("selectTeam");
    const valueTeam = selectTeam.options[selectTeam.selectedIndex].value;

    const selectOrderName = document.getElementById("selectOrderName");
    selectOrderName.value = "All";

    if (event.target.value === "All") {
      dispatch(filterOrigin(valueOrigin));
      dispatch(filterTeam(valueTeam));
    }

    dispatch(orderBirthdate(event.target.value));
  };

  const handleRemoveFilters = () => {
    const selectOrigin = document.getElementById("selectOrigin");
    selectOrigin.value = "All";
    const selectTeam = document.getElementById("selectTeam");
    selectTeam.value = "All";
    const selectOrderName = document.getElementById("selectOrderName");
    selectOrderName.value = "All";
    const selectOrderBirthdate = document.getElementById(
      "selectOrderBirthdate"
    );
    selectOrderBirthdate.value = "All";

    dispatch(filterOrigin(selectOrigin.value));
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      setCurrentPage(prevPage);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    if (nextPage <= pageCount) {
      setCurrentPage(nextPage);
    }
  };

  const handleDriversPerPage = (event) => {
    setCurrentPage(1);
    setDriversPerPage(event.target.value);
  };

  const handleScrollToStart = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.driversContainer}>
      <br />
      <h1>Drivers</h1>
      <br />
      <br />
      <div className={styles.filters}>
        <select id="selectOrigin" onChange={handleFilterOrigin}>
          <option value="All">All Origins</option>
          <option value="BD">DataBase</option>
          <option value="API">API</option>
        </select>

        <select id="selectTeam" onChange={handleFilterTeam}>
          <option value="All">All Teams</option>
          {allTeams.map((team) => (
            <Team key={team.id} id={team.id} name={team.name} />
          ))}
        </select>

        <select id="selectOrderName" onChange={handleOrderName}>
          <option value="All">Order Name</option>
          <option value="Asc">A-Z</option>
          <option value="Des">Z-A</option>
        </select>

        <select id="selectOrderBirthdate" onChange={handleOrderBirthdate}>
          <option value="All">Order Birthdate</option>
          <option value="Des">Most recent first</option>
          <option value="Asc">Less recent first</option>
        </select>

        <select onChange={handleDriversPerPage}>
          <option value="9">9 Drivers Per Page (Default)</option>
          <option value="3">3 Drivers Per Page</option>
          <option value="5">5 Drivers Per Page</option>
          <option value="10">10 Drivers Per Page</option>
          <option value="20">20 Drivers Per Page</option>
        </select>
        <button onClick={handleRemoveFilters}>❌ Remove Filters</button>
      </div>
      <br />
      <div className={styles.pagination}>
        <button onClick={handlePrevPage}>Prev</button>
        <label>
          Current page: {currentPage} of {pageCount}
        </label>
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
      <button className={styles.scrollUp} onClick={handleScrollToStart}>
        Go back up!
      </button>
      <br />
      <br />
    </div>
  );
}
