import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authToken } from "../../actions/authMethods";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;

  const userTest = ()=> {
    if (props.user) {
      return props.user._id;
    } return false
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

export default PrivateRoute;
