import {
  EMPTY_CART,
  USER_SETTINGS_ERROR,
  USER_SETTINGS_SUCCESS,
  SET_BRAINTREE_TOKEN,
  SET_PAYMENT_RESPONSE,
  SET_ORDERS_BUNDLE,
  SET_ORDER_STATUS_LIST,
  ORDER_STATUS_UPDATED
} from "./actionTypes";

import { authToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

// CREATE ORDER =======================================================
export const createOrder = (orderInfo, orderTotal) => async dispatch => {
  const token = authToken().token;
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

// GET LIST OF ALL ORDERS ====================================================
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

// GET LIST OF ALL ORDER STATUS TYPES ====================================================
export const getOrderStatusList = () => async dispatch => {
  let token = authToken().token;
  try {
    let data = await fetch(`${API}/order/statuslist`, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
    data = await data.json();
    console.log("ORDERS", data)
    dispatch({ type: SET_ORDER_STATUS_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// UPDATE STATUS OF AN ORDER ====================================================
export const updateOrderStatus = (id, orderStatus) => async dispatch => {
  const token = authToken().token;

  let orderData = await fetch(`${API}/order/${id}/status`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({orderStatus})
  });
  orderData = await orderData.json();

  if(orderData.ok){
    dispatch({type: ORDER_STATUS_UPDATED, payload: true})
    dispatch({type: USER_SETTINGS_SUCCESS, payload: `Order ${id} Status Updated Successfully`})
  }
  if(orderData.error){
    dispatch({type: USER_SETTINGS_ERROR, payload: orderData.error})
  }
};

// RESET ORDER STATUS IN REDUX STORE - after order status has been updated ========================
export const resetOrderStatus = (id, orderStatus) => async dispatch => {
    dispatch({type: ORDER_STATUS_UPDATED, payload: false})
};


