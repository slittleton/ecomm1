import React, { useState, useEffect } from "react";
import { authToken } from "../../actions/authMethods";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddressForm from "../account/AddressForm";
import {
  getBraintreeClientToken,
  processPayment
} from "../../actions/paymentActions";
import DropIn from "braintree-web-drop-in-react";
import UserActionMessage from "../account/UserActionMessage";
import {
  setUserSettingsError,
  setUserSettingsSuccess
} from "../../actions/userActions";
import { createOrder } from "../../actions/orderActions";
import { emptyCart } from "../../actions/cartActions";

const Checkout = props => {
  const [values, setValues] = useState({
    loading: false,
    instance: {},
    clientToken: null
  });
  const { loading, clientToken } = values;

  useEffect(() => {
    if (props.auth.userId) {
      props.getBraintreeClientToken(props.auth.userId);
    }
  }, []);

  useEffect(() => {
    if (props.braintreeToken) {
      setValues({ ...values, clientToken: props.braintreeToken.clientToken });
    }
  }, [props.braintreeToken]);

  useEffect(() => {
    if (props.paymentResponse) {
      if (props.paymentResponse.success) {
        props.setUserSettingsSuccess("Payment Successful");
        props.createOrder(props.cart, props.paymentResponse.transaction.amount);
      }
      if (props.paymentResponse.error) {
        props.setUserSettingsError(
          "Payment Error, please try again or contact customer service"
        );
      }
    }
  }, [props.paymentResponse]);

  const checkoutInfo = () => {
    if (props.auth.userAddress) {
      return (
        <div>
          <div className="center subtitle medium-margin">You Can Change Your Address Here</div>
          <div className="center subtitle medium-margin">Or Proceed With Checkout Below</div>
          <AddressForm />
          {paymentOptions()}
        </div>
      );
    } else {
      return (
        <div>
          <div className="title">To Proceed With Checkout</div>
          <div className="title">
            Make Sure To Add An Address To Your Account
          </div>
          <AddressForm />
        </div>
      );
    }
  };

  const paymentOptions = () => {
    if (clientToken && props.cart && props.cart.length > 0) {
      return (
        <div className="box center" style={{ backgroundColor: "white" }}>
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instance => (values.instance = instance)}
          />
          <div className="medium-pad">
            <button
              className="btn tiny-pad"
              style={{ backgroundColor: "rgb(15, 212, 0)", color: "black" }}
              onClick={buyItems}
            >
              Complete Payment
            </button>
          </div>
        </div>
      );
    } else {
      return <div className="title center box small-pad">Currently There Are No Items In Your Cart To Purchase</div>;
    }
  };

  const buyItems = () => {
    let nonce;
    let getNonce = values.instance
      .requestPaymentMethod()
      .then(info => {
        nonce = info.nonce;
        const total = cartTotal();
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: total
        };
        props.processPayment(paymentData);
      })
      .catch(error => {
        props.setUserSettingsError(error.message);
      });
  };

  const cartTotal = () => {
    if (props.cart) {
      let prices = [];
      props.cart.forEach(item => {
        let cost = parseInt(item.count) * parseInt(item.product.price);
        prices.push(cost);
      });
      return prices.reduce((acc, curVal) => acc + curVal).toFixed(2);
    }
  };

  return (
    <div className="checkout box">
      {props.auth.signInStatus ? (
        <div>
          {checkoutInfo()}
          <UserActionMessage />
        </div>
      ) : (
        <div className="subtitle medium-margin">
          Please <Link to="/signin">Sign In</Link> To Complete Checkout
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cartReducer.cartItems,
    auth: state.authReducer,
    braintreeToken: state.orderReducer.braintreeToken,
    paymentResponse: state.orderReducer.paymentResponse
  };
};
export default connect(
  mapStateToProps,
  {
    getBraintreeClientToken,
    processPayment,
    setUserSettingsError,
    setUserSettingsSuccess,
    createOrder,
    emptyCart
  }
)(Checkout);
