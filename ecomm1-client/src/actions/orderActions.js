
import {
  SET_CART_ITEMS,
  ADD_TO_CART,
  DEL_FROM_CART,
  EMPTY_CART,
  CART_ERROR
} from "./actionTypes";

import { authToken, saveToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

// CREATE ORDER =======================================================
export const createOrder = (orderInfo, userId) => async dispatch => {
  const token = authToken().token;

  console.log('CREATE ORDER', token)
  //   return fetch(`${API}/order/create/${userId}`, {
  //     method: "POST",
  //     headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({ order: createOrderData })
  // })
  //     .then(response => {
  //         return response.json();
  //     })
  //     .catch(err => console.log(err));
};


export const getOrders = () => async dispatch => {};

export const updateOrder = () => async dispatch => {};
export const deleteOrder = () => async dispatch => {};