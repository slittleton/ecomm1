import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactReducer from './contactReducer';


export default combineReducers ({
  authReducer: authReducer,
  contactReducer: contactReducer,
})