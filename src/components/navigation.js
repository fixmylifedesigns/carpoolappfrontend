import React from "react";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  return (
    <header className="App-header">
      <nav className="navigation">
        <Link className="logo" to="/">
          CARPOOL
        </Link>
        {/* <div> */}

        {props.loggedin ? (
          <div className="loggedinContainer">
            <Link to="/newride" className="navOptions log">
              Create a ride
            </Link>
            <Link onClick={props.loggout} className="navOptions log">
              Logout
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="navOptions log">
              Login
            </Link>
          </>
        )}
        {/* </div> */}
      </nav>
    </header>
  );
}
