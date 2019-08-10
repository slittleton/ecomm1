import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { setSignInStatus } from "../../actions/authActions";
import { connect } from "react-redux";

const Menu = (props) => {
  return(
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
        <li className="nav-item">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" onClick={()=>props.setSignInStatus(false)}>
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(connect(null, {setSignInStatus})(Menu));