import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Redirect } from "react-router-dom";
import { signIn,setErrorStatus } from "../../actions/authActions";
import { connect } from "react-redux";
import SigninForm from "./SigninForm";

const Signin = props => {
  const [values, setValues] = useState({
    email: "admin@email.com",
    password: "password",
    redirect: false
  });

  const { email, password, redirect } = values;

  useEffect(() => {

    if (redirect) {
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

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });

    if(props.user.error){props.setErrorStatus(false);};
  };
  const handleSubmit = async e => {
    e.preventDefault();
    await props.signIn(email, password);
  };

  const showSuccess = () => {
    return (
      <div
        className="container"
        style={{ display: props.user.signInStatus ? "" : "none" }}
      >
        <div className="success">
          Success, You Have Been Signed In
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
    <Layout title="Sign In" description="Please Sign In To Your Account">
      {showSuccess()}
      {showError()}
      <SigninForm
        email={email}
        password={password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {redirectOnSuccess()}
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
  { signIn, setErrorStatus }
)(Signin);
