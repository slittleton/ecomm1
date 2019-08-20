import {
  MESSAGES_BUNDLE,
  MESSAGE_DELETED,
  MESSAGE_ERROR,
  MESSAGE_ARCHIVED,
  ADMIN_ERROR,
  ADMIN_ACTION_SUCCESS
} from "./actionTypes";
import { saveToken, authToken } from "./authMethods";

const API = process.env.REACT_APP_API_URL;

// GET MESSAGES ========================================================
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
// DELETE MESSAGE ======================================================
export const deleteMessage = id => async dispatch => {
  let token = authToken().token;
  try {
    let data = await fetch(`${API}/message/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });
    data = await data.json();

    if (data.messageDeleted) {
      dispatch({ type: MESSAGE_DELETED, payload: data.messageDeleted });
    }
    if (data.error) {
      dispatch({ type: MESSAGE_ERROR, payload: data.error });
    }
  } catch (error) {
    console.log(error);
  }
};
// RESET MESSAGE STATUS ================================================
export const resetMessageStatus = val => async dispatch => {
  dispatch({ type: MESSAGE_DELETED, payload: val });
  dispatch({ type: MESSAGE_ERROR, payload: val });
  dispatch({ type: MESSAGE_ARCHIVED, payload: val });
};

// UPDATE MESSAGE STATUS =================================================
export const updateMessageStatus = message => async dispatch => {
  let token = authToken().token;

  let statusUpdate = await fetch(`${API}/message/update/${message}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  statusUpdate = await statusUpdate.json();

  if (statusUpdate.messageStatus) {
    dispatch({ type: MESSAGE_ARCHIVED, payload: statusUpdate.messageStatus });
  }
  if (statusUpdate.error) {
    dispatch({ type: MESSAGE_ERROR, payload: statusUpdate.error });
  }
};

// CREATE CATEGORY ===============================================================
export const createCategory = value => async dispatch => {
  let token = authToken().token;

  console.log("VALUE", value);
  let createdCategory = await fetch(`${API}/category/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ name: value })
  });

  createdCategory = await createdCategory.json();

  if (createdCategory._id) {
    dispatch({
      type: ADMIN_ACTION_SUCCESS,
      payload: { categoryCreated: createdCategory }
    });
  }
  if (createdCategory.error) {
    if (createdCategory.error.name === "MongoError") {
      let regEx = /\W*(duplicate key error)\W*/;
      if (createdCategory.error.errmsg.search(regEx)) {
      }
      dispatch({
        type: ADMIN_ERROR,
        payload: "Cannot Create: Category Already Exists"
      });
    } else {
      dispatch({ type: ADMIN_ERROR, payload: createdCategory.error });
    }
  }
};
// CREATE PRODUCT ================================================================
export const createProduct = product => async dispatch => {

  let token = authToken().token;

  let createdProduct = await fetch(`${API}/product/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: token
    },
    body: product
  });

  createdProduct = await createdProduct.json();
  

  console.log("CREATED PRODUCT", createdProduct)
  if(createdProduct._id){
    console.log("ID")
    dispatch({type: ADMIN_ACTION_SUCCESS, payload: {productCreated:createdProduct}})
  }
  if(createdProduct.error){
    dispatch({type: ADMIN_ERROR, payload: createdProduct.error})
  }

};

// SET ADMIN ERROR ================================================================
export const setAdminActionError = status => async dispatch => {
  if (status.error) {
    dispatch({ type: ADMIN_ERROR, payload: status.error });
  }
};
// RESET ADMIN ACTION STATUS =====================================================
export const resetAdminActionStatus = status => async dispatch => {
  dispatch({ type: ADMIN_ERROR, payload: status });
  dispatch({ type: ADMIN_ACTION_SUCCESS, payload: status });
};

export const getOrders = () => async dispatch => {};
export const updateOrder = () => async dispatch => {};

export const updateUserInfo = () => async dispatch => {};
