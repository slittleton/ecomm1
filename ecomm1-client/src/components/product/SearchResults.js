import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "./ProductsGrid";
import ProductSearch from "./ProductSearch";
import CategorySideFilter from "../product/CategorySideFilter";
import PriceRangeSideFilter from "../product/PriceRangeSideFilter";


const SearchResults = props => {
  const [filtered, setFiltered] = useState([]);
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  useEffect(() => {
    props.getCategories();
  }, [props.searchResults]);


  useEffect(() => {
    setFiltered(filteredByCategory)

    filterByPrice()
  }, [filteredByCategory, priceRange]);



  const searchedForProducts = () => {
    if (filtered && filtered.length > 0) {
      return (
        <div className="product-grid">
          {<ProductsGrid products={filtered} />}
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

  const sendCheckedList = async list => {
    if(props.searchResults){
      let newList = props.searchResults.filter(product =>
        list.includes(product.category)
      );
      await setFilteredByCategory(newList);
    }
  };

  const filterByPrice = () => {
    let priceFilterResults;

    if (priceRange.maxRange) {
     priceFilterResults = props.searchResults.filter(
        product =>
          product.price >= priceRange.minRange &&
          product.price <= priceRange.maxRange
      );
      setFiltered(priceFilterResults)
  }}

  const sendPriceRange = async range => {
    range.minRange = parseInt(range.minRange);
    if (range.maxRange) {
      range.maxRange = parseInt(range.maxRange);
    }
    await setPriceRange(range);
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

export default connect(mapstateToProps, { getProducts, getCategories })(SearchResults);