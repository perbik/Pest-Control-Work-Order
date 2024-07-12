import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import "./Login.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="login">
      <form className="login-content" onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <div className="login-inputs">
          <div className="login-email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              required
            />
            {errors.email && (
              <span className="text-danger"> {errors.email}</span>
            )}
          </div>
          <div className="login-password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
              required
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
        </div>
        <button type="submit" className="login-button">
          Log in
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        <Link to="/signup" className="signup-span">
          Create account
        </Link>
      </form>
    </div>
  );
}

export default Login;
