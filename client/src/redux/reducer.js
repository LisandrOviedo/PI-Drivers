import {
  GET_DRIVERS,
  GET_TEAMS,
  GET_DRIVERBYNAME,
  FILTER_DRIVERORIGIN,
  FILTER_DRIVERTEAM,
  ORDER_DRIVERNAME,
  ORDER_DRIVERAGE,
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

    case FILTER_DRIVERTEAM:
      let copy1 = [...state.allDrivers];

      if (payload === "All") {
        return {
          ...state,
          driversFilter: copy1,
        };
      }

      let filtered = copy1.filter((driver) => {
        return driver.teams.includes(payload);
      });

      return {
        ...state,
        driversFilter: filtered,
      };

    case FILTER_DRIVERORIGIN:
      let copy2 = [...state.allDrivers];

      if (payload === "All") {
        return {
          ...state,
          driversFilter: copy2,
        };
      }

      if (typeof payload === "number") {
        var filtered2 = copy2.filter((driver) => {
          return typeof driver.id === "number";
        });
      } else {
        var filtered2 = copy2.filter((driver) => {
          return typeof driver.id !== "number";
        });
      }

      return {
        ...state,
        driversFilter: filtered2,
      };

    case ORDER_DRIVERNAME:
      let copy3 = [...state.allDrivers];

      return {
        ...state,
        driversFilter: copy3.sort((a, b) => {
          if (payload === "A") {
            return a.name - b.name;
          }
          return b.name - a.name;
        }),
      };

    case ORDER_DRIVERAGE:
      let copy4 = [...state.allDrivers];

      return {
        ...state,
        driversFilter: copy4.sort((a, b) => {
          if (payload === "A") {
            return a.birthdate - b.birthdate;
          }
          return b.birthdate - a.birthdate;
        }),
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
