import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const MenuAccount = props => {
  const adminFalse = () => {
    if (props.user.isAdmin === false) {
      return (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link account" to="/account/user">
              Account
            </Link>
          </li>
        </Fragment>
      );
    }
  };
  const adminTrue = () => {
    if (props.user.isAdmin === true) {
      return (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link account" to="/account/admin">
              Account
            </Link>
          </li>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {adminTrue()}
      {adminFalse()}
    </Fragment>
  );
};

const mapStateToProps = state => {
  // console.log("MENU STATE", state.authReducer);
  return { user: state.authReducer };
};

export default withRouter(connect(mapStateToProps,null)(MenuAccount));
