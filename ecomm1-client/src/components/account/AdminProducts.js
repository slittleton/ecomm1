import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import { updateProduct } from "../../actions/adminActions";
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
  }, []);

  const chooseForUpdate = item => () => {
    console.log("ITEM", item);
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
    console.log("VAL", val);
    await setValues({ ...values, [name]: val });
    formData.set(name, val);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.updateProduct(formData);
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
    categories: state.productReducer.categories
  };
};
export default connect(
  mapStateToProps,
  { getProducts, getCategories }
)(AdminProducts);
