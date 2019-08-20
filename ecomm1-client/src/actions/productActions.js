import {
  SET_PRODUCTS_BUNDLE,
  SET_CATEGORIES,
  PRODUCT_ERROR,
  PRODUCT_SEARCH_RESULTS,
  PRODUCT_SEARCH_SUCCESS
} from "./actionTypes";
import queryString from "query-string";

const API = process.env.REACT_APP_API_URL;

// GET PRODUCTS ======================================================
export const getProducts = () => async dispatch => {
  let data = await fetch(`${API}/products`, {
    method: "GET"
  });
  data = await data.json();

  dispatch({ type: SET_PRODUCTS_BUNDLE, payload: data });
};

export const getProduct = () => async dispatch => {};
export const getCategories = () => async dispatch => {
  let data = await fetch(`${API}/categories`, {
    method: "GET"
  });
  data = await data.json();

  dispatch({ type: SET_CATEGORIES, payload: data });
};

// SEARCH FOR PRODUCTS =====================================================
export const searchForProducts = searchCriteria => async dispatch => {
  // ensure price range is a number
  if (
    searchCriteria.priceRange.minRange === "" ||
    isNaN(searchCriteria.priceRange.minRange)
  ) {
    searchCriteria.priceRange.minRange = 0;
  }
  if (
    searchCriteria.priceRange.minRange >= 0 &&
    (searchCriteria.priceRange.maxRange === null ||
      searchCriteria.priceRange.maxRange === "" ||
      isNaN(searchCriteria.priceRange.maxRange))
  ) {
    searchCriteria.priceRange.maxRange = 999999999;
  }
  // Create search query object
  const searchQuery = {
    searchTerm: searchCriteria.searchTerm,
    category: [...searchCriteria.filteredByCategory],
    price: [
      searchCriteria.priceRange.minRange,
      searchCriteria.priceRange.maxRange
    ]
  };

  const query = queryString.stringify(searchQuery);
  // Make API Call
  let response = await fetch(`${API}/products/search?${query}`, {
    method: "GET"
  });
  response = await response.json();

  if (response.error) {
    dispatch({ type: PRODUCT_ERROR, payload: response.error });
  }

  if (response.products) {
    if (response.products.length === 0) {
      dispatch({
        type: PRODUCT_ERROR,
        payload:
          "Sorry, No Products Fitting The Search Criteria Were Found, Please Try Another Search"
      });
      dispatch({ type: SET_PRODUCTS_BUNDLE, payload: [] });
    }
    dispatch({ type: PRODUCT_SEARCH_RESULTS, payload: response.products });
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: true });
  }
};
// RESET SEARCH STATUS ============================================================
export const resetSearchStatus = type => async dispatch => {
  if (type === "error") {
    dispatch({ type: PRODUCT_ERROR, payload: null });
  }
  if (type === "success") {
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: null });
  }
};


// export const addToCart = () => async dispatch => {};
// export const addToCart = () => async dispatch => {};
// export const addToCart = () => async dispatch => {};
