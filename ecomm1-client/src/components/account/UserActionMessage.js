import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {
  setUserSettingsError,
  setUserSettingsSuccess
} from "../../actions/userActions";

const UserActionMessage = (props) => {
  const [messageTypes, setMessageTypes] = useState({
    success: false,
    error: false,
  })
  const {success, error} = messageTypes;

  useEffect(() => {
    if (error) {
      setMessageTypes({ ...messageTypes, error: false });
    }
    if (props.user.userSettingsError) {
      setMessageTypes({ ...messageTypes, error: true });
      setTimeout(() => {
        setMessageTypes({ ...messageTypes, error: false });
      }, 3000);
    }
  }, [props.user.userSettingsError]);

  useEffect(() => {
    if (success) {
      setMessageTypes({ ...messageTypes, success: false });
    }
    if (props.user.userSettingsSuccess) {
      setMessageTypes({ ...messageTypes, success: true });
      setTimeout(() => {
        setMessageTypes({ ...messageTypes, success: false });
      }, 3000);
    }
  }, [props.user.userSettingsSuccess]);

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
    return(
      <div className="container">
        {showError()}
        {showSuccess()}
      </div>
    )
}
const mapStateToProps = state => {
  return {
    user: state.authReducer,
    actionStatus: state.adminReducer.actionStatus,
    error: state.adminReducer.error
  };
};

export default connect(mapStateToProps, {setUserSettingsError, setUserSettingsSuccess})(UserActionMessage);