
import {
  SET_PRODUCTS_BUNDLE
} from "./actionTypes";
const API = process.env.REACT_APP_API_URL;


export const getProducts = () => async dispatch => {
  let data = await fetch(`${API}/products`, {
    method: "GET",
  });
  data = await data.json();

  console.log(data);
  dispatch({type: SET_PRODUCTS_BUNDLE, payload: data})
};

export const getProduct = () => async dispatch => {};
export const getCategories = () => async dispatch => {};
export const addToCart = () => async dispatch => {};
export const searchProducts = () => async dispatch => {};
export const filterByCategory = () => async dispatch => {};
export const filterByPrice = () => async dispatch => {};