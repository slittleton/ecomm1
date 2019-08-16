import React, { useState } from "react";

const CategorySideFilter = props => {
  // console.log("CATEGORIES", props.categories);
  const [checked, setChecked] = useState([]);

  const handleCheck = id => async () => {
    //test to see if category is currently in state,
    //if not found return -1 else return index
    const checkedOff = checked.indexOf(id);
    const listOfChecks = [...checked];
    if (checkedOff === -1) {
      // if category not in state
      listOfChecks.push(id); //add to array
    } else {
      // if category already in state, remove from list of checkedOff
      listOfChecks.splice(checkedOff, 1);
    }
    setChecked(listOfChecks);
    props.sendCheckedList(listOfChecks);
  };

  return (
    <div className="product-filter">
      <div className="subtitle">Refine By Category</div>
      {props.categories
        ? props.categories.map((category, index) => {
            return (
              <li key={category._id} className="list-item checkbox-area">
                <input
                  type="checkBox"
                  className="category-check"
                  value={checked.indexOf(category._id === -1)}
                  onChange={handleCheck(category._id)}
                />
                <label>{category.name}</label>
              </li>
            );
          })
        : null}
    </div>
  );
};

export default CategorySideFilter;
