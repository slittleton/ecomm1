import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "../product/ProductsGrid";
import ProductSearch from "../product/ProductSearch";
import CategorySideFilter from "../product/CategorySideFilter";
import PriceRangeSideFilter from "../product/PriceRangeSideFilter";

const Home = props => {
  const [filtered, setFiltered] = useState([]);
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({});

  useEffect(() => {
    props.getProducts();
    props.getCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filteredByCategory, priceRange]);

  // const viewProducts = () => {
  //   if (filteredByCategory.length > 0) {
  //     return (
  //       <div className="product-grid">
  //         {<ProductsGrid products={filteredByCategory} />}
  //       </div>
  //     );
  //   } else if (props.products) {
  //     return (
  //       <div className="product-grid">
  //         {<ProductsGrid products={props.products} />}
  //       </div>
  //     );
  //   } else {
  //     return <div className="loading">LOADING...</div>;
  //   }
  // };
  const viewProducts = () => {
    if (filtered && filtered.length > 0) {
      console.log("FILTERED", filtered);
      return (
        <div className="product-grid">
          {<ProductsGrid products={filtered} />}
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

  const filterProducts = () => {
    let results;

    if (priceRange.minRange && filteredByCategory.length > 0) {
      results = filteredByCategory.filter(
        product =>
          product.price >= priceRange.minRange &&
          product.price <= priceRange.maxRange
      );
    }

    if (priceRange.minRange && !filteredByCategory.length > 0) {
      results = props.products.filter(
        product =>
          product.price >= priceRange.minRange &&
          product.price <= priceRange.maxRange
      );
    }

    if (filteredByCategory.length > 0 && !priceRange.minRange) {
      results = filteredByCategory;
    }

    setFiltered(results);
  };

  const sendCheckedList = async list => {
    let newList = props.products.filter(product =>
      list.includes(product.category._id)
    );
    await setFilteredByCategory([...newList]);
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
        <ProductSearch />
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
  // console.log("STATE HOME", state);
  return {
    products: state.productReducer.productsBundle,
    categories: state.productReducer.categories
  };
};

export default connect(
  mapstateToProps,
  { getProducts, getCategories }
)(Home);
