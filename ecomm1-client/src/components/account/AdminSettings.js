import React,{useState, useEffect} from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";

const AdminSettings = (props) => {
  return (
    <div className="">
      <Layout
        title="Admin Account - Settings"
        description={`Welcome ${props.user.userName? props.user.userName: null}`}
        accountMenu={<AdminMenu />}
      >
        <div className="settings">
          <h3 className="admin-title">Settings</h3>
          <div className="settings-box">
            
          </div>
        </div>

      </Layout>
    </div>
  );

}
const mapStateToProps = state => {
  return {
    user: state.authReducer,
    messages: state.contactReducer,
    products: state.productsReducer,
  }
}
export default connect(mapStateToProps, {})(AdminSettings)