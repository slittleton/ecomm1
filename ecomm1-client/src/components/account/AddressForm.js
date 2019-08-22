import React,{useState, useEffect} from "react";
import {connect}from 'react-redux';
import {updateUserInfo} from '../../actions/userActions';

const AddressForm = (props) => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  })
  const {name, street, city, state, zipcode } = address;

  useEffect(() => {
    const { userAddress } = props.user;

    if (userAddress) {
      setAddress({
        ...address,
        name: userAddress.name,
        street: userAddress.street,
        city: userAddress.city,
        state: userAddress.state,
        zipcode: userAddress.zipcode
      });
    }
  }, [props.user]);

  const handleChange = val => async e => {
    await setAddress({ ...address, [val]: e.target.value });
  };
  const handleSubmitAddress = e => {
    e.preventDefault();

    props.updateUserInfo({address}, props.user.userId)
  };

  return (
    <form className="create-form box" onSubmit={handleSubmitAddress} style={{ width: "40rem" }}>
      <div className="subtitle center top-margin">Address</div>
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
  );
};

const mapStateToProps = state => {
  console.log('ADDRESS STATE', state)
  return {
    user: state.authReducer,
    actionStatus: state.adminReducer.actionStatus,
    error: state.adminReducer.error
  }
}

export default connect(mapStateToProps,{updateUserInfo})(AddressForm);
