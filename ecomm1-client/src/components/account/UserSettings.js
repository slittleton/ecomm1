import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import AddressForm from "./AddressForm";
import { updateUserInfo, getUserOrders } from "../../actions/userActions";
import UpdateUserNameEmail from "./UpdateUserNameEmail";
import UpdatePassword from "./UpdatePassword";
import UserActionMessage from "./UserActionMessage";

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

  return (
    <div className="">
      <Layout
        title="Admin Account - Settings"
        description={`Welcome ${
          props.user.userName ? props.user.userName : null
        }`}
        accountMenu={<AdminMenu />}
      >

        <div className="settings container ">
          <div className="box darkgray-back">
            <div className="title">Current User Information</div>
            <div className="box">
              <div className="tiny-pad">Username: {userName}</div>
              <div className="tiny-pad">Email: {email}</div>
            </div>
            <div className="tiny-pad box">
              Address:
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
            </div>
          </div>

          <div className="">
            <div className="title">Update User Information</div>
            <UserActionMessage/>
            <UpdateUserNameEmail />
            <UpdatePassword />
            <AddressForm />
          </div>
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
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
