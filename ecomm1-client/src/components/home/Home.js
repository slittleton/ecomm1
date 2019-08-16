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
  }, [filteredByCategory]);

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
    if (filtered.length > 0) {
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

  const filterProducts = (prices, cats) => {
    let results;

    if (prices.minRange && prices.maxRange && cats.length > 0) {
      // combine filters 
    }
    if (prices.minRange && prices.maxRange) {
      // filter by price
    }
    if (cats.length > 0) {
      // filter by categories
    }

    setFiltered(results);
  };

  const sendCheckedList = list => {
    let newList = props.products.filter(product =>
      list.includes(product.category._id)
    );
    setFilteredByCategory(newList);
    filterProducts(priceRange, newList);
  };
  const sendPriceRange = range => {
    range.minRange = parseInt(range.minRange);
    range.maxRange = parseInt(range.maxRange);
    setPriceRange(range);

    filterProducts({ range, filteredByCategory });
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
            <div>{JSON.stringify(filtered)}</div>

            {viewProducts()}
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapstateToProps = state => {
  console.log("STATE HOME", state);
  return {
    products: state.productReducer.productsBundle,
    categories: state.productReducer.categories
  };
};

export default connect(
  mapstateToProps,
  { getProducts, getCategories }
)(Home);
