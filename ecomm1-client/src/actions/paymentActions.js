import {
  SET_CART_ITEMS,
  ADD_TO_CART,
  DEL_FROM_CART,
  EMPTY_CART,
  CART_ERROR,
  SET_BRAINTREE_TOKEN
} from "./actionTypes";

import { authToken, saveToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

// GET BRAINTREE CLIENT TOKEN ========================================

export const getBraintreeClientToken = userId => async dispatch => {
 console.log('BRAINTREE ID',userId)
  let token = authToken().token;
  try {
    let clientToken = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    clientToken = await clientToken.json();

    console.log("BRAINTREE TOKEN", clientToken);
    dispatch({ type: SET_BRAINTREE_TOKEN, payload: clientToken.response });
  } catch (error) {
    console.log(error);
  }
};

// PROCESS PAYMENT =================================================
export const processPayment = (userId, paymentData) => async dispatch => {
  let token = authToken().token;
  try {
    let data = await fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(paymentData)
    });

    data = await data.json();

    console.log("BRAINTREE PAYMENT", data);
    // dispatch({ type: MESSAGES_BUNDLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
