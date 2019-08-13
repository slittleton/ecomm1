import React from "react";
import {Link } from 'react-router-dom';


const AdminMenu = () => {

  return (
    <div className="admin-menu">
      <ul className="account-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/account/admin">
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/account/admin/products">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/account/admin/create">
            Create
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/account/admin/messages">
            Messages
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/account/admin/settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default AdminMenu;