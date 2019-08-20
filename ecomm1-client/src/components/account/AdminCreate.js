import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import { getCategories, getProducts } from "../../actions/productActions";
import {
  createCategory,
  createProduct,
  setAdminActionError,
  resetAdminActionStatus,
} from "../../actions/adminActions";

import AdminCreateCategory from "./AdminCreateCategory";
import AdminCreateProduct from "./AdminCreateProduct";

const AdminCreate = props => {
  const [values, setValues] = useState({
    name: "",
    category: "",
    photo: "",
    price: "",
    quantity: "",
    description: "",
    error: false,
    success: false,
    formData: "",
    newCategory: ""
  });
  const {
    name,
    category,
    description,
    price,
    quantity,
    photo,
    error,
    success,
    formData,
    newCategory
  } = values;
  
  useEffect(() => {
    props.getCategories();
    props.getProducts()
    setValues({ ...values, formData: new FormData() });
  }, []);

  useEffect(() => {
    if (success) {
      setValues({ ...values, success: false });
    }
    if (props.adminActionStatus) {
      setValues({ ...values, success: true });
    }
    props.getCategories();
  }, [props.adminActionStatus]);

  useEffect(() => {
    if (error) {
      setValues({ ...values, error: false });
    }

    if (props.adminActionError) {
      setValues({ ...values, error: true });
    }
  }, [props.adminActionError]);

  const handleChange = name => async e => {
    // resets error message for create category when user start typing in new category field
    if (error && name === "newCategory") {
      setValues({ ...values, error: false });
      props.resetAdminActionStatus(null);
    }

    let val;
    if (name === "photo") {
      val = e.target.files[0];
    } else {
      val = e.target.value;
    }
    console.log('VAL',val);
    await setValues({ ...values, [name]: val})
    formData.set(name, val);
    createProduct(formData)
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createProduct(formData);
  };

  const createCategory = () => {
    if (
      newCategory === "" ||
      newCategory === null ||
      newCategory === undefined
    ) {
      props.setAdminActionError({ error: "Category Name Must Not Be Empty" });
    } else {
      props.createCategory(newCategory);
    }
  };

  const showError = () => {
    return (
      <div className="container" style={{ display: error ? "" : "none" }}>
        <div className="error">{props.adminActionError}</div>
      </div>
    );
  };

  const showSuccess = () => {
    if (success) {
      setTimeout(() => {
        setValues({
          ...values,
          name: "",
          category: "",
          photo: "",
          price: "",
          quantity: "",
          description: "",
          error: false,
          success: false,
          formData: "",
          newCategory: ""
        });
        props.resetAdminActionStatus(null);
      }, 3500);

      if (props.adminActionStatus.categoryCreated) {
        return (
          <div
            className="container"
            style={{ display: props.adminActionStatus ? "" : "none" }}
          >
            <div className="success">
              Category: {props.adminActionStatus.categoryCreated.name} has been
              created successfully
            </div>
          </div>
        );
      }

      if (props.adminActionStatus.productCreated) {
        return (
          <div
            className="container"
            style={{ display: props.adminActionStatus ? "" : "none" }}
          >
            <div className="success">
              Product: {props.adminActionStatus.productCreated.name} has been
              created successfully
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="">
      <Layout
        title="Admin Account - Create"
        description={`Welcome ${
          props.user.userName ? props.user.userName : null
        }`}
        accountMenu={<AdminMenu />}
      >
        {showError()}
        {showSuccess()}
        <div className="container create">
          <div className="color-box ">
            <AdminCreateCategory
              newCategory={newCategory}
              handleChange={handleChange}
              createCategory={createCategory}
            />
            <AdminCreateProduct
              values={values}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              reduxCategories={props.categories}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = state => {
  console.log("ADMINCREATE", state);
  return {
    user: state.authReducer,
    products: state.productsReducer,
    categories: state.productReducer.categories,
    adminActions: state.adminReducer,
    adminActionStatus: state.adminReducer.actionStatus,
    adminActionError: state.adminReducer.error
  };
};
export default connect(
  mapStateToProps,
  {
    getCategories,
    getProducts,
    createCategory,
    createProduct,
    setAdminActionError,
    resetAdminActionStatus
  }
)(AdminCreate);
