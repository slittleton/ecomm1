import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { setSignInStatus, signOut } from "../../actions/authActions";
import { connect } from "react-redux";

const Menu = props => {
  return (
    <div className="menu">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
        </li>
        {props.user.signInStatus === false ? (
          <Fragment>
            {" "}
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
        ) : null}
        {props.user.signInStatus ? (
          <li className="nav-item">
            <div className="nav-link sign-out" onClick={props.signOut}>
              Sign Out
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.authReducer };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setSignInStatus, signOut }
  )(Menu)
);
