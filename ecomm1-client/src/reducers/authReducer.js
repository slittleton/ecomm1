import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  AUTH_ERROR,
  SET_SIGNIN_STATUS
} from "../actions/actionTypes";

const INITIAL_STATE = {
  signInStatus: false,
  isAdmin: false,
  userId: null,
  userEmail: null,
  userName: null,
  userAddress: null,
  error: null
};
let user = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      user = action.payload;
      return {
        ...state,
        isAdmin: user.isAdmin,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        signInStatus: true
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGN_IN_USER:
      user = action.payload;
      return {
        ...state,
        isAdmin: user.isAdmin,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        signInStatus: true
      };
    case SET_SIGNIN_STATUS:
      return {
        ...state,
        signInStatus: action.payload
      };
    default:
      return state;
  }
};
