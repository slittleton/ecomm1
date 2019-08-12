import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { sendMessage } from "../../actions/contactAction";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


const Contact = props => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    messageText: "",
    redirect: false
  });

  const { name, email, subject, messageText, redirect } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });

    if(props.user.error){props.setErrorStatus(false);};
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const message = {name, email, subject, messageText}
    await props.sendMessage(message);
  };


  return (
    <Layout title="Contact" description="Feel free to send us a message">
<div className="container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="name"
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
          rows="8" cols="50"
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
  return {
    user: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { sendMessage }
)(Contact);
