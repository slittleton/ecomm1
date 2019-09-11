import {
  SET_BRAINTREE_TOKEN,
  SET_PAYMENT_RESPONSE,
  USER_SETTINGS_ERROR
} from "./actionTypes";

import { authToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

// GET BRAINTREE CLIENT TOKEN ========================================

export const getBraintreeClientToken = userId => async dispatch => {
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
    dispatch({ type: SET_BRAINTREE_TOKEN, payload: clientToken.response });
  } catch (error) {
    console.log(error);
  }
};

// PROCESS PAYMENT =================================================
export const processPayment = paymentData => async dispatch => {
  let token = authToken().token;
  try {
    let data = await fetch(`${API}/braintree/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(paymentData)
    });
    data = await data.json();

    dispatch({ type: SET_PAYMENT_RESPONSE, payload: data });
  } catch (error) {
    dispatch({ type: USER_SETTINGS_ERROR, payload: error });
  }
};
