import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Redirect } from "react-router-dom";
import { signUp, setSignInStatus } from "../../actions/authActions";
import { connect } from "react-redux";
import SignupForm from "./SignupForm";

const SignUp = props => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    redirect: false
  });

  const { name, email, password, redirect } = values;

  useEffect(() => {

    if(redirect){
      setValues({ ...values, redirect: false });
    }

    if (props.user.signInStatus) {
      setTimeout(() => {
        setValues({ ...values, redirect: true });
      }, 3000);
    }
  }, [props.user.signInStatus]);

  const redirectOnSuccess = () => {
    if (redirect) {
      if (props.user.isAdmin) {
        return <Redirect to="/" />;
      }
      if (!props.user.isAdmin) {
        return <Redirect to="/" />;
      }
    }
  };

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.signUp(name, email, password);
  };


  const showSuccess = () => {
    return (
      <div
        className="container"
        style={{ display: redirect ? "" : "none" }}
      >
        <div className="success">
          Account Created, You Have Been Automatically Signed In
        </div>
      </div>
    );
  };
  const showError = () => {
    return (
      <div
        className="container"
        style={{ display: props.user.error ? "" : "none" }}
      >
        <div className="error">{props.user.error}</div>
      </div>
    );
  };

  return (
    <Layout title="Sign Up" description="Please Sign Up To Create An Account">
      {showSuccess()}
      {showError()}
      {redirectOnSuccess()}
      <SignupForm
        name={name}
        email={email}
        password={password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};
const mapStateToProps = state => {
  console.log("State - Signup Component:", state);
  return {
    user: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { signUp, setSignInStatus }
)(SignUp);
