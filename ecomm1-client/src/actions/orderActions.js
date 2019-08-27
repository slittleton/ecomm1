import {
  EMPTY_CART,
  USER_SETTINGS_ERROR,
  USER_SETTINGS_SUCCESS,
  SET_BRAINTREE_TOKEN,
  SET_PAYMENT_RESPONSE,
  SET_ORDERS_BUNDLE
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
    dispatch({ type: SET_PAYMENT_RESPONSE, payload: null})
    dispatch({ type: SET_BRAINTREE_TOKEN, payload: null})
       localStorage.removeItem("cart");
  }

  // ELSE SET ERROR MESSAGE
  // TODO SAVE ERROR MESSAGE AND SEND TO ADMIN
  if (orderData.error) {
    dispatch({ type: USER_SETTINGS_ERROR, payload: orderData.error });
  }
};

export const getOrders = () => async dispatch => {
  let token = authToken().token;
  try {
    let data = await fetch(`${API}/orders`, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
    data = await data.json();
    console.log("ORDERS", data)
    dispatch({ type: SET_ORDERS_BUNDLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = () => async dispatch => {};
export const deleteOrder = () => async dispatch => {};
