import React from 'react';


const SigninForm = ({ email, password, handleChange, handleSubmit}) => {

  return (
    <div className="container">
      <form className="authForm" onSubmit={handleSubmit}>
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

export default SigninForm;
