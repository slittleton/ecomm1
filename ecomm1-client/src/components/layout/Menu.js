import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Menu = () => {
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
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Menu);