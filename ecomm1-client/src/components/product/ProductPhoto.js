import React from "react";
const API = process.env.REACT_APP_API_URL;

const ProductPhoto = ({ product, imageStyling }) => (
  <div className="photo">
    <img
      src={`${API}/product/photo/${product._id}`}
      alt={product.name}
      className={imageStyling}
    />
  </div>
);

export default ProductPhoto;
