import React, { useState } from "react";
import { axiosWithAuth } from "./configurations/axiosConfig";
import moment from "moment";
import image from "../images/newrideimage.svg";

export default function RideForm(props) {
  const [newRide, setNewRide] = useState({ date: moment(new Date()).format() });

  const registerData = rideInfo => {
    // creds.preventDefault();
    axiosWithAuth()
      .post("https://carpoolbackend.herokuapp.com/api/rides", rideInfo)
      .then(res => {
        console.log(res.data);
        props.history.push("/")
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setNewRide({
      ...newRide,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    registerData(newRide);
  };

  return (
    <div className="formConatiner">
      {console.log(newRide)}
      <img src={image} className="svg" />

      <form className="signupForm" onSubmit={login}>
        <h1 className="formheader">Why Travel Alone?</h1>
        <div className="radiosection">
          <h3>Type of Vehicle:</h3>
          <div className="radioContainer">
            <input
              type="radio"
              placeholder="vehicle type"
              onChange={handleChange}
              value="car"
              name="vehicle_type"
            />
            Car <br />
            <input
              type="radio"
              placeholder="vehicle type"
              onChange={handleChange}
              value="bike"
              name="vehicle_type"
            />
            Bike <br />
          </div>
        </div>

        <input
          placeholder="vehicle number"
          type="text"
          className="FormInput"
          onChange={handleChange}
          name="vehicle_no"
        />
        <input
          placeholder="Details"
          className="FormInput"
          onChange={handleChange}
          name="description"
        />
        <input
          placeholder="Pick up location"
          type="text"
          className="FormInput"
          onChange={handleChange}
          name="pick_up"
        />
        <input
          placeholder="Destination"
          type="text"
          className="FormInput"
          onChange={handleChange}
          name="drop_off"
        />
        <input
          placeholder="vacant seats"
          type="number"
          className="FormInput"
          onChange={handleChange}
          name="vacant_seats"
        />
        {/* <input
          placeholder="date"
          type="date"
          onChange={handleChange}
          name="date"
        /> */}
        <input
          className="time"
          placeholder="time"
          type="time"
          onChange={handleChange}
          name="time"
        />
        <button className="formbutton">Create Trip</button>
      </form>
    </div>
  );
}
