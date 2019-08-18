import React, { useState, useEffect } from "react";

const PriceRangeSideFilter = props => {
  const [range, setRange] = useState({
    minRange: null,
    maxRange: null
  });

  const handleChange = name => async e => {
    await setRange({ ...range, [name]: e.target.value });
  };
  useEffect(() => {
    if (range.minRange === null) {
      range.minRange = 0;
    }
    props.sendPriceRange(range);
  }, [range]);

  return (
    <div className="price-range">
      <form action="" className="price-range-form">
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
      </form>
    </div>
  );
};

export default PriceRangeSideFilter;
