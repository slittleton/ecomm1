import {SIGN_UP_USER, SIGN_IN_USER, AUTH_ERROR, SET_SIGNIN_STATUS} from '../actions/actionTypes';

const INITIAL_STATE = {
  signInStatus: false,
  isAdmin: false,
  userId: null,
  userName: null,
  userAddress: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      const user = action.payload
      return {
        ...state,
        isAdmin: user.isAdmin,
        userId: user._id,
        userName: user.name,
        signInStatus: true,
      };
      case AUTH_ERROR:
        return{
          ...state,
          error: action.payload,
          signInStatus: false,
        }
    case SIGN_IN_USER:
      return {
        ...state,
        signInStatus: true,
        isAdmin: action.payload.isAdmin,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };
      case SET_SIGNIN_STATUS:
        console.log(action.payload)
        return {
          ...state,
          signInStatus: false,
        }
    default:
      return state;
  }
};
