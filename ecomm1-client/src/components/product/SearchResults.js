import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "./ProductsGrid";
import ProductSearch from "./ProductSearch";

const SearchResults = props => {
  const [filtered, setfiltered] = useState([]);
  const [selectedCategories, setselectedCategories] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    // props.getProducts();
    props.getCategories();

    console.log('FILTERED',filtered);
  }, []);



  const searchedForProducts = () => {
    return props.searchResults ? (
      <div className="product-grid">{<ProductsGrid products={props.searchResults} />}</div>
    ) : (
      <div className="loading">LOADING...</div>
    );
  };

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

  const setSearchResults = (filterResults) => {
    // /products/search
    setfiltered(filterResults)

  };

  const filterProducts = () => {};

  return (
    <div className="home">
      <Layout title="Search Results" description="Here are the results from your search">
        <ProductSearch/>
        <div className="products-container">
          <div className="products">
            {sideFilter()}
            {searchedForProducts()}
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
    searchResults: state.productReducer.searchResults,
    error: state.productReducer.error,
    categories: state.productReducer.categories
  };
};

export default connect(
  mapstateToProps,
  { getProducts, getCategories }
)(SearchResults);
