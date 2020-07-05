import React, { useState } from "react";
import "./index.css";
import { authenticate, signin } from "./apicalls/authapicalls";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const { email, password, error, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((error) => console.log("Signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="m-2 text-left ">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const emailSigninForm = () => {
    return (
      <div className="row">
        <div className="col-md-12 offset-sm-12 text-left standard-shadow">
          <form>
            <div className="form-group mt-4">
              <label className="text-light">Email</label>
              <input
                type="text"
                value={email}
                onChange={handleChange("email")}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
                className="form-control"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-primary mb-4">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="home">
      <div className="main-container">
        <div className="login-container">
          <div className="logo"></div>
          <div className="login-method"></div>
          <div className="form-box">
            {errorMessage()}
            {emailSigninForm()}
            {performRedirect()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
