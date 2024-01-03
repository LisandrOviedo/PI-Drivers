import {
  ADD_DRIVER,
  REMOVE_DRIVER,
  FILTER_DRIVERTEAM,
  FILTER_DRIVERORIGIN,
  ORDER_DRIVERNAME,
  ORDER_DRIVERAGE,
} from "./action-types";

export const addDriver = (driver) => {
  try {
    return async (dispatch) => {
      return dispatch({
        type: ADD_DRIVER,
        payload: driver,
      });
    };
  } catch (error) {
    window.alert(error.response.data.error);
  }
};

export const removeDriver = (id) => {
  try {
    return async (dispatch) => {
      return dispatch({
        type: REMOVE_DRIVER,
        payload: id,
      });
    };
  } catch (error) {
    window.alert(error.response.data.error);
  }
};

export const filterCardsTeam = (team) => {
  return {
    type: FILTER_DRIVERTEAM,
    payload: team,
  };
};

export const filterCardsOrigin = (id) => {
  return {
    type: FILTER_DRIVERORIGIN,
    payload: id,
  };
};

export const orderCardsName = (order) => {
  return {
    type: ORDER_DRIVERNAME,
    payload: order,
  };
};

export const orderCardsAge = (order) => {
  return {
    type: ORDER_DRIVERAGE,
    payload: order,
  };
};
