import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { axiosWithAuth } from "./configurations/axiosConfig";

export default function AllRidesPage(props) {
  const [rides, setRides] = useState({});
  const [search, setSearch] = useState({
    pick_up: "",
    drop_off: "",
    vehicle_type: "all",
    time: false
  });
  const [bookRide, setBookride] = useState(false);

  useEffect(() => {
    axios
      .get("https://carpoolbackend.herokuapp.com/api/rides/")
      .then(res => {
        console.log(res.data);
        setRides(res.data);
        setBookride(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [bookRide, props.loggedin,props.userInfo.id  ]);

  const resetSearch = () => {
    setSearch({
      pick_up: "",
      drop_off: "",
      vehicle_type: "all",
      time: false
    });
  };

  const submitBooking = rideId => {
    axiosWithAuth()
      .post("api/booked", {
        ride_id: rideId
      })
      .then(res => {
        setBookride(true);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleSearch = e => {
    e.preventDefault();
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {console.log(search)}
      {!props.loggedin ? (
        <h1 className="frontTitle">Sign Up Now to Book Your Ride</h1>
      ) : (
        <h1 className="frontTitle">Book your ride</h1>
      )}
<div>
  
</div>
      <input
        className="textInput"
        onChange={handleSearch}
        name="pick_up"
        placeholder="Pick up"
        value={search.pick_up}
      />
      <div className="next">
      <i class="inputArrow"></i>
      </div>
      <input
        className="textInput"
        onChange={handleSearch}
        name="drop_off"
        placeholder="Destination"
        value={search.drop_off}
      />
      <select onChange={handleSearch} name="vehicle_type">
        <option value="all">All</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
      </select>
      <input type="time" className="timeInput" onChange={handleSearch} name="time" />
      {!search.time && search.pick_up === "" && search.drop_off === "" ? (
        ""
      ) : (
        <button className="log"onClick={resetSearch}>clear</button>
      )}
      <div className="ridesList">
        {rides.length > 0 &&
          rides
            .sort(function(x, y) {
              return y.id - x.id;
            })
            .filter(ride =>
              ride.pick_up.toLowerCase().includes(search.pick_up.toLowerCase())
            )
            .filter(ride =>
              ride.drop_off
                .toLowerCase()
                .includes(search.drop_off.toLowerCase())
            )
            .filter(ride => {
              if (search.vehicle_type === "all") {
                return ride.vehicle_type;
              } else {
                return ride.vehicle_type.includes(search.vehicle_type);
              }
            })
            .filter(ride => {
              if (!!search.time) {
                const ride_time =
                  ride.time.substring(0, 2) - search.time.substring(0, 2);
                return (
                  ride_time === -1 ||
                  ride_time === 0 ||
                  ride_time === 1 ||
                  ride_time === 23
                );
              } else {
                return ride;
              }
            })
            .map(ride => {
              return (
                <div className="rideCard">
                  <div className="rideInfo">
                    <div className="location">
                      <p>{ride.pick_up}</p>
                      <p>
                        <i class="arrowright"></i>{" "}
                        <i class="arrowright mobileNone"></i>{" "}
                        <i class="arrowright mobileNone"></i>
                      </p>
                      <p>{ride.drop_off}</p>
                    </div>
                    <div className="availability">
                      {props.userInfo.id === ride.user_id ? (
                        <p>
                          {ride.vacant_seats - ride.taken_seats} seats available
                          for your trip
                        </p>
                      ) : (
                        <p>
                          There are {ride.vacant_seats - ride.taken_seats} seats
                          available
                        </p>
                      )}

                      <p>{moment(ride.time, "HH:mm:ss").format("h:mm A")}</p>
                    </div>
                  </div>
                  {props.loggedin  && props.userInfo.id === ride.user_id   ? (
                    ""
                  ) : (
                    <button
                      className="bookButton"
                      disabled={
                        !ride.availability ||
                        props.loggedin === false ||
                        props.userInfo.id === ride.user_id
                          ? "true"
                          : ""
                      }
                      onClick={() => {
                        submitBooking(ride.id);
                      }}
                    >
                      {!ride.availability ? "Full" : "Book Now"}
                    </button>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}
