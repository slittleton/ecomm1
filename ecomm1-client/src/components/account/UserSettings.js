import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AddressForm from "./AddressForm";
import { updateUserInfo, getUserOrders } from "../../actions/userActions";
import UpdateUserNameEmail from "./UpdateUserNameEmail";
import UpdatePassword from "./UpdatePassword";
import UserActionMessage from "./UserActionMessage";
import UserInfo from "./UserInfo";

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
  const [history, setHistory] = useState("");

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

  useEffect(() => {
    const { userHistory } = props.user;
    if (props.user.userHistory) {
      setHistory(userHistory);
    }
  }, [props.user.userHistory]);

  return (
    <div className="">
      <Layout
        title="user Account - Settings"
        description={`Welcome ${
          props.user.userName ? props.user.userName : null
        }`}
      >
        <div className="devmode-title">
          This Website Is Only A Demonstration
        </div>
        <div className="settings container ">
          <UserInfo
            history={history}
            user={{ userName, email }}
            address={{ name, street, city, state, zipcode }}
          />
          <div className="">
            <div className="title">Update User Information</div>
            <UserActionMessage />
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
