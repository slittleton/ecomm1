import React,{useState, useEffect} from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";

const AdminProducts = (props) => {
  return (
    <div className="">
      <Layout
        title="Admin Account - Products"
        description={`Welcome ${props.user.userName? props.user.userName: null}`}
        accountMenu={<AdminMenu />}
      >
        <div className="products">
          <h3 className="admin-title">Products</h3>
          <div className="products-box">
            
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
export default connect(mapStateToProps, {})(AdminProducts)