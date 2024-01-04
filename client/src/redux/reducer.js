import {
  GET_DRIVERS,
  GET_TEAMS,
  GET_DRIVERBYNAME,
  FILTER_ORIGIN,
  FILTER_TEAM,
  ORDER_NAME,
  ORDER_BIRTHDATE,
} from "./action-types";

const initialState = {
  driversFilter: [],
  allDrivers: [],
  allTeams: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DRIVERS:
      return { ...state, driversFilter: payload, allDrivers: payload };

    case GET_DRIVERBYNAME:
      return { ...state, driversFilter: payload };

    case GET_TEAMS:
      return { ...state, allTeams: payload };

    case FILTER_ORIGIN:
      let copy = [...state.allDrivers];

      if (payload === "BD") {
        let filterOrigin = copy.filter((driver) => {
          return typeof driver.id !== "number";
        });

        return { ...state, driversFilter: filterOrigin };
      } else if (payload === "API") {
        let filterOrigin = copy.filter((driver) => {
          return typeof driver.id === "number";
        });

        return { ...state, driversFilter: filterOrigin };
      }

      return {
        ...state,
        driversFilter: copy,
      };

    case FILTER_TEAM:
      let copy2 = [...state.allDrivers];

      if (payload === "All") {
        return {
          ...state,
          driversFilter: copy2,
        };
      }

      let filterTeam = copy2.filter((driver) => {
        let claves = Object.keys(driver); // propiedades

        for (let i = 0; i < claves.length; i++) {
          let clave = claves[i];

          if (clave === "teams") {
            if (driver[clave].includes(payload)) {
              return driver;
            }
          }
        }
      });

      return { ...state, driversFilter: filterTeam };

    case ORDER_NAME:
      let copy3 = [...state.allDrivers];

      if (payload === "Asc") {
        return {
          ...state,
          driversFilter: copy3.sort((a, b) => {
            return a.name.localeCompare(b.name);
          }),
        };
      } else if (payload === "Des") {
        return {
          ...state,
          driversFilter: copy3.sort((a, b) => {
            return b.name.localeCompare(a.name);
          }),
        };
      }
      return {
        ...state,
        driversFilter: copy3,
      };

    case ORDER_BIRTHDATE:
      let copy4 = [...state.allDrivers];

      if (payload === "Asc") {
        copy4.sort((a, b) => {
          return a.birthdate.localeCompare(b.birthdate);
        });

        return {
          ...state,
          driversFilter: copy4,
        };
      } else if (payload === "Des") {
        copy4.sort((a, b) => {
          return b.birthdate.localeCompare(a.birthdate);
        });

        return {
          ...state,
          driversFilter: copy4,
        };
      }
      return {
        ...state,
        driversFilter: copy4,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
