import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "./configurations/context";
import image from "../images/loginimage.svg";

export default function Login(props) {
  const [credentials, setCredentials] = useState({});
  const user = useContext(UserContext);

  const registerData = creds => {
    axios
      .post("https://carpoolbackend.herokuapp.com/api/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        user.login();
        props.history.push(`/`);
        console.log(res.data);
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
      <img src={image} className="svg" />
      <form className="loginForm" onSubmit={login}>
        <h1 className="formheader">Log In Now To Book Your Next Ride</h1>
        <input
          placeholder="Email"
          className="FormInput"
          label="Email"
          onChange={handleChange}
          name="email"
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
        <button className="formbutton">Log In</button>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
