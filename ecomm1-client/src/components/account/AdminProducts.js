import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import AdminMenu from "../layout/AdminMenu";
import AdminCreateProduct from "./AdminCreateProduct";

const AdminProducts = props => {
  useEffect(() => {
    props.getProducts();
  }, []);

  const productList = () => {
    const { productsBundle } = props.productReducer;
    if (productsBundle) {
      return (
        <div className="">
          {productsBundle.map((product, index) => {
            return (
              <div key={product._id} className="tiny-pad box">
                <div>{`(${index + 1}) Title ${product.name}`}</div>
                <div className="small-font">
                  ID: {product._id}
                  <button className="small-btn">Update</button>
                  <button className="small-btn">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="">
      <Layout
        title="Admin Account - Products"
        description={`Welcome ${
          props.user.userName ? props.user.userName : null
        }`}
        accountMenu={<AdminMenu />}
      >
        <div className="products">
          <div className="products-box box">
            <h3 className="admin-title">Products List</h3>
            {productList()}
          </div>
          <div>UpdateProduct</div>
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = state => {
  console.log("ADMIN PRODUCTS STATE", state);
  return {
    user: state.authReducer,
    messages: state.contactReducer,
    productReducer: state.productReducer
  };
};
export default connect(
  mapStateToProps,
  { getProducts }
)(AdminProducts);
