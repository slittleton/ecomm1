import React, { useState, useEffect } from "react";
import { authToken } from "../../actions/authMethods";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddressForm from "../account/AddressForm";
import { getBraintreeClientToken, processPayment } from "../../actions/paymentActions";
import DropIn from "braintree-web-drop-in-react";

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

  const checkoutInfo = () => {
    if (props.auth.userAddress) {
      return (
        <div>
          <div className="center subtitle medium-margin">Current Address</div>
          <AddressForm />
          {/* {paymentOptions()} */}
        </div>
      );
    } else {
      return (
        <div>
          <div className="title">
            Please Enter Address To Proceed with Checkout
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
      return <div>NOT HELLO {JSON.stringify(props.orderReducer)}</div>;
    }
  };

  const buyItems = () => {
    let nonce;
    let getNonce = values.instance
      .requestPaymentMethod()
      .then(info => {
        console.log("NONCE INFO", info);
        nonce = info.nonce;
        console.log("Nonce", nonce)
        const total = cartTotal();

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: total
        }
        props.processPayment(paymentData)

      })
      .catch(error => {
        console.log("Dropin Error", error);
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
          {paymentOptions()}
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
    braintreeToken: state.orderReducer.braintreeToken
  };
};
export default connect(
  mapStateToProps,
  { getBraintreeClientToken, processPayment }
)(Checkout);
