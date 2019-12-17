import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import image from "../images/signupimage.svg";

export default function Registration(props) {
  const [credentials, setCredentials] = useState({});
  console.log(props.history);
  const registerData = creds => {
    axios
      .post("https://carpoolbackend.herokuapp.com/api/register/", creds)
      .then(res => {
        // console.log(res.data)
        props.history.push("/login");
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    registerData(credentials);
  };

  return (
    <div className="formConatiner">
      {console.log(credentials)}
      <img src={image} className="svg" />
      <form className="loginForm" onSubmit={login}>
        <h1 className="formheader">Why Uber When You Can Pool</h1>
        <input
          placeholder="Email"
          label="Email"
          className="FormInput"
          onChange={handleChange}
          name="email"
        />
        <input
          placeholder="First Name"
          label="first_name"
          className="FormInput"
          name="first_name"
          onChange={handleChange}
        />

        <input
          placeholder="Last Name"
          label="last_name"
          className="FormInput"
          name="last_name"
          onChange={handleChange}
        />

        <input
          placeholder="Password"
          className="FormInput"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          name="password"
        />
        <button className="formbutton">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
