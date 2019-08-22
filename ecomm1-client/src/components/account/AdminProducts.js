import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import {
  updateProduct,
  resetAdminActionStatus
} from "../../actions/adminActions";
import AdminMenu from "../layout/AdminMenu";
import AdminProductForm from "./AdminProductForm";

const AdminProducts = props => {
  const [productToUpdate, setProductToUpdate] = useState(null);
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
    _id: ""
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
    _id
  } = values;

  useEffect(() => {
    props.getProducts();
    props.getCategories();
    setValues({ ...values, formData: new FormData() });
  }, [props.actionStatus]);

  useEffect(() => {
    if (success) {
      setValues({ ...values, success: false });
    }
    if (props.actionStatus) {
      setValues({ ...values, success: true });
    }
    props.getCategories();
  }, [props.actionStatus]);

  useEffect(() => {
    if (error) {
      setValues({ ...values, error: false });
    }
    if (props.error) {
      setValues({ ...values, error: true });
      setTimeout(() => {
        setValues({ ...values, error: false });
      }, 3000);
    }
  }, [props.error]);

  const chooseForUpdate = item => () => {
    setValues({
      ...values,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description,
      _id: item._id
    });
  };
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
                  <button
                    className="small-btn"
                    onClick={chooseForUpdate(product)}
                  >
                    Update
                  </button>
                  <button className="small-btn">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };
  const handleChange = name => async e => {
    let val;
    if (name === "photo") {
      val = e.target.files[0];
    } else {
      val = e.target.value;
    }
    console.log("VAL", val);
    await setValues({ ...values, [name]: val });
    formData.set(name, val);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.updateProduct(formData, _id);
  };
  const selectedProduct = () => {
    if (_id !== "" && _id !== null) {
      return (
        <div>
          <AdminProductForm
            values={values}
            title="Update Product"
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            reduxCategories={props.categories}
          />
        </div>
      );
    }
  };

  const showError = () => {
    return (
      <div className="container" style={{ display: error ? "" : "none" }}>
        <div className="error">{props.error}</div>
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
          formData: new FormData(),
          newCategory: ""
        });
        props.resetAdminActionStatus(null);
      }, 3500);

      if (props.actionStatus) {
        return (
          <div
            className="container"
            style={{ display: props.actionStatus ? "" : "none" }}
          >
            <div className="success">{props.actionStatus}</div>
          </div>
        );
      }
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
        {showSuccess()}
        {showError()}
        <div className="products">
          <div className="products-box box">
            <h3 className="admin-title">Products List</h3>
            {productList()}
          </div>
          <div>{selectedProduct()}</div>
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
    productReducer: state.productReducer,
    categories: state.productReducer.categories,
    adminReducer: state.adminReducer,
    error: state.adminReducer.error,
    actionStatus: state.adminReducer.actionStatus
  };
};
export default connect(
  mapStateToProps,
  { getProducts, getCategories, updateProduct, resetAdminActionStatus }
)(AdminProducts);
