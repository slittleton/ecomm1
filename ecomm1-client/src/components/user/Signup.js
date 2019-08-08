import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import { signUp } from "../../actions/authActions";
import { connect } from 'react-redux';

const SignUp = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(values);
    props.signUp(name, email, password);
  };

  const signupForm = () => {
    return (
      <div className="container">
        <form className="authForm" onSubmit={handleSubmit}>
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
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange("password")}
              className="form-field"
              placeholder="Password"
            />
          </div>
          <div className="form-btn">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Layout title="Sign Up" description="Please Sign Up To Create An Account">
      {signupForm()}
    </Layout>
  );
};
const mapStateToProps = state => {
  console.log('from state', state);
  return {
    user: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
