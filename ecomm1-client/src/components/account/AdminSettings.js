import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import AddressForm from "./AddressForm";

const AdminSettings = props => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    address: { name: "", street: "", city: "", state: "", zipcode: "" }
  });
  const { userName, email, address } = values;

  useEffect(() => {
    const { userName, userEmail, userAddress } = props.user;
    setValues({
      ...values,
      name: userName,
      email: userEmail,
    });
    if(userAddress){ setValues({...values, address: userAddress})}
  }, []);

  const handleSubmit = () => {};

  const handleChange = name => async e  => {
    await setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div className="">
      <Layout
        title="Admin Account - Settings"
        description={`Welcome ${
          props.user.userName ? props.user.userName : null
        }`}
        accountMenu={<AdminMenu />}
      >
        <div className="settings container box">
          <div className="box small-pad">
            <div className="title">Current User Information</div>
            <div className="tiny-pad">Name: {props.user.userName}</div>
            <div className="tiny-pad">Email: {props.user.userEmail}</div>
            <div className="tiny-pad">
              Address:{" "}
              {props.user.userAddress
                ? props.user.userAddress
                : "No Address On File"}
            </div>
          </div>

          <div className="">
            <div className="title">Update User Information</div>
            <form onSubmit={handleSubmit} className="create-form">
              <div className="box">
                <div className="subtitle center top-margin">
                  Username and Email
                </div>
                <div className="form-control-create">
                  <div className="center small-pad">Username:</div>
                  <input
                    type="text"
                    className="form-field-create"
                    name="name"
                    value={userName}
                    onChange={handleChange("name")}
                  />
                </div>
                <div className="form-control-create">
                  <div className="center small-pad">Email:</div>
                  <input
                    type="text"
                    className="form-field-create"
                    name="email"
                    value={email}
                    onChange={handleChange("email")}
                  />
                </div>
              </div>
              <AddressForm handleChange={handleChange} address={address} />

              <button className="btn btn-margin" type="submit">
                Submit Update Info
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = state => {
  console.log("ADMIN SETTINGS", state);
  return {
    user: state.authReducer
    // actionStatus: state.adminReducer.actionStatus,
    // error: state.adminReducer.error
  };
};
export default connect(
  mapStateToProps,
  {}
)(AdminSettings);
