import React from "react";

const AddressForm = ({ handleChange, address }) => {
  return (
    <div className="create-form box">
      {/* {JSON.stringify(address)} */}
      <div className="subtitle center top-margin">Address</div>
      <div className="form-control-create">
        <div className="center small-pad">Name:</div>
        <input
          type="text"
          className="form-field-create"
          name="name"
          value={address.name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-control-create">
        <div className="center small-pad">Street:</div>
        <input
          type="text"
          className="form-field-create"
          name="street"
          value={address.street}
          onChange={handleChange("street")}
        />
      </div>
      <div className="form-control-create">
        <div className="center small-pad">City:</div>
        <input
          type="text"
          className="form-field-create"
          name="city"
          value={address.city}
          onChange={handleChange("city")}
        />
      </div>
      <div className="form-control-create">
        <div className="center small-pad">State:</div>
        <input
          type="text"
          className="form-field-create"
          name="state"
          value={address.state}
          onChange={handleChange("state")}
        />
      </div>
      <div className="form-control-create">
        <div className="center small-pad">Zipcode:</div>
        <input
          type="text"
          className="form-field-create"
          name="zipcode"
          value={address.zipcode}
          onChange={handleChange("zipcode")}
        />
      </div>
    </div>
  );
};
export default AddressForm;
