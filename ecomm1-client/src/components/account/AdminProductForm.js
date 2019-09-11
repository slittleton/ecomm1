import React from 'react';

const AdminProductForm = ({values, handleSubmit, handleChange, reduxCategories, title}) => {
    const{name, price, quantity, description} = values
  return(
    <div className="container bottom-margin">
              <div className="box" style={{ width: "35rem" }}>
                <div className="title">{title}</div>
                <div className="container">
                  <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-control-create">
                     <div className="center small-pad">Name:</div>
                      <input
                        type="text"
                        className="form-field-create"
                        name="name"
                        value={name}
                        onChange={handleChange("name")}
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="form-control-create">
                    <div className="center small-pad">Category:</div>
                      <select
                        className="select-field"
                        onChange={handleChange("category")}
                      >
                        <option>Select Category</option>
                        {reduxCategories &&
                          reduxCategories.map((category, index) => {
                            return (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div 
                    className="form-control-create input-file"
                    >
                      <label htmlFor="photo" 
                      className="center small-pad"
                      >
                        Photo:{" "}
                      </label>
                      <input
                        type="file"
                        className="center small-pad"
                        id={"file-field"}
                        name="photo"
                        onChange={handleChange("photo")}
                        accept="image/*"
                      />
                    </div>
                    <div className="form-control-create">
                    <div className="center small-pad">Price:</div>
                      <input
                        type="number"
                        className="form-field-create"
                        name="price"
                        value={price}
                        onChange={handleChange("price")}
                        placeholder="Product Price"
                      />
                    </div>
                    <div className="form-control-create">
                    <div className="center small-pad">Quantity:</div>
                      <input
                        type="number"
                        className="form-field-create"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange("quantity")}
                        placeholder="Product Quantity"
                      />
                    </div>
                    <div className="form-control" style={{border: 'none'}}>
                    <div className="center small-pad">Description:</div>
                     <div className="box"> <textarea
                        rows="8"
                        cols="50"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange("description")}
                        className="form-field-create"
                        placeholder="Please enter a description"
                      /></div>
                    </div>
                    <button className="btn btn-margin" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
  )
}
export default AdminProductForm;
