import React, { useState, useEffect } from "react";
import { authToken } from "../../actions/authMethods";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddressForm from "../account/AddressForm";

const Checkout = props => {
  useEffect(() => {
    let token = authToken();
  });

  const checkoutInfo = () => {
    if (props.auth.userAddress) {
      return <div>
        <AddressForm />
        {paymentOptions}
      </div>;
    } else {
      return (
        <div>
          <div className="title">Please Enter Address To Proceed with Checkout</div>
          <AddressForm />
        </div>
      );
    }
  };

  const paymentOptions = () => {
  
  }

  return (
    <div className="checkout box">
      {props.auth.signInStatus ? (
        <div>{checkoutInfo()}</div>
      ) : (
        <div>
          <Link to="/signin">Sign In</Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cartReducer,
    auth: state.authReducer
  };
};
export default connect(
  mapStateToProps,
  {}
)(Checkout);
