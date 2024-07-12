import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (!errors.name && !errors.email && !errors.password) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          navigate("/"); // Navigate to login page after successful signup
        })
        .catch((err) => console.error(err));
    }
  };
  
  return (
    <div className="signup">
      <form className="signup-content" action="" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div className="signup-inputs">
          <div className="signup-name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger"> {errors.name}</span>}
          </div>
          <div className="signup-email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger"> {errors.email}</span>
            )}
          </div>
          <div className="signup-password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
        </div>
        <button type="submit" className="signup-button">
          Sign up
        </button>
        <div className="signup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        <Link to="/" className="login-span">
          Log in
        </Link>
      </form>
    </div>
  );
}

export default Signup;
