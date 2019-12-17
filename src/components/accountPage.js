import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function AccountPage(props) {
  const userInfo = props.userInfo;
  console.log(userInfo);

  const cardContainer = (rides, title) => {
    if (rides && rides.length > 0) {
      return (
        <div className="postsContainer">
          <h1 className="frontTitle"> {title}</h1>
          {rides
            .sort(function(x, y) {
              return y.id - x.id;
            })
            .map(ride => {
              return (
                <div className="rideCard">
                  <div className="rideInfo">
                    <div className="location">
                      <p>{ride.pick_up}</p>
                      <p>
                        <i class="arrowright"></i>
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
                </div>
              );
            })}
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="account container">
      <div className="loggedinContainer">
        <Link to="/newride" className="navOptions log">
          Create a ride
        </Link>
        <Link onClick={props.loggout} className="navOptions log">
          Logout
        </Link>
      </div>
      {cardContainer(userInfo.posted_rides, "Upcoming trips")}
      {cardContainer(userInfo.booked_rides, "Booked trips")}
    </div>
  );
}

// <div className="postsContainer">

//        <h1 className="frontTitle"> Up coming trips</h1>
//        {userInfo.posted_rides &&
//          userInfo.posted_rides
//            .sort(function(x, y) {
//              return y.id - x.id;
//            })
//            .map(ride => {
//              return (
//                <div className="rideCard">
//                  <div className="rideInfo">
//                    <div className="location">
//                      <p>{ride.pick_up}</p>
//                      <p>
//                        <i class="arrowright"></i>

//                      </p>
//                      <p>{ride.drop_off}</p>
//                    </div>
//                    <div className="availability">
//                      {props.userInfo.id === ride.user_id ? (
//                        <p>
//                          {ride.vacant_seats - ride.taken_seats} seats available
//                          for your trip
//                        </p>
//                      ) : (
//                        <p>
//                          There are {ride.vacant_seats - ride.taken_seats} seats
//                          available
//                        </p>
//                      )}

//                      <p>{moment(ride.time, "HH:mm:ss").format("h:mm A")}</p>
//                    </div>
//                  </div>
//                </div>
//              );
//            })}
//      </div>
