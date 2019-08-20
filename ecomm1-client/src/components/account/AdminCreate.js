import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import { getCategories } from "../../actions/productActions";
import {
  createCategory,
  setAdminActionError,
  resetAdminActionStatus
} from "../../actions/adminActions";

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
    if(error && name==="newCategory"){
      setValues({ ...values, error: false })
      props.resetAdminActionStatus(null)
    }
    await setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = () => {};

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
        setValues({ ...values,     name: "",
        category: "",
        photo: "",
        price: "",
        quantity: "",
        description: "",
        error: false,
        success: false,
        formData: "",
        newCategory: ""});
        props.resetAdminActionStatus(null)
      }, 1500);

      

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
              Category: {props.adminActionStatus.productCreated.name} has been
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
            <div className="container top-margin">
              <div className="box " style={{ width: "35rem" }}>
                <div className="title">Create Category</div>
                <div
                  className="create-form "
                  style={{ margin: "0 1.5rem 0 1.5rem" }}
                >
                  <div className="form-control-create">
                    <input
                      type="text"
                      className="form-field-create"
                      name="newCategory"
                      value={newCategory}
                      onChange={handleChange("newCategory")}
                      placeholder="New Category Name"
                    />
                  </div>
                  <button className="btn btn-margin" onClick={createCategory}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="container bottom-margin">
              <div className="box" style={{ width: "35rem" }}>
                <div className="title">Create Product</div>
                <div className="container">
                  <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-control-create">
                      <input
                        type="text"
                        className="form-field-create"
                        name="name"
                        value={name}
                        onChange={handleChange("name")}
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="form-control-create">
                      <select
                        className="select-field"
                        onChange={handleChange("category")}
                      >
                        <option>Select Category</option>
                        {props.categories &&
                          props.categories.map((category, index) => {
                            return (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-control-create input-file">
                      <label htmlFor="photo" className="file-label">
                        Photo:{" "}
                      </label>
                      <input
                        type="file"
                        className="file-field"
                        id={"file-field"}
                        name="photo"
                        value={photo}
                        onChange={handleChange("photo")}
                        accept="image/*"
                      />
                    </div>
                    <div className="form-control-create">
                      <input
                        type="number"
                        className="form-field-create"
                        name="price"
                        value={price}
                        onChange={handleChange("price")}
                        placeholder="Product Price"
                      />
                    </div>
                    <div className="form-control-create">
                      <input
                        type="number"
                        className="form-field-create"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange("quantity")}
                        placeholder="Product Quantity"
                      />
                    </div>
                    <div className="form-control">
                      <textarea
                        rows="8"
                        cols="50"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange("description")}
                        className="form-field-create"
                        placeholder="Please enter a description"
                      />
                    </div>
                    <button className="btn btn-margin" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
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
  { getCategories, createCategory, setAdminActionError, resetAdminActionStatus }
)(AdminCreate);
