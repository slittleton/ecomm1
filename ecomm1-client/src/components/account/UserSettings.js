import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import AddressForm from "./AddressForm";
import { updateUserInfo, getUserOrders } from "../../actions/userActions";

const UserSettings = props => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    newpassword: "",
    oldpassword: ""
  });
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  });
  const { userName, email, newpassword, oldpassword } = values;
  const { name, street, city, state, zipcode } = address;

  useEffect(() => {
    const { userAddress } = props.user;
    if (props.user.userAddress) {
      setAddress({
        ...values,
        name: userAddress.name,
        street: userAddress.street,
        city: userAddress.city,
        state: userAddress.state,
        zipcode: userAddress.zipcode
      });
    }
  }, [props.user.userAddress]);

  useEffect(() => {
    const { userName, userEmail } = props.user;
    if (props.user) {
      setValues({
        ...values,
        userName: userName,
        email: userEmail
      });
    }
  }, [props.user]);

  const handleSubmitUser = e => {
    e.preventDefault();

    console.log(values);
  };
  const handleSubmitPassword = e => {
    e.preventDefault();

    console.log(values);
  };

  const handleChange = val => async e => {
    await setValues({ ...values, [val]: e.target.value });
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
        {JSON.stringify(props.user)}
        <div className="settings container box">
          <div className="box">
            <div className="title">Current User Information</div>
            <div className="box">
              <div className="tiny-pad">Username: {userName}</div>
              <div className="tiny-pad">Email: {email}</div>
            </div>
            <div className="tiny-pad box">
              Address:{" "}
              {street !== "" ? (
                <div>
                  <div className="tiny-pad">Name: {name}</div>
                  <div className="tiny-pad">Street: {street}</div>
                  <div className="tiny-pad">City: {city}</div>
                  <div className="tiny-pad">State: {state}</div>
                  <div className="tiny-pad">Zipcode: {zipcode}</div>
                </div>
              ) : (
                <div className="tiny-pad">Address Not Found</div>
              )}
            </div>
            <div className="box">
              <div className="tiny-pad">USER ORDER HISTORY</div>
              <div className="tiny-pad">USER ORDER HISTORY</div>
              <div className="tiny-pad">USER ORDER HISTORY</div>
              <div className="tiny-pad">USER ORDER HISTORY</div>
            </div>
          </div>

          <div className="">
            <div className="title">Update User Information</div>
            <form onSubmit={handleSubmitUser} className="create-form">
              <div className="box">
                <div className="subtitle center top-margin">
                  Username and Email
                </div>
                <div className="form-control-create">
                  <div className="center small-pad">Username:</div>
                  <input
                    type="text"
                    className="form-field-create"
                    name="userName"
                    value={userName}
                    onChange={handleChange("userName")}
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
              <button className="btn btn-margin" type="submit">
                Update Username and/or Email
              </button>
            </form>

            <form onSubmit={handleSubmitPassword} className="create-form">
              <div className="box">
                <div className="subtitle center top-margin">
                  Update Password
                </div>
                <div className="form-control-create">
                  <div className="center small-pad">Old Password:</div>
                  <input
                    type="text"
                    className="form-field-create"
                    name="oldpassword"
                    value={oldpassword}
                    onChange={handleChange("oldpassword")}
                  />
                </div>
                <div className="form-control-create">
                  <div className="center small-pad">New Password:</div>
                  <input
                    type="text"
                    className="form-field-create"
                    name="newpassword"
                    value={newpassword}
                    onChange={handleChange("newpassword")}
                  />
                </div>
              </div>
              <button className="btn btn-margin" type="submit">
                Update Password
              </button>
            </form>

            <AddressForm />
          </div>
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log("ADMIN SETTINGS", state);
  return {
    user: state.authReducer,
    actionStatus: state.adminReducer.actionStatus,
    error: state.adminReducer.error
  };
};
export default connect(
  mapStateToProps,
  { updateUserInfo, getUserOrders }
)(UserSettings);
