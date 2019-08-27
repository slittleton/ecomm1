import {SET_BRAINTREE_TOKEN, SET_PAYMENT_RESPONSE, SET_ORDERS_BUNDLE, SET_ORDER_CREATION_STATUS} from "../actions/actionTypes";

const INITIAL_STATE = {
  braintreeToken: null,
  paymentResponse: null,
  ordersBundle: null
};

export default(state = INITIAL_STATE, action) =>{
  switch(action.type) {
    case SET_BRAINTREE_TOKEN:
      return{
        ...state,
        braintreeToken: action.payload
      };
    case SET_PAYMENT_RESPONSE:
      return{
        ...state,
        paymentResponse: action.payload
      };
    case SET_ORDERS_BUNDLE:
      return{
        ...state,
        ordersBundle: action.payload
      };
    default: return state;
  }
}