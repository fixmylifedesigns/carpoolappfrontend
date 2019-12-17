import React, { useState, useEffect } from "react";
import "./App.css";
import AllRidesPage from "./components/allRidesPage";
import Registration from "./components/registration";
import Login from "./components/login";
import RideForm from "./components/rideForm";
import { Route, Link } from "react-router-dom";
import Navigation from "./components/navigation";
import PrivateRoute from "./components/configurations/privateRoute";
import { UserContext } from "./components/configurations/context";
import { axiosWithAuth } from "./components/configurations/axiosConfig";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [userInfo, setUserInfo] = useState({ id: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedin(true);
      axiosWithAuth()
        .get("/api/users/")
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedin]);

  const login = () => {
    setLoggedin(true);
  };

  const loggout = () => {
    setLoggedin(false);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ login, userInfo }}>
      <div className="gradient">
        <div className="gradient-2" />
        <div className="gradient-3" />
      </div>
      <div className="App">
        <Navigation loggedin={loggedin} loggout={loggout} />
        <div className="main">
          <Route
            exact
            path="/"
            render={() => (
              <AllRidesPage loggedin={loggedin} userInfo={userInfo} />
            )}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <PrivateRoute
            exact
            path="/newride"
            component={RideForm}
            loggedin={loggedin}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
