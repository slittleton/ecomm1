import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteMessage,
  updateMessageStatus,
  getMessages,
  resetMessageStatus
} from "../../actions/adminActions";

const AdminMessageDisplay = props => {
  let { createdAt, email, messageText, name, subject, _id } = props.message;

  const [msgError = null, setMsgError] = useState();
  const [delSuccess = null, setDelSuccess] = useState();

  useEffect(() => {
    if (msgError || delSuccess) {
      setMsgError(null);
      setDelSuccess(null);
    }
    if (props.messageError || props.messageDeleted) {
      setTimeout(() => {
        setMsgError(true);
        setDelSuccess(true);
        props.resetMessageStatus(null);
        props.getMessages();
        props.setSelectedMessage(null);
      }, 1500);
    }
  }, [props.messageError, props.messageDeleted]);

  const showSuccess = () => {
    return (
      <div
        className="container"
        style={{ display: props.messageDeleted ? "" : "none" }}
      >
        <div className="success">Message Deleted</div>
      </div>
    );
  };

  const showError = () => {
    return (
      <div
        className="container"
        style={{ display: props.messageError ? "" : "none" }}
      >
        <div className="error">{props.messageError}</div>
      </div>
    );
  };

  return (
    <div className="display-box">
      <div className="subject-title"> Subject: {subject}</div>
      <div className="subject-title"> Name: {name}</div>
      <div className="subject-title"> Email: {email} </div>
      <div className="subject-title"> Date Received: {createdAt} </div>
      <div className="subject-title"> Message: </div>
      <div className="message-text">{messageText}</div>
      {showSuccess()}
      {showError()}
      <div className="spacer" style={{ display: "flex" }}>
        <button className="btn" onClick={() => props.updateMessageStatus(_id)}>
          Archive
        </button>
        <button className="btn" onClick={() => props.deleteMessage(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    messageError: state.contactReducer.error,
    messageDeleted: state.contactReducer.messageDeleted,
    messageArchived: state.contactReducer.messageArchived
  };
};
export default connect(
  mapStateToProps,
  { deleteMessage, updateMessageStatus, resetMessageStatus, getMessages }
)(AdminMessageDisplay);
