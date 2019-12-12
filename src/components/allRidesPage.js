import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
export default function AllRidesPage() {
  const [rides, setRides] = useState({});

  useEffect(() => {
    axios
      .get("https://carpoolbackend.herokuapp.com/api/rides/")
      .then(res => {
        console.log(res.data);
        setRides(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Book your ride</h1>
      <form>
        <input />
        <input />
        <input />
        <button>submit</button>
      </form>
      <div className="ridesList">
        {rides.length > 0 &&
          rides.map(ride => {
            return (
              <div
                style={{
                  border: "solid grey 1px",
                  marginTop: "",
                  width: "80%",
                  margin:"5px auto "
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>
                    {ride.pick_up} to {ride.drop_off}
                  </p>
              <p>there are {ride.vacant_seats - ride.taken_seats} seats available</p>
                  <p>{moment(ride.time).format("LT")}</p>
                  <button>Book Now</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// availability: true
// created_at: "2019-12-12T18:36:53.180Z"
// description: "I will be outside the building"
// drop_off: "new jersey"
// drop_off_latitude: null
// drop_off_longitude: null
// id: 1
// pick_up: "new york"
// pick_up_latitude: null
// pick_up_longitude: null
// taken_seats: 1
// time: "2018-11-29T00:00:00.000Z"
// updated_at: "2019-12-12T18:36:53.180Z"
// user_id: 1
// vacant_seats: 3
// vehicle_no: "he82d2"
// vehicle_type: "car"
