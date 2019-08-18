import React, { useState, Fragment, useEffect } from "react";
import {
  searchForProducts,
  resetSearchStatus,
  getProducts
} from "../../actions/productActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const ProductSearch = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [searchFailure, setSearchFailure] = useState(false);

  useEffect(() => {
    setSearchFailure(false);
    setSearchSuccess(false);

    if (props.error) {
      setSearchFailure(true);
    }
    if (props.searchSuccess) {
      setSearchSuccess(true);
    }
  }, [props.error, props.searchSuccess]);

  const handleChange = name => e => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    let searchCriteria = {
      searchTerm,
      priceRange: props.priceRange,
      filteredByCategory: props.filteredByCategory
    };

    props.searchForProducts(searchCriteria);
  };

  const resetErrorMessage = () => {
    if (searchFailure) {
          setTimeout(() => {
            props.resetSearchStatus("error");
            props.getProducts()
          }, 3500);
        }
  }

  const showError = () => {
    return (
      <div className="container" style={{ display: props.error ? "" : "none" }}>
        <div className="error">{props.error}</div>
      </div>
    );
  };

  return (
    <Fragment>
      <form className="searchbox-container" onSubmit={handleSubmit}>
        <div className="search-form-control">
          <input
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={handleChange("searchTerm")}
            className="search-form-field"
            placeholder="Search For Products"
          />
        </div>
        <div className="search-btn">
          <button className="btn" type="submit">
            Search
          </button>
        </div>
      </form>
      {showError()}
      {resetErrorMessage()}
    </Fragment>
  );
};
const mapStateToProps = state => {
  return {
    searchResults: state.productReducer.searchResults,
    searchSuccess: state.productReducer.searchSuccess,
    error: state.productReducer.error
  };
};

export default connect(
  mapStateToProps,
  { searchForProducts, resetSearchStatus, getProducts }
)(ProductSearch);
