import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactReducer from './contactReducer';
import productReducer from './productReducer';
import adminReducer from './adminReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';


export default combineReducers ({
  authReducer: authReducer,
  contactReducer: contactReducer,
  productReducer: productReducer,
  adminReducer: adminReducer,
  cartReducer: cartReducer,
  orderReducer: orderReducer,
})