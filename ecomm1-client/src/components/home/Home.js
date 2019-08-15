import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "../product/ProductsGrid";
import ProductSearch from "../product/ProductSearch";

const Home = props => {
  const [filtered, setfiltered] = useState([]);
  const [selectedCategories, setselectedCategories] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    props.getProducts();
    props.getCategories();
  }, []);

  const defaultProducts = () =>
    props.products ? (
      <div className="product-grid">
        {<ProductsGrid products={props.products} />}
      </div>
    ) : (
      <div className="loading">LOADING...</div>
    );

  const sideFilter = () => {
    console.log("CATEGORIES", props.categories);
    return (
      <div className="product-filter">
        <div className="subtitle">Refine By Category</div>
        {props.categories
          ? props.categories.map((category, index) => {
              return (
                <li key={category._id} className="list-item checkbox-area">
                  <input
                    type="checkBox"
                    className="category-check"
                    // value=""
                    onChange={() => {}}
                  />
                  <label>{category.name}</label>
                </li>
              );
            })
          : null}
      </div>
    );
  };

  const filterProducts = () => {};

  return (
    <div className="home">
      <Layout title="HOME" description="Welcome to the art store">
        <ProductSearch />
        <div className="products-container">
          <div className="products">
            {sideFilter()}
            {defaultProducts()}
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapstateToProps = state => {
  console.log(state);
  return {
    products: state.productReducer.productsBundle,
    categories: state.productReducer.categories
  };
};

export default connect(
  mapstateToProps,
  { getProducts, getCategories }
)(Home);
