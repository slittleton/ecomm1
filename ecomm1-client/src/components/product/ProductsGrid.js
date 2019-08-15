import React from "react";
import { Link } from "react-router-dom";
import ProductPhoto from "./ProductPhoto";

const ProductsGrid = props => {
  const { products } = props;
  return (
    <div className="grid">
      {products.map(product => {
        return (
          <div className="grid-item " key={product._id}>
            <Link style={{ textDecoration: "none" }} to="/">
              <ProductPhoto product={product} imageStyling="img-small" />
              <div className="grid-item-text">{product.name}</div>
              <div className="grid-item-text">
                ${parseInt(product.price).toFixed(2)}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
