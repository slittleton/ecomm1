import { USER_SETTINGS_SUCCESS, USER_SETTINGS_ERROR } from "./actionTypes";
import { saveToken, authToken } from "./authMethods";
const API = process.env.REACT_APP_API_URL;

export const updateUserInfo = (info, _id) => async dispatch => {
  console.log(info, _id);

  let token = authToken().token;

  let updatedUser = await fetch(`${API}/user/update/${_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: token
    },
    body: info
  });

  updatedUser = await updatedUser.json();

  console.log(updatedUser);

  // if (updatedUser) {
  //   dispatch({ type: USER_SETTINGS_SUCCESS, payload: updatedUser.message });
  // }
  // if (updatedUser.error) {
  //   dispatch({ type: USER_SETTINGS_ERROR, payload: updatedUser.error });
  // }
};
export const getUserOrders = id => async dispatch => {};
