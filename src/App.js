import React from "react";
import "./App.css";
import AllRidesPage from "./components/allRidesPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Please sign in</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          sign in
        </a>
      </header>
      <div className="main">
        <AllRidesPage />
      </div>
    </div>
  );
}

export default App;
