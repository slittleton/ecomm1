import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut } from "../../actions/authActions";
import { connect } from "react-redux";

const MenuSignStatus = (props) => {
  const signinFalse = () => {
    if (props.user.signInStatus === false) {
      return (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
        </Fragment>
      );
    }
  };

  const signinTrue = (children) => {
    if (props.user.signInStatus === true) {
      return (
        <Fragment>
          <li className="nav-item">
            <div className="nav-link sign-out" onClick={props.signOut}>
              Sign Out
            </div>
          </li>
          {children}
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {signinFalse()}
      {signinTrue(props.children)}
    </Fragment>
  );
};

const mapStateToProps = state => {
  // console.log("MENU STATE", state.authReducer);
  return { user: state.authReducer };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signOut }
  )(MenuSignStatus)
);


