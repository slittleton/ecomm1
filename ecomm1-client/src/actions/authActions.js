import {SIGN_UP_USER, AUTH_ERROR} from "./actionTypes";
const API = process.env.REACT_APP_API_URL;


export const signUp = (name, email, password) => async dispatch => {
  // const res = await fetch();
  console.log(name, email, password, API)

  let user = {name, email, password}

  let data = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  data = await data.json();
  console.log(data.user);

  if(data.user.error){
    dispatch({ type: AUTH_ERROR, payload: data.user.error})
  } else {
    dispatch({ type: SIGN_UP_USER, payload: data.user });
  }
  
};

export const signIn = () => async dispatch => {};
export const authenticate = async dispatch => () => {};
export const isAuthenticated = async dispatch => () => {};
