import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateUserInfo,
  setUserSettingsError,
  setUserSettingsSuccess
} from "../../actions/userActions";

const AddressForm = props => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  });
  const [validation, setValidation] = useState({
    error: false,
    success: false
  });
  const { name, street, city, state, zipcode } = address;
  const { error, success } = validation;

  useEffect(() => {
    const { userAddress } = props.user;
    console.log("USE EFFECT", props.user);

    // if (userAddress) {
    //   setAddress({
    //     ...address,
    //     name: userAddress.name,
    //     street: userAddress.street,
    //     city: userAddress.city,
    //     state: userAddress.state,
    //     zipcode: userAddress.zipcode
    //   });
    // }
  }, []);

  useEffect(() => {
    if (error) {
      setValidation({ ...validation, error: false });
    }
    if (props.user.userSettingsError) {
      setValidation({ ...validation, error: true });
      setTimeout(() => {
        setValidation({ ...validation, error: false });
      }, 3000);
    }
  }, [props.user.userSettingsError]);

  useEffect(() => {
    if (success) {
      setValidation({ ...validation, success: false });
    }
    if (props.user.userSettingsSuccess) {
      setValidation({ ...validation, success: true });
      setTimeout(() => {
        setValidation({ ...validation, success: false });
      }, 3000);
    }
  }, [props.user.userSettingsSuccess]);

  const handleChange = val => async e => {
    await setAddress({ ...address, [val]: e.target.value });
  };
  const handleSubmitAddress = e => {
    e.preventDefault();

    if (
      name === "" ||
      street === "" ||
      city === "" ||
      state === "" ||
      zipcode === ""
    ) {
      props.setUserSettingsError("Please Fill In All Address Fields");
    } else {
      props.updateUserInfo({ address }, props.user.userId);
    }
  };
  const showError = () => {
    if (error) {
      setTimeout(() => {
        props.setUserSettingsError(null);
      }, 3500);
    }
    return (
      <div className="container" style={{ display: error ? "" : "none" }}>
        <div className="error">{props.user.userSettingsError}</div>
      </div>
    );
  };
  const showSuccess = () => {
    if (success) {
      setTimeout(() => {
        props.setUserSettingsSuccess(null);
      }, 3500);

      return (
        <div className="container" style={{ display: success ? "" : "none" }}>
          <div className="success">{props.user.userSettingsSuccess}</div>
        </div>
      );
    }
  };
  return (
    <div>
      <form
        className="create-form box"
        onSubmit={handleSubmitAddress}
        style={{ width: "40rem" }}
      >
        <div className="subtitle center top-margin">Address</div>
        {showSuccess()}
        {showError()}
        <div className="form-control-create">
          <div className="center small-pad">Name:</div>
          <input
            type="text"
            className="form-field-create"
            name="name"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-control-create">
          <div className="center small-pad">Street:</div>
          <input
            type="text"
            className="form-field-create"
            name="street"
            value={street}
            onChange={handleChange("street")}
          />
        </div>
        <div className="form-control-create">
          <div className="center small-pad">City:</div>
          <input
            type="text"
            className="form-field-create"
            name="city"
            value={city}
            onChange={handleChange("city")}
          />
        </div>
        <div className="form-control-create">
          <div className="center small-pad">State:</div>
          <input
            type="text"
            className="form-field-create"
            name="state"
            value={state}
            onChange={handleChange("state")}
          />
        </div>
        <div className="form-control-create">
          <div className="center small-pad">Zipcode:</div>
          <input
            type="number"
            className="form-field-create"
            name="zipcode"
            value={zipcode}
            onChange={handleChange("zipcode")}
          />
        </div>
        <button className="btn btn-margin" type="submit">
          Update Address
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  console.log("ADDRESS STATE", state);
  return {
    user: state.authReducer,
    actionStatus: state.adminReducer.actionStatus,
    error: state.adminReducer.error
  };
};

export default connect(
  mapStateToProps,
  { updateUserInfo, setUserSettingsError, setUserSettingsSuccess }
)(AddressForm);
