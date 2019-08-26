import {SET_BRAINTREE_TOKEN} from "../actions/actionTypes";

const INITIAL_STATE = {
  braintreeToken: null,

};

export default(state = INITIAL_STATE, action) =>{
  switch(action.type) {
    case SET_BRAINTREE_TOKEN:
      return{
        ...state,
        braintreeToken: action.payload
      }
    default: return state;
  }
}