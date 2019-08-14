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
  const [archiveSuccess = null, setArchiveSuccess] = useState();

  useEffect(() => {
    if (msgError || delSuccess || archiveSuccess) {
      setMsgError(null);
      setDelSuccess(null);
      setArchiveSuccess(null);
    }
    if (props.messageError || props.messageDeleted || props.messageArchived) {
      setTimeout(() => {
        setMsgError(true);
        setDelSuccess(true);
        setArchiveSuccess(true)
        props.resetMessageStatus(null);
        props.getMessages();
        props.setSelectedMessage(null);
      }, 1500);
    }
  }, [props.messageError, props.messageDeleted, props.messageArchived]);

  const showSuccess = () => {
    if (props.messageDeleted) {
      return (
        <div
          className="container"
          style={{ display: props.messageDeleted ? "" : "none" }}
        >
          <div className="success">{props.messageDeleted}</div>
        </div>
      );
    }
    if (props.messageArchived) {
      return (
        <div
          className="container"
          style={{ display: props.messageArchived ? "" : "none" }}
        >
          <div className="success">{props.messageArchived}</div>
        </div>
      );
    }
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
