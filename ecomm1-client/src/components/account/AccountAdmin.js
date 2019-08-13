import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";

const AccountAdmin = props => {
  return (
    <div className="">
      <Layout
        title="Admin Account - Orders"
        description={`Welcome ${props.user.userName}`}
        accountMenu={<AdminMenu />}
      >
        <div className="orders">
          <h3 className="admin-title">Orders</h3>
          <div className="orders-box">{/* MAP() ORDERS INTO HERE */}</div>
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  {}
)(AccountAdmin);
