import React, { useState } from "react";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = name => e => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);

    // if (props.contact.error) {
    //   props.setMessageError(null);
    // }
    // if (props.contact.messageData) {
    //   props.setMessageData(null);
    // }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(searchTerm)
  };

  return (

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

  );
};
export default ProductSearch;
