import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories, searchForProducts } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "../product/ProductsGrid";
import ProductSearch from "../product/ProductSearch";
import CategorySideFilter from "../product/CategorySideFilter";
import PriceRangeSideFilter from "../product/PriceRangeSideFilter";

const Home = props => {
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({});
  const [searchTerm, setsearchTerm] = useState("");
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
  const setSearch = async val => {
    await setsearchTerm(val);
    ;
  };
  const sendPriceRange = async range => {
    range.minRange = parseInt(range.minRange);
    if (range.maxRange) {
      range.maxRange = parseInt(range.maxRange);
    }
    await setPriceRange(range);
  };
  const handlefilter = () => {
    let searchCriteria = {
      searchTerm,
      priceRange: priceRange,
      filteredByCategory: filteredByCategory
    };
    props.searchForProducts(searchCriteria);
  }

  return (
    <div className="home">
      <Layout title="HOME" description="Welcome to the art store">
        <ProductSearch priceRange={priceRange} filteredByCategory={filteredByCategory} setSearch={setSearch}/>
        <div className="products-container">
          <div className="products">
            <div className="sidebar box small-pad">
              
              <CategorySideFilter
                categories={props.categories}
                sendCheckedList={sendCheckedList}
              />
              <PriceRangeSideFilter sendPriceRange={sendPriceRange} />
              <div className="container"><button className="btn small-margin" onClick={handlefilter}>Apply</button></div>
            </div>
            {viewProducts()}
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapstateToProps = state => {
  return {
    products: state.productReducer.productsBundle,
    searchResults: state.productReducer.searchResults,
    categories: state.productReducer.categories
  };
};

export default connect(
  mapstateToProps,
  { getProducts, getCategories, searchForProducts }
)(Home);
