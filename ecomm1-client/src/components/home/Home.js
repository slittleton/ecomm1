import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "../product/ProductsGrid";
import ProductSearch from "../product/ProductSearch";
import CategorySideFilter from "../product/CategorySideFilter";
import PriceRangeSideFilter from "../product/PriceRangeSideFilter";

const Home = props => {
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({});
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    props.getProducts();
    props.getCategories();
  }, []);
 
  const viewProducts = () => {
    if (props.searchResults && props.searchResults.length > 0) {
      return (
        <div className="product-grid">
          {<ProductsGrid products={props.searchResults} />}
        </div>
      );
    } else if (props.products) {
      return (
        <div className="product-grid">
          {<ProductsGrid products={props.products} />}
        </div>
      );
    } else {
      return <div className="loading">LOADING...</div>;
    }
  };

  const sendCheckedList = async list => {
    await setFilteredByCategory([...list]);
    ;
  };
  const sendPriceRange = async range => {
    range.minRange = parseInt(range.minRange);
    if (range.maxRange) {
      range.maxRange = parseInt(range.maxRange);
    }
    await setPriceRange(range);
  };

  return (
    <div className="home">
      <Layout title="HOME" description="Welcome to the art store">
        <ProductSearch priceRange={priceRange} filteredByCategory={filteredByCategory}/>
        <div className="products-container">
          <div className="products">
            <div className="sidebar">
              <CategorySideFilter
                categories={props.categories}
                sendCheckedList={sendCheckedList}
              />
              <PriceRangeSideFilter sendPriceRange={sendPriceRange} />
            </div>
            {viewProducts()}
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapstateToProps = state => {
  console.log('HOME', state)
  return {
    products: state.productReducer.productsBundle,
    searchResults: state.productReducer.searchResults,
    categories: state.productReducer.categories
  };
};

export default connect(
  mapstateToProps,
  { getProducts, getCategories }
)(Home);
