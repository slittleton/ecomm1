
import {
  SET_PRODUCTS_BUNDLE, 
  SET_CATEGORIES,
  PRODUCT_ERROR,
  PRODUCT_SEARCH_RESULTS,
  PRODUCT_SEARCH_SUCCESS
} from "./actionTypes";
import queryString from 'query-string';
const API = process.env.REACT_APP_API_URL;


export const getProducts = () => async dispatch => {
  let data = await fetch(`${API}/products`, {
    method: "GET",
  });
  data = await data.json();

  // console.log(data);
  dispatch({type: SET_PRODUCTS_BUNDLE, payload: data})
};

export const getProduct = () => async dispatch => {};
export const getCategories = () => async dispatch => {

  let data = await fetch(`${API}/categories`, {
    method: "GET",
  });
  data = await data.json();

  // console.log(data);
  dispatch({type: SET_CATEGORIES, payload: data})
};

export const searchForProducts = (searchParam) => async dispatch => {



  const query = queryString.stringify({search:searchParam})
  console.log('QUERY', query);

  let response = await fetch(`${API}/products/search?${query}`, {
    method: "GET",
  });
  response = await response.json();

  if(response.error){
    // console.log(response.error)
    dispatch({type: PRODUCT_ERROR, payload: response.error})
  }
  if(response.products){
    // console.log(response.products)
    dispatch({type: PRODUCT_SEARCH_RESULTS, payload: response.products})
    dispatch({type: PRODUCT_SEARCH_SUCCESS, payload: true})
  }
};

export const resetSearchStatus = (type) => async dispatch => {
  if(type === 'error'){
    dispatch({type: PRODUCT_ERROR, payload: null})
  }
  if(type === 'success'){
    dispatch({type: PRODUCT_SEARCH_SUCCESS, payload: null})
  }
};


export const filterByCategory = () => async dispatch => {};
export const filterByPrice = () => async dispatch => {};

export const addToCart = () => async dispatch => {};