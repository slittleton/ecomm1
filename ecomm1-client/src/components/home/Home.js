import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts, getCategories } from "../../actions/productActions";
import Layout from "../layout/Layout";
import ProductsGrid from "../product/ProductsGrid";
import ProductSearch from "../product/ProductSearch";
import CategorySideFilter from "../product/CategorySideFilter";

const Home = props => {
  const [filteredByCategory, setFilteredByCategory] = useState([]);

  useEffect(() => {
    props.getProducts();
    props.getCategories();
  }, [filteredByCategory]);

  const viewProducts = () => {
    if (filteredByCategory.length>0) {
      return (
        <div className="product-grid">
          {<ProductsGrid products={filteredByCategory} />}
        </div>
      );
    } else if(props.products){
      return (
        <div className="product-grid">
          {<ProductsGrid products={props.products} />}
        </div>
      );
    }
    else {
      return <div className="loading">LOADING...</div>;
    }
  }

  const sendCheckedList = list => {
    let newList = props.products.filter(
      (product) => list.includes(product.category._id))
      setFilteredByCategory(newList)
  };

  return (
    <div className="home">
      <Layout title="HOME" description="Welcome to the art store">
        <ProductSearch />
        <div className="products-container">
          <div className="products">
            <CategorySideFilter
              categories={props.categories}
              sendCheckedList={sendCheckedList}
            />
            {viewProducts()}
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
