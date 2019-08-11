import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  SET_SIGNIN_STATUS,
  AUTH_ERROR
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
    case SIGN_OUT_USER:
      return {
        ...state,
        signInStatus: false,
        isAdmin: false,
        userId: null,
        userEmail: null,
        userName: null,
        userAddress: null,
        error: null
      };

    case SET_SIGNIN_STATUS:
      return {
        ...state,
        signInStatus: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
