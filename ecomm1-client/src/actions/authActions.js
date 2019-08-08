import {SIGN_UP_USER} from "./actionTypes";
const API = process.env.REACT_APP_API_URL;


export const signUp = (name, email, password) => async dispatch => {
  // const res = await fetch();
  console.log(name, email, password, API)

  let user = {name, email, password}


  // dispatch({ type: SIGN_UP_USER, payload: res });
};

export const signIn = () => async dispatch => {};
export const authenticate = async dispatch => () => {};
export const isAuthenticated = async dispatch => () => {};
