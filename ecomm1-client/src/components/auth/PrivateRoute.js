import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authToken } from "../../actions/authMethods";
import { connect } from "react-redux";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;

  const userTest = ()=> {
    if (props.user) {
      return props.user.userId;
    } return null
  }
  return (
  <Route
    {...rest}
    render={props =>
      authToken() && userTest() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />)
  }
  const mapStateToProps = state => {
    console.log("PRIVATE ROUTE", state);
    return {
      user: state.authReducer
    };
  };
  export default connect(
    mapStateToProps,
    null
  )(PrivateRoute);
