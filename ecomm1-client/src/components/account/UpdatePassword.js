import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateUserInfo,
  getUserInfo,
  setUserSettingsError
} from "../../actions/userActions";

const UpdatePassword = props => {
  const [passwords, setPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const { oldPassword, newPassword } = passwords;

  useEffect(() => {}, [props.user]);

  const handleSubmitPassword = e => {
    e.preventDefault();

    if (
      oldPassword === "" ||
      newPassword === ""
    ) {
      props.setUserSettingsError("Please Fill In All Password Fields");
    } else {
      let password ={ oldPassword, newPassword}
      props.updateUserInfo({ password }, props.user.userId);
    }
  };

  const handleChange = val => async e => {
    await setPassword({ ...passwords, [val]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmitPassword} className="create-form">
      <div className="box">
        <div className="subtitle center top-margin">Update Password</div>
        <div className="form-control-create">
          <div className="center small-pad">Old Password:</div>
          <input
            type="text"
            className="form-field-create"
            name="oldPassword"
            value={oldPassword}
            onChange={handleChange("oldPassword")}
          />
        </div>
        <div className="form-control-create">
          <div className="center small-pad">New Password:</div>
          <input
            type="text"
            className="form-field-create"
            name="newPassword"
            value={newPassword}
            onChange={handleChange("newPassword")}
          />
        </div>
      </div>
      <button className="btn btn-margin" type="submit">
        Update Password
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
  { updateUserInfo, setUserSettingsError, getUserInfo }
)(UpdatePassword);
