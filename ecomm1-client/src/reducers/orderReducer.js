import {
  SET_BRAINTREE_TOKEN,
  SET_PAYMENT_RESPONSE,
  SET_ORDERS_BUNDLE,
  SET_ORDER_STATUS_LIST,
  ORDER_STATUS_UPDATED
} from "../actions/actionTypes";

const INITIAL_STATE = {
  braintreeToken: null,
  paymentResponse: null,
  ordersBundle: null,
  orderStatusList: null,
  orderStatusUpdated: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BRAINTREE_TOKEN:
      return {
        ...state,
        braintreeToken: action.payload
      };
    case SET_PAYMENT_RESPONSE:
      return {
        ...state,
        paymentResponse: action.payload
      };
    case SET_ORDERS_BUNDLE:
      return {
        ...state,
        ordersBundle: action.payload
      };
    case SET_ORDER_STATUS_LIST:
      return {
        ...state,
        orderStatusList: action.payload
      };
    case ORDER_STATUS_UPDATED:
      return {
        ...state,
        orderStatusUpdated: action.payload
      };
    default:
      return state;
  }
};
