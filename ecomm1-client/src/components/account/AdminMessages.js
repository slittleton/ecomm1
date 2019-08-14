import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import AdminMenu from "../layout/AdminMenu";
import { getMessages, updateMessageStatus } from "../../actions/adminActions";

import AdminMessageDisplay from "./AdminMessageDisplay";

const AdminMessages = props => {
  const [selectedMessage = null, setSelectedMessage] = useState();

  useEffect(() => {
    props.getMessages();
  }, []);

  const handled = () => {
    if (props.messages) {
      return props.messages.filter(message => {
        return message.responded !== false;
      });
    }
  };
  const unhandled = () => {
    if (props.messages) {
      return props.messages.filter(message => {
        return message.responded !== true;
      });
    }
  };

  const handledList = () => {
    if (props.messages) {
      let messages = handled();

      return messages.map((message, index) => {
        return (
          <div
            className="list-item message-link"
            key={message._id}
            onClick={() => {
              setSelectedMessage(message);
            }}
          >
            <div className="message-num">{parseInt(index) + 1}</div>
            <div className="messageinfo">
              <div className="list-sub-item">email: {message.email}</div>
              <div className="list-sub-item">subject: {message.subject}</div>
            </div>
          </div>
        );
      });
    }
  };

  const displayedMessage = () => {
    if (selectedMessage) {
      return (
        <AdminMessageDisplay
          message={selectedMessage}
          setSelectedMessage={setSelectedMessage}
        />
      );
    }
  };

  const unhandledList = () => {
    if (props.messages) {
      let messages = unhandled();

      return messages.map((message, index) => {
        return (
          <div
            className="list-item message-link"
            key={message._id}
            onClick={() => {
              setSelectedMessage(message);
            }}
          >
            <div className="message-num">{parseInt(index) + 1}</div>
            <div className="messageinfo">
              <div className="list-sub-item">email: {message.email}</div>
              <div className="list-sub-item">subject: {message.subject}</div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="">
      <Layout
        title="Admin Account - Messages"
        description={`Welcome `}
        accountMenu={<AdminMenu />}
      >
        <div className="box">
          <div className="messages-container">
            <div className="messageslist">
              <h3 className="admin-title">List Of Messages</h3>
              <div className="unhandledlist">
                <div className="list-title">Response Needed</div>
                {unhandledList()}
              </div>
              <div className="handledlist">
                <div className="list-title">Archive</div>
                {handledList()}
              </div>
            </div>
            <div className="messages-box">
              <div className="message-view-title">Selected Message</div>

              {console.log(props.contact)}

              {displayedMessage()}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.authReducer,
    messages: state.contactReducer.messages,
    contact: state.contactReducer
  };
};
export default connect(
  mapStateToProps,
  { getMessages, updateMessageStatus }
)(AdminMessages);
