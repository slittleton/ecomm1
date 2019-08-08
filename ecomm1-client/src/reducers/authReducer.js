import {SIGN_UP_USER, SIGN_IN_USER, AUTH_ERROR} from '../actions/actionTypes';

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
        // isAdmin: user.isAdmin,
        userId: user._id,
        userName: user.name,
      };
      case AUTH_ERROR:
        return{
          ...state,
          error: action.payload
        }
    case SIGN_IN_USER:
      return {
        ...state,
        signInStatus: true,
        isAdmin: action.payload.isAdmin,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };
    default:
      return state;
  }
};
