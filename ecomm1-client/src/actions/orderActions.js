import {
  SET_CART_ITEMS,
  ADD_TO_CART,
  DEL_FROM_CART,
  EMPTY_CART,
  CART_ERROR,
  USER_SETTINGS_ERROR,
  USER_SETTINGS_SUCCESS
} from "./actionTypes";

import { authToken, saveToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

// CREATE ORDER =======================================================
export const createOrder = (orderInfo, orderTotal) => async dispatch => {
  const token = authToken().token;
  console.log("ATTEMPT CREATE ORDER")
  let orderData = await fetch(`${API}/order/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ order: orderInfo, orderTotal: orderTotal })
  });
  orderData = await orderData.json();
  console.log("ORDER DATA", orderData);

  // IF SUCCESS CLEAR CART 
  if(orderData.data){
    dispatch({ type: EMPTY_CART });
    dispatch({ type: USER_SETTINGS_SUCCESS, payload: "Order Made Successfully" });
  }

  // ELSE SET ERROR MESSAGE
  // TODO SAVE ERROR MESSAGE AND SEND TO ADMIN
  if (orderData.error) {
    dispatch({ type: USER_SETTINGS_ERROR, payload: orderData.error });
  }
};

export const getOrders = () => async dispatch => {};

export const updateOrder = () => async dispatch => {};
export const deleteOrder = () => async dispatch => {};
