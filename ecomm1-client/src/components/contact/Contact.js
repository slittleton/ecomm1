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
