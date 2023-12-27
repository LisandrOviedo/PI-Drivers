import {
  ADD_DRIVER,
  REMOVE_DRIVER,
  FILTER_DRIVERORIGIN,
  FILTER_DRIVERTEAM,
  ORDER_DRIVER,
} from "./action-types";

const initialState = {
  driversFilterOrder: [],
  allDrivers: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DRIVER:
      return { ...state, driversFilterOrder: payload, allDrivers: payload };

    case REMOVE_DRIVER:
      return { ...state, driversFilterOrder: payload };

    case FILTER_DRIVERTEAM:
      let copy1 = [...state.allDrivers];

      if (payload === "All") {
        return {
          ...state,
          driversFilterOrder: copy1,
        };
      }

      let filtered = copy1.filter((driver) => {
        return driver.teams.includes(payload);
      });

      return {
        ...state,
        driversFilterOrder: filtered,
      };

    case FILTER_DRIVERORIGIN:
      let copy2 = [...state.allDrivers];

      if (payload === "All") {
        return {
          ...state,
          driversFilterOrder: copy2,
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
        driversFilterOrder: filtered2,
      };

    case ORDER_DRIVER:
      let copy3 = [...state.allDrivers];

      return {
        ...state,
        driversFilterOrder: copy3.sort((a, b) => {
          if (payload === "A") {
            return a.id - b.id;
          }
          return b.id - a.id;
        }),
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
