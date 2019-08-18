import {
  SET_PRODUCTS_BUNDLE,
  SET_CATEGORIES,
  PRODUCT_SEARCH_RESULTS,
  PRODUCT_ERROR,
  PRODUCT_SEARCH_SUCCESS
} from "../actions/actionTypes";

const INITIAL_STATE = {
  productsBundle: null,
  product: null,
  categories: null,
  error: null,
  searchSuccess: null,
  searchResults: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS_BUNDLE:
      return {
        ...state,
        productsBundle: action.payload
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case PRODUCT_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        searchSuccess: action.payload
      };
    default:
      return state;
  }
};
