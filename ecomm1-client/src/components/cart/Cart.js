import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { getCartItems } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import ProductPhoto from "../product/ProductPhoto";
import CartItems from "./CartItems";

const Cart = props => {
  const [checkoutStatus, setCheckoutStatus] = useState(false);

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
