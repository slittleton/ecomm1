import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authToken } from "../../actions/authMethods";
import { connect } from "react-redux";

const AdminRoute = props => {
  const { component: Component, ...rest } = props;

  const adminTest = () => {
    if (props.user) {
      return props.user.isAdmin;
    }
  };
  return (
    <Route
      {...rest}
      render={props =>
        authToken() && authToken().user.isAdmin && adminTest() ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  console.log("ADMIN ROUTE", state);
  return {
    user: state.authReducer
  };
};
export default connect(
  mapStateToProps,
  null
)(AdminRoute);
