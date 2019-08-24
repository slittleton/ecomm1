import {
  SET_CART_ITEMS,
  ADD_TO_CART,
  DEL_FROM_CART,
  EMPTY_CART,
  CART_ERROR
} from "./actionTypes";

export const getCartItems = () => async dispatch => {
  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({ type: SET_CART_ITEMS, payload: cart });
  }
};

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
    console.log("ACTION CART", cart);
    dispatch({ type: SET_CART_ITEMS, payload: cart });
  }
};

export const adjustCount = (quantity, id) => async dispatch => {

  console.log('QUANTITY', quantity, id)
};

export const delFromCart = id => async dispatch => {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  cart = cart.filter(item => id !== item.product._id);

  localStorage.setItem("cart", JSON.stringify(cart));

  dispatch({ type: SET_CART_ITEMS, payload: cart });
};

export const emptyCart = () => async dispatch => {
  localStorage.removeItem("cart")
  dispatch({ type: SET_CART_ITEMS, payload: null });
};
