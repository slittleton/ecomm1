import React from 'react';

const AdminCreateCategory = ({newCategory, handleChange, createCategory}) => {

  return (
    
    <div className="container top-margin">
    <div className="box " style={{ width: "35rem" }}>
      <div className="title">Create Category</div>
      <div
        className="create-form "
        style={{ margin: "0 1.5rem 0 1.5rem" }}
      >
        <div className="form-control-create">
          <input
            type="text"
            className="form-field-create"
            name="newCategory"
            value={newCategory}
            onChange={handleChange("newCategory")}
            placeholder="New Category Name"
          />
        </div>
        <button className="btn btn-margin" onClick={createCategory}>
          Submit
        </button>
      </div>
    </div>
  </div>
  )

}

export default AdminCreateCategory