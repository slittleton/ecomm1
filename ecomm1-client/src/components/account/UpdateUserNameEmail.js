import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateUserInfo,
  getUserInfo
} from "../../actions/userActions";

const UpdateUserNameEmail = props => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: ""
  });
  const { userName, email } = userInfo;

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      userName: props.user.userName,
      email: props.user.userEmail
    });
  }, [props.user]);

  const handleSubmitUser = e => {
    e.preventDefault();
    props.updateUserInfo({ name: userName, email: email }, props.user.userId);
  };
  const handleChange = val => async e => {
    await setUserInfo({ ...userInfo, [val]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmitUser} className="create-form">
      <div className="box">
        <div className="subtitle center top-margin">Username and Email</div>
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
  );
};
const mapStateToProps = state => {
  return {
    user: state.authReducer,
    error: state.authReducer.userSettingsError,
    success: state.authReducer.userSettingsSuccess
  };
};
export default connect(
  mapStateToProps,
  { updateUserInfo, getUserInfo }
)(UpdateUserNameEmail);
