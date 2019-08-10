import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Redirect } from "react-router-dom";
import {
  signIn,
  authenticate,
  isAuthenticated
} from "../../actions/authActions";
import { connect } from "react-redux";
import SigninForm from "./SigninForm";

const Signin = props => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redir: false
  });
  const { email, password, error, loading, redir } = values;

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    await signIn(email, password);
  };

  const onSignInSuccess = () => {
    if (redir) {
      if (props.user.isAdmin) {
        return <Redirect to="/admin/dash" />;
      } else {
        return <Redirect to="/user/dash" />;
      }
    }
  };

  // const signinForm = () => {
  //   return (
  //     <div className="container">
  //       <form className="authForm" onSubmit={handleSubmit}>
  //         <div className="form-control">
  //           <input
  //             type="email"
  //             name="email"
  //             value={email}
  //             onChange={handleChange("email")}
  //             className="form-field"
  //             placeholder="Email"
  //           />
  //         </div>
  //         <div className="form-control">
  //           <input
  //             type="password"
  //             name="password"
  //             value={password}
  //             onChange={handleChange("password")}
  //             className="form-field"
  //             placeholder="Password"
  //           />
  //         </div>
  //         <div className="form-btn">
  //           <button className="btn">Submit</button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  return (
    <Layout title="Sign In" description="Please Sign In To Your Account">
      {/* {signinForm()} */}
      <SigninForm
        email={email}
        password={password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {onSignInSuccess()}
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
  {}
)(Signin);
