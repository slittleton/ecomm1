import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { getCartItems } from "../../actions/cartActions";

const Cart = props => {
  const [checkoutStatus, setCheckoutStatus] = useState(false);

  useEffect(() => {
    props.getCartItems();
  }, []);

  const cartItemsView = () => {
    if (props.cart) {
      return (
        <div className="cart-items-view">
          {props.cart.map(item => {
            return (
              <div className="box small-pad" key={item.product._id}>
                <div className="subtitle">Item: {item.product.name}</div>
                <div className="subtitle">Price: ${item.product.price.toFixed(2)}</div>
                <div>
                <div className="subtitle">Quantity 

                  <button className="btn">{`<`}</button>
                  {item.count}
                  <button className="btn">{`>`}</button>
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
    if(props.cart){
      let prices = [];
      props.cart.forEach((item)=>{
        prices.push(item.product.price)
      })
      return (prices.reduce((acc, curVal)=> acc+curVal)).toFixed(2)
    }
  }
  const beginCheckout = () => {
    // check for auth token

    // if no auth token then ask user to sign in
  }

  return (
    <div className="cart">
      <Layout title="Cart" description={`Welcome To Your Cart`}>
        <div className="box">{cartItemsView()}</div>
        <div className="title">
          Total: ${cartTotal()}
          <button className="btn center" onClick={beginCheckout}>Begin Checkout</button>
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
