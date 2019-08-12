import React from "react";
import { Link, withRouter } from "react-router-dom";

import MenuSignStatus from "./MenuSignStatus";
import MenuAccount from "./MenuAccount";

const Menu = () => {
  return (
    <div className="menu">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
        <MenuSignStatus>
          <MenuAccount />
        </MenuSignStatus>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
