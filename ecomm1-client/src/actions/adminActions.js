import { MESSAGES_BUNDLE, MESSAGE_DELETED, MESSAGE_ERROR, MESSAGE_ARCHIVED } from "./actionTypes";
import { saveToken, authToken } from "./authMethods";

const API = process.env.REACT_APP_API_URL;

export const getMessages = () => async dispatch => {
  let token = authToken().token;
  try {
    let data = await fetch(`${API}/messages`, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
    data = await data.json();
    dispatch({ type: MESSAGES_BUNDLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteMessage = (id) => async dispatch => {
  console.log(id)
  let token = authToken().token;
  try {
    let data = await fetch(`${API}/message/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });
    data = await data.json();
    
    if(data.messageDeleted){
      dispatch({type: MESSAGE_DELETED, payload: data.messageDeleted})
    } if(data.error){
      dispatch({type: MESSAGE_ERROR, payload: data.error})
    }
       
  } catch (error) {
    console.log(error);
  }
}
export const resetMessageStatus = (val) => async dispatch => {
  dispatch({type: MESSAGE_DELETED, payload: val})
  dispatch({type: MESSAGE_ERROR, payload: val})
  dispatch({type: MESSAGE_ARCHIVED, payload: val})
}

export const updateMessageStatus = (message) => async dispatch => {
  let token = authToken().token;
  console.log(message)

  let statusUpdate = await fetch(`${API}/message/update/${message}`,{
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    }

  })
  statusUpdate = await statusUpdate.json()

  console.log(statusUpdate);
  if(statusUpdate.messageStatus){
    getMessages()
  }
};

export const getProducts = () => async dispatch => {};

export const getOrders = () => async dispatch => {};

export const createProduct = () => async dispatch => {};

export const createCategory = () => async dispatch => {};

export const updateUserInfo = () => async dispatch => {};
