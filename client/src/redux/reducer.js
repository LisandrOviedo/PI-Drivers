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
        if (driver["teams"].includes(payload)) {
          return driver;
        }
      });

      return { ...state, driversFilter: filterTeam };

    case ORDER_NAME:
      let copy3 = [...state.allDrivers];

      return {
        ...state,
        driversFilter: copy3.sort((a, b) => {
          if (payload === "Asc") {
            return a.name - b.name;
          }
          return b.name - a.name;
        }),
      };

    case ORDER_BIRTHDATE:
      let copy4 = [...state.allDrivers];

      return {
        ...state,
        driversFilter: copy4.sort((a, b) => {
          if (payload === "Asc") {
            return a.birthdate > b.birthdate;
          }
          return a.birthdate < b.birthdate;
        }),
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
