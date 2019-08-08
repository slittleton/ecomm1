import {SIGN_UP_USER, SIGN_IN_USER} from '../actions/actionTypes';

const INITIAL_STATE = {
  signInStatus: false,
  isAdmin: false,
  userId: null,
  userName: null,
  userAddress: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      const user = action.payload
      return {
        ...state,
        // isAdmin: user.isAdmin,
        // userId: user.userId,
        userName: user.name,
      };
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
