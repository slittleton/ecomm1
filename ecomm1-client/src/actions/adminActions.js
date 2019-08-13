import {

} from "./actionTypes";
import {saveToken, authToken} from './authMethods';

const API = process.env.REACT_APP_API_URL;


export const getMessages = () => async dispatch => {
  let token = authToken().token
  console.log(token);
try {
  let data = await fetch(`${API}/messages`, {
    method: "GET",
    headers: {
      Authorization: token
    }
  });
  data = await data.json();
  console.log(data);


}
  catch(error){
    console.log(error);
  }


};
export const updateMessageStatus = () => async dispatch => {



};

export const getProducts = () => async dispatch => {

};

export const getOrders = () => async dispatch => {

};


export const createProduct = () => async dispatch => {

};

export const createCategory = () => async dispatch => {

};

export const updateUserInfo = () => async dispatch => {

};