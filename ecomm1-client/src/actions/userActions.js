import { USER_SETTINGS_SUCCESS, USER_SETTINGS_ERROR } from "./actionTypes";
import { saveToken, authToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

export const updateUserInfo = (info, _id) => async dispatch => {
  console.log(info, _id);

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

  console.log(updatedUser);

  if (updatedUser) {
    dispatch({ type: USER_SETTINGS_SUCCESS, payload: updatedUser.message });
  }
  if (updatedUser.error) {
    dispatch({ type: USER_SETTINGS_ERROR, payload: updatedUser.error });
  }
};
export const setUserSettingsError = errorMsg => async dispatch => {
  dispatch({ type: USER_SETTINGS_ERROR, payload: errorMsg })
}
export const setUserSettingsSuccess = successMsg => async dispatch => {
  dispatch({ type: USER_SETTINGS_SUCCESS, payload: successMsg })
}
export const getUserOrders = id => async dispatch => {};
