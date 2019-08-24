import {
  USER_SETTINGS_SUCCESS,
  USER_SETTINGS_ERROR,
  SET_USER_DATA
} from "./actionTypes";
import { saveToken, authToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

// UPDATE USER INFO ==================================================
export const updateUserInfo = (info, _id) => async dispatch => {
  let token = authToken().token;

  let updatedUser = await fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(info)
  });

  updatedUser = await updatedUser.json();

  if (updatedUser.addressUpdated) {
    dispatch({ type: USER_SETTINGS_SUCCESS, payload: updatedUser.addressUpdated.message });
  }
  if (updatedUser.error) {
    dispatch({ type: USER_SETTINGS_ERROR, payload: updatedUser.error });
  }
  if (updatedUser.passwordUpdate) {
    dispatch({
      type: USER_SETTINGS_SUCCESS,
      payload: updatedUser.passwordUpdate.message
    });
  }
};
// SET ERROR MESSAGE ==================================================
export const setUserSettingsError = errorMsg => async dispatch => {
  dispatch({ type: USER_SETTINGS_ERROR, payload: errorMsg });
};
// SET SUCCESS MESSAGE
export const setUserSettingsSuccess = successMsg => async dispatch => {
  dispatch({ type: USER_SETTINGS_SUCCESS, payload: successMsg });
};
// GET USER INFO ======================================================

export const getUserInfo = id => async dispatch => {
  let token = authToken().token;

  let userInfo = await fetch(`${API}/userprofile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
    }
  });

  userInfo = await userInfo.json();
  console.log("USER INFO", userInfo);

  dispatch({ type: SET_USER_DATA, payload: userInfo });
};

export const getUserOrders = id => async dispatch => {};
// export const getUserOrders = id => async dispatch => {};
// export const getUserOrders = id => async dispatch => {};
// export const getUserOrders = id => async dispatch => {};
