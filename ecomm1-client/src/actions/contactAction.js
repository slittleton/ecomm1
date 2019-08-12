import { MESSAGE_SUCCESS, MESSAGE_ERROR } from "./actionTypes";

const API = process.env.REACT_APP_API_URL;

export const sendMessage = message => async dispatch => {
  let data = await fetch(`${API}/message`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });

  data = await data.json();
  console.log("received data:", data);

  if (data.error) {
    dispatch({ type: MESSAGE_ERROR, payload: data.error });
  } else {
    dispatch({ type: MESSAGE_SUCCESS, payload: data });
  }
};

export const setMessageError = msg => async dispatch => {
  dispatch({type: MESSAGE_ERROR, payload: msg})
}

export const setMessageData = msg => async dispatch => {
  dispatch({type: MESSAGE_SUCCESS, payload: msg})
}
