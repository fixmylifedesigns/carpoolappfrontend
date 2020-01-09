import React from "react";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footerContent">
          <h3 className="footerText">CARPOOL</h3>
        <div className="linkscontainer">
                   <p className="footerText">
          Design by <a href="https://www.duranirving.com">Irving Jose Duran</a>
        </p>
        <p className="footerText">
          Illustrations by <a href="https://undraw.co/">Undraw</a>{" "}
        </p>
        <div className="repolinks">
          <a href="https://documenter.getpostman.com/view/7133880/SWECWFKD">
            Api Docs
          </a>
          <a href="https://github.com/fixmylifedesigns/carpoolappfrontend">
            Front-End Github
          </a>
          <a href="https://github.com/fixmylifedesigns/carpoolappbackend">
            Back-End Github
          </a>
        </div>
        </div>
 
      </div>
    </footer>
  );
}
