import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "./ProductsGrid";
import ProductSearch from "./ProductSearch";
import CategorySideFilter from "../product/CategorySideFilter";
import PriceRangeSideFilter from "../product/PriceRangeSideFilter";

const SearchResults = props => {
  const [filtered, setFiltered] = useState({
    categoryFilters: [],
    priceFilters: {}
  });
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  useEffect(() => {
    props.getCategories();
  }, [filteredByCategory]);

  const searchedForProducts = () => {
    if (filteredByCategory.length > 0) {
      return (
        <div className="product-grid">
          {<ProductsGrid products={filteredByCategory} />}
        </div>
      );
    } else if (props.searchResults) {
      return (
        <div className="product-grid">
          {<ProductsGrid products={props.searchResults} />}
        </div>
      );
    } else {
      return <div className="loading">Please Retry Search</div>;
    }
  };

  const sendCheckedList = list => {
    let newList = props.searchResults.filter(product =>
      list.includes(product.category)
    );
    setFilteredByCategory(newList);
  };


  const sendPriceRange = range => {
    range.minRange = parseInt(range.minRange);
    range.maxRange = parseInt(range.maxRange);
    setPriceRange(range);
    setFiltered();
  };

  return (
    <div className="home">
      <Layout
        title="Search Results"
        description="Here are the results from your search"
      >
        <ProductSearch />
        <div className="products-container">
          <div className="products">
            <div className="sidebar">
              <CategorySideFilter
                categories={props.categories}
                sendCheckedList={sendCheckedList}
              />
              <PriceRangeSideFilter
                sendPriceRange= {sendPriceRange}
              />
            </div>

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
