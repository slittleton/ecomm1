import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  AUTH_ERROR,
  SET_SIGNIN_STATUS
} from "./actionTypes";
const API = process.env.REACT_APP_API_URL;

const saveToken = token => {
  localStorage.setItem("jwt", JSON.stringify(token));
};

export const signUp = (name, email, password) => async dispatch => {
  let user = { name, email, password };
  // console.log("USER", user);

  let data = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  data = await data.json();
  console.log("SIGNUP DATA RECEIVED: ", data);

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

  console.log("USER ACTION", user);
  let data = await fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  data = await data.json();
  console.log("Received Data", data);

  if (data.token) {
    saveToken(data.token);
  }
  if (data.error) {
    dispatch({ type: AUTH_ERROR, payload: data.error });
    dispatch({ type: SET_SIGNIN_STATUS, payload: false });
  } else {
    dispatch({ type: AUTH_ERROR, payload: null });
    dispatch({ type: SIGN_IN_USER, payload: data.user });
  }
};
export const authenticate = async dispatch => () => {};
export const isAuthenticated = async dispatch => () => {};
