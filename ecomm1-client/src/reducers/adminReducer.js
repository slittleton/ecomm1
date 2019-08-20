import { ADMIN_ERROR, ADMIN_ACTION_SUCCESS, ORDERS_BUNDLE } from "../actions/actionTypes";

const INITIAL_STATE = {
  actionStatus: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADMIN_ACTION_SUCCESS:
      return {
        ...state,
        actionStatus: action.payload
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ORDERS_BUNDLE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
