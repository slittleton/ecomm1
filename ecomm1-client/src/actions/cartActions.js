import {
  SET_CART_ITEMS,
  ADD_TO_CART,
  DEL_FROM_CART,
  EMPTY_CART,
  CART_ERROR
} from "./actionTypes";

import { authToken, saveToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

// GET CART ITEMS ==============================================
export const getCartItems = () => async dispatch => {
  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({ type: SET_CART_ITEMS, payload: cart });
  }
};
// ADD TO CART ==============================================
export const addToCart = product => async dispatch => {
  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  // Check to see if product is already in cart
  let cartIds = [];
  if (cart.length > 0) {
    cart.forEach(item => {
      cartIds.push(item.product._id);
    });
  }
  // set info message that item already in cart
  if (cartIds.includes(product._id)) {
    dispatch({ type: CART_ERROR, payload: "Item Already In Cart" });
  } else {
    cart.push({ product, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: SET_CART_ITEMS, payload: cart });
  }
};
// ADJUST ITEM QUANTITY ========================================
export const adjustCount = (quantity, id) => async dispatch => {
  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  if(cart.length> 0){
    cart.forEach(item => {
      if (item.product._id === id) {
        item.count = quantity;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  
    dispatch({ type: SET_CART_ITEMS, payload: cart });
  } else{
    dispatch({ type: EMPTY_CART });
  }

};

// DELETE ITEM FROM CART =====================================
export const delFromCart = id => async dispatch => {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  cart = cart.filter(item => id !== item.product._id);

  localStorage.setItem("cart", JSON.stringify(cart));

  dispatch({ type: SET_CART_ITEMS, payload: cart });
};

// DELETE ALL ITEMS FROM CART ================================
export const emptyCart = () => async dispatch => {
  localStorage.removeItem("cart");
  dispatch({ type: SET_CART_ITEMS, payload: null });
};


