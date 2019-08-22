import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  SET_SIGNIN_STATUS,
  AUTH_ERROR,
  USER_SETTINGS_SUCCESS,
  USER_SETTINGS_ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {
  signInStatus: true,
  isAdmin: true,
  userId: "5d4f55a44955e7384898f522",
  userEmail: "admin@email.com",
  userName: "admin",
  userAddress: null,
  error: null,
  userSettingsSuccess: null,
  userSettingsError: null
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
    case USER_SETTINGS_SUCCESS:
      return {
        ...state,
        userSettingsSuccess: action.payload
      };
    case USER_SETTINGS_ERROR:
      return {
        ...state,
        userSettingsError: action.payload
      };
    default:
      return state;
  }
};
