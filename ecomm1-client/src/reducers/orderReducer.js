import {SET_BRAINTREE_TOKEN, SET_PAYMENT_RESPONSE} from "../actions/actionTypes";

const INITIAL_STATE = {
  braintreeToken: null,
  paymentResponse: null,
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
    default: return state;
  }
}