import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import {
  sendMessage,
  setMessageError,
  setMessageData
} from "../../actions/contactAction";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Contact = props => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    messageText: ""
  });

  const { name, email, subject, messageText } = values;

  useEffect(() => {
    if (props.contact.messageData) {
      setTimeout(() => {
        props.setMessageData(null);
        setValues({ name: "", email: "", subject: "", messageText: "" });
      }, 3000);
    }
  }, [props.contact.messageData]);

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });

    if (props.contact.error) {
      props.setMessageError(null);
    }
    if (props.contact.messageData) {
      props.setMessageData(null);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const message = { name, email, subject, messageText };
    await props.sendMessage(message);
  };

  const showSuccess = () => {
    return (
      <div
        className="container"
        style={{ display: props.contact.messageData ? "" : "none" }}
      >
        <div className="success">
          Success, Your message has been sent successfully
        </div>
      </div>
    );
  };
  const showError = () => {
    return (
      <div
        className="container"
        style={{ display: props.contact.error ? "" : "none" }}
      >
        <div className="error">{props.contact.error}</div>
      </div>
    );
  };

  return (
    <Layout title="Contact" description="Feel free to send us a message">
      {showSuccess()}
      {showError()}
      <div className="container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange("name")}
              className="form-field"
              placeholder="Name"
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange("email")}
              className="form-field"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={handleChange("subject")}
              className="form-field"
              placeholder="Subject"
            />
          </div>
          <div className="form-control">
            <textarea
              rows="8"
              cols="50"
              type="text"
              name="messageText"
              value={messageText}
              onChange={handleChange("messageText")}
              className="form-field"
              placeholder="Please enter a message"
            />
          </div>
          <div className="form-btn">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  console.log("contact state: ", state);
  return {
    contact: state.contactReducer
  };
};

export default connect(
  mapStateToProps,
  { sendMessage, setMessageError, setMessageData }
)(Contact);
