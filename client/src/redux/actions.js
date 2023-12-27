import {
  ADD_DRIVER,
  REMOVE_DRIVER,
  FILTER_DRIVERORIGIN,
  FILTER_DRIVERTEAM,
  ORDER_DRIVER,
} from "./action-types";

export const addFav = (character) => {
  try {
    return async (dispatch) => {
      return dispatch({
        type: ADD_DRIVER,
        payload: character,
      });
    };
  } catch (error) {
    window.alert(error.response.data.error);
  }
};

export const removeFav = (id) => {
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

export const filterCardsOrigin = (id) => {
  return {
    type: FILTER_DRIVERORIGIN,
    payload: id,
  };
};

export const filterCardsTeam = (team) => {
  return {
    type: FILTER_DRIVERTEAM,
    payload: team,
  };
};

export const orderCards = (order) => {
  return {
    type: ORDER_DRIVER,
    payload: order,
  };
};
