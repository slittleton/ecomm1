import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  AUTH_ERROR,
  SET_SIGNIN_STATUS,
  SIGN_OUT_USER
} from "./actionTypes";
import { saveToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

export const signUp = (name, email, password) => async dispatch => {
  let user = { name, email, password };
  let data = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  data = await data.json();

  if (data.token) {
    saveToken(data.token);
  }

  if (data.error) {
    dispatch({ type: AUTH_ERROR, payload: data.error });
  } else {
    dispatch({ type: AUTH_ERROR, payload: null });
    dispatch({ type: SIGN_UP_USER, payload: data.user });
  }
};
export const setSignInStatus = boo => async dispatch => {
  dispatch({ type: SET_SIGNIN_STATUS, payload: boo });
};
export const setErrorStatus = msg => async dispatch => {
  dispatch({ type: AUTH_ERROR, payload: msg });
};
export const signIn = (email, password) => async dispatch => {
  const user = { email, password };

  let data = await fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  data = await data.json();

  console.log("SIGN IN", data);

  if (data.token) {
    saveToken(data);
  }
  if (data.error) {
    dispatch({ type: AUTH_ERROR, payload: data.error });
    dispatch({ type: SET_SIGNIN_STATUS, payload: false });
  } else {
    dispatch({ type: AUTH_ERROR, payload: null });
    dispatch({ type: SIGN_IN_USER, payload: data.user });
  }
};
export const signOut = () => async dispatch => {
  // delete JWT
  localStorage.removeItem("jwt");

  // clear user info from redux store
  dispatch({ type: SIGN_OUT_USER });
};
