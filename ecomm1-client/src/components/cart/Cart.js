import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { getCartItems } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import ProductPhoto from "../product/ProductPhoto";

const Cart = props => {
  const [checkoutStatus, setCheckoutStatus] = useState(false);

  useEffect(() => {
    props.getCartItems();
  }, []);

  const cartItemsView = () => {
    if (props.cart) {
      return (
        <div className="cart-items-view">
          {props.cart.map((item, index) => {
            return (
              <div className="box small-pad spacer" key={item.product._id}>
                <div className="checkout-item ">
                  <div className="tiny-pad small-font">{`(${index + 1})`}</div>
                  <ProductPhoto
                    product={item.product}
                    imageStyling="img-thumb margin-right-small"
                  />
                  <div className="margin-left-small">
                    <div className="">Item: {item.product.name}</div>
                    <div className="">
                      Price: ${item.product.price.toFixed(2)}
                    </div>
                    <div>{`Quantity ${item.count} `}</div>
                    <button className="">Remove Item</button>
                  </div>
                  
                </div>

               
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="subtitle small-pad">No Items Are In Your Cart</div>
      );
    }
  };

  const cartTotal = () => {
    if (props.cart) {
      let prices = [];
      props.cart.forEach(item => {
        prices.push(item.product.price);
      });
      return prices.reduce((acc, curVal) => acc + curVal).toFixed(2);
    }
  };

  return (
    <div className="cart">
      <Layout title="Cart" description={`Welcome To Your Cart`}>
        <div className="cart-layout box">
          <div className="cart-items">
            <div className="box">
              {cartItemsView()}
              <div className="title">Total: ${cartTotal()}</div>
            </div>
          </div>
          <div className="checkout">
            <Checkout />
          </div>
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
