import {
  GET_DRIVERS,
  GET_TEAMS,
  FILTER_DRIVERTEAM,
  FILTER_DRIVERORIGIN,
  ORDER_DRIVERNAME,
  ORDER_DRIVERAGE,
} from "./action-types";

import axios from "axios";

const URL_SERVER = import.meta.env.VITE_URL_SERVER;

export const getDrivers = () => {
  try {
    return async (dispatch) => {
      const URL_SEARCHALL = `${URL_SERVER}/`;

      const { data } = await axios(URL_SEARCHALL);

      if (data[0].name) {
        return dispatch({
          type: GET_DRIVERS,
          payload: data,
        });
      }
    };
  } catch (error) {
    window.alert(error.response.data.error);
  }
};

export const getTeams = () => {
  try {
    return async (dispatch) => {
      const URL_ALLTEAMS = `${URL_SERVER}/teams`;
      const { data } = await axios(URL_ALLTEAMS);
      if (data[0].name) {
        return dispatch({
          type: GET_TEAMS,
          payload: data,
        });
      }
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
