import {
  GET_DRIVERS,
  GET_TEAMS,
  GET_DRIVERBYNAME,
  FILTER_ORIGIN,
  FILTER_TEAM,
  ORDER_NAME,
  ORDER_BIRTHDATE,
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

export const getDriverByName = (name) => {
  try {
    return async (dispatch) => {
      if (name) {
        var URL_SEARCH = `${URL_SERVER}/drivers?name=${name}`;
      } else {
        var URL_SEARCH = `${URL_SERVER}/`;
      }

      const { data } = await axios(URL_SEARCH);

      if (data.length === 0) {
        return alert("No drivers found");
      }

      return dispatch({
        type: GET_DRIVERBYNAME,
        payload: data,
      });
    };
  } catch (error) {
    window.alert(error.response.status);
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

export const filterOrigin = (origin) => {
  return {
    type: FILTER_ORIGIN,
    payload: origin,
  };
};

export const filterTeam = (team) => {
  return {
    type: FILTER_TEAM,
    payload: team,
  };
};

export const orderName = (order) => {
  return {
    type: ORDER_NAME,
    payload: order,
  };
};

export const orderBirthdate = (order) => {
  return {
    type: ORDER_BIRTHDATE,
    payload: order,
  };
};
