import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "../product/ProductsGrid";
import ProductSearch from "../product/ProductSearch";

const Home = props => {
  useEffect(() => {
    props.getProducts();
  }, []);

  return (
    <div className="home">
      <Layout title="HOME" description="Welcome to the art store">
      <ProductSearch/>
        {props.products ? (
          <div className="products-container">
            
            <div className="search-box" />
            <div className="products">
              <div className="product-filter">
                FILTER
              </div>
              <div className="product-grid">
                <ProductsGrid products={props} />

              </div>
            </div>
          </div>
        ) : (
          <div className="loading">
            LOADING...
          </div>
        )}
      </Layout>
    </div>
  );
};
const mapstateToProps = state => {
  console.log(state);
  return {
    products: state.productReducer.productsBundle
  };
};

export default connect(
  mapstateToProps,
  { getProducts }
)(Home);
