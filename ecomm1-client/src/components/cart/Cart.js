import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { getCartItems } from "../../actions/cartActions";

import Checkout from "./Checkout";
import CartItems from "./CartItems";

const Cart = props => {
  
  useEffect(() => {
    props.getCartItems();
  }, []);

  return (
    <div className="cart">
      <Layout title="Cart" description={`Welcome To Your Cart`}>
        <div className="cart-layout">
          <CartItems />
          <Checkout />
        </div>
      </Layout>
      <div className="devmode">
        <div className="devmode-cart">
          You Cannot Actually Buy Anything. However, you can see the payment
          process function using the following FAKE CREDIT CARD INFO
        </div>
        <div className="devmode-cart">
          4111 1111 1111 1111, expiration 11/22, cvv 111
        </div>
        <div className="devmode-title">
          This Website Is Only A Demonstration
        </div>

        <div className="devmode-text">
          The default sign in is set to an admin username and password. You can
          create a normal user and sign in that way by clicking Sign Up
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  console.log("CART STATE", state);
  return {
    cart: state.cartReducer.cartItems,
    error: state.cartReducer.error
  };
};
export default connect(
  mapStateToProps,
  { getCartItems }
)(Cart);
