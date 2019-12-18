import React from "react";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  return (
    <header className="App-header">
      <nav className="navigation">
        <Link className="logo" to="/">
          CARPOOL
        </Link>
        {props.loggedin ? (
          <Link to="/account" className="navOptions log">
            <i class="fa fa-user"></i>
          </Link>
        ) : (
          <>
            <Link to="/login" className="navOptions log">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
