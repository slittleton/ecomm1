import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCartItems, delFromCart } from "../../actions/cartActions";
import ProductPhoto from "../product/ProductPhoto";
import CartItemQuantity from './CartItemQuantity';

const CartItems = props => {

  useEffect(() => {
    props.getCartItems();
  }, []);

  const cartTotal = () => {
    if (props.cart) {
      let prices = [];
      props.cart.forEach(item => {
        prices.push(item.product.price);
      });
      return prices.reduce((acc, curVal) => acc + curVal).toFixed(2);
    }
  };
  const delCartItem = id => () => {
    props.delFromCart(id);
  };


  if (props.cart) {
    return (
      <div className="cart-items-view darkgray-back box">
        <div className="subtitle center medium-margin">Cart Items</div>
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
                  <CartItemQuantity count={item.count} id={item.product._id}/>
                  <button
                    className="cart-btn"
                    onClick={delCartItem(item.product._id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="title">Total: ${cartTotal()}</div>
      </div>
    );
  } else {
    return <div className="subtitle small-pad">No Items Are In Your Cart</div>;
  }
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
  { getCartItems, delFromCart }
)(CartItems);
