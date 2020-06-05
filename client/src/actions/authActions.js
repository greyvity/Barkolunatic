import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
} from "../actions/types";

import { returnErrors } from "./errorActions";

export const loadUser = () => async (dispatch, getState) => {
  // say user is loading
  dispatch({ type: USER_LOADING });

  try {
    const res = await fetch("/api/auth/register", configToken(getState));
    console.log(res);
    if (res.ok) {
      const jsonRes = await res.json();
      console.log(jsonRes);
      dispatch({
        type: USER_LOADED,
        payload: jsonRes,
      });
    } else {
      throw "err";
    }
  } catch (err) {
    //call return the errors
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = ({ username, email, password }) => async (
  dispatch
) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      auth: {
        username,
        email,
        password,
      },
    }),
  };

  try {
    const res = await fetch("/api/auth/register", config);
    const jsonRes = await res.json();
    if (jsonRes.message) {
      const error = { ...jsonRes, status: res.status };

      throw error;
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: jsonRes.user,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERRORS });
    }, 5000);
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      auth: {
        email,
        password,
      },
    }),
  };

  try {
    const res = await fetch("/api/auth/login", config);
    const jsonRes = await res.json();
    if (jsonRes.message) {
      const error = { ...jsonRes, status: res.status };

      throw error;
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: jsonRes.user,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERRORS });
    }, 5000);
  }
};

//helper function to config the header and token for api calls
export const configToken = (getState) => {
  //get token from the auth state
  const token = getState().auth.token;

  //setup the options object for the API call
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  // add token to options if exists
  if (token) {
    config.headers["auth-token"] = token;
  }
  console.log(config);
  return config;
};
