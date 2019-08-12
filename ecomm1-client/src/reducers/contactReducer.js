import { MESSAGE_SUCCESS, MESSAGE_ERROR } from "../actions/actionTypes";

const INITIAL_STATE = {
  messageData: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return {
        ...state,
        messageData: action.payload
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
