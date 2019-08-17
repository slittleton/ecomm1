import React,{useState, useEffect} from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";

const AdminCreate = (props) => {
  return (
    <div className="">
      <Layout
        title="Admin Account - Create"
        description={`Welcome ${props.user.userName? props.user.userName: null}`}
        accountMenu={<AdminMenu />}
      >
        <div className="create">
          <h3 className="admin-title">Create</h3>
          <div className="create-box">
            
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
export default connect(mapStateToProps, {})(AdminCreate)