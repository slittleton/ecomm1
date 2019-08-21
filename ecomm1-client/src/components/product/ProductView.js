import React, { useState, useEffect } from "react";
import { getProduct, getCategories } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { connect } from "react-redux";
import ProductPhoto from "./ProductPhoto";
import Layout from "../layout/Layout";
import { Redirect } from "react-router-dom";

const ProductView = props => {
  const [redirect, setRedirect] = useState(false);
  const { id } = props.match.params;

  useEffect(() => {
    if (redirect === true) {
      setRedirect(false);
    }
    console.log("START");
    props.getProduct(id);
    props.getCategories();
  }, []);


  const addItemToCart = async () => {

    props.addToCart(props.product);

    setRedirect(true);
  };
  const redirectOnAddToCart = () => {
    return redirect ? <Redirect to="/cart" /> : null;
  };

  const viewProduct = () => {
    const { product } = props;
    return (
      <div className="container">
        {redirectOnAddToCart()}
        {product ? (
          <div className="container small-margin">
            <ProductPhoto
              product={product}
              imageStyling="img-large small-margin"
            />
            <div className="box">
              <div className="details">
                <h2 className="title">{product.name}</h2>

                <div className="small-margin medium-pad">
                  <h3 className="subtitle medium-pad">
                    Price: ${product.price.toFixed(2)}
                  </h3>
                  <p className="message-text">{product.description}</p>
                  <div className="center">
                    <button
                      className="btn btn-margin medium-pad"
                      onClick={addItemToCart}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="product-view">
      <Layout title="Product Page" description="More details about this item">
        {viewProduct()}
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  console.log("PRODUCT STATE", state);
  return {
    product: state.productReducer.product
  };
};

export default connect(
  mapStateToProps,
  { getProduct, getCategories, addToCart }
)(ProductView);
