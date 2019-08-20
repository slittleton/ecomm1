import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactReducer from './contactReducer';
import productReducer from './productReducer';
import adminReducer from './adminReducer';


export default combineReducers ({
  authReducer: authReducer,
  contactReducer: contactReducer,
  productReducer: productReducer,
  adminReducer: adminReducer,
})