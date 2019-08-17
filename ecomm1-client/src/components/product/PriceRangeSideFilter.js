import React, { useState } from "react";

const PriceRangeSideFilter = props => {
  const [range, setRange] = useState({
    minRange: null,
    maxRange: null
  });

  const handleChange =  name =>  async e => {
    await setRange({ ...range, [name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if(range.minRange === null){
      range.minRange = 0
    }
    props.sendPriceRange(range);
  };

  return (
    <div className="price-range">
      <form action="" className="price-range-form" onSubmit={handleSubmit}>
        <div className="price-title">Price Range</div>
        <div className="price-fields">
          <div>
            <input
              name="minRange"
              type="number"
              placeholder="Min"
              className="price-field"
              onChange={handleChange("minRange")}
            />
          </div>
          <div className="price-seperator">to</div>
          <div>
            <input
              name="maxRange"
              type="number"
              placeholder="Max"
              className="price-field"
              onChange={handleChange("maxRange")}
            />
          </div>
        </div>
        <button className="price-range-btn" type="submit">
          GO
        </button>
      </form>
    </div>
  );
};

export default PriceRangeSideFilter;
