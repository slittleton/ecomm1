import {SET_CART_ITEMS, ADD_TO_CART, DEL_FROM_CART, EMPTY_CART, CART_ERROR} from "../actions/actionTypes";

const INITIAL_STATE = {
  cartItems: null,
  error: null,
};

export default(state = INITIAL_STATE, action) =>{
  switch(action.type) {
    case SET_CART_ITEMS:
      return{
        ...state,
        cartItems: action.payload
      }
    case ADD_TO_CART:
      return{
        ...state,
        cartItems: action.payload
      }
    case DEL_FROM_CART:
      return{
        ...state,
        cartItems: action.payload
      }
    case EMPTY_CART:
      return{
        ...state,
        cartItems: action.payload
      }
    case CART_ERROR:
      return{
        ...state,
        error: action.payload
      }
    default: return state;
  }
}