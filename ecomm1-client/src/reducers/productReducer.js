import { SET_PRODUCTS_BUNDLE } from "../actions/actionTypes";

const INITIAL_STATE = {
  productsBundle: null,
  product: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS_BUNDLE:
      return {
        ...state,
        productsBundle: action.payload
      };
    default:
      return state;
  }
};
