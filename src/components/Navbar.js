import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom"

import $ from 'jquery'

const Navbar = () => {
  useEffect(() => {

    $(".menu-toggle-btn").click(function () {
      $(this).toggleClass("fa-times");
      $(".navigation-menu").toggleClass("active");
    });
    
  }, [$]);

  // const usr=localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).username

  return (
    <header>
      <div className="inner-width">
        <a href="https://www.instagram.com/aashish_xetri/" className="logo">
          {" "}
          <i className="fas fa-home"> School </i>{" "}
        </a>
        <i className="menu-toggle-btn fas fa-bars"> </i>
        <nav className="navigation-menu">
          <Link to="/">
            {" "}
            <i className="fas fa-home home"> </i> Home{" "}
          </Link>
          <Link to="/sign-in">
            {" "}
            <i className="fas fa-align-left about"> </i> About{" "}
          </Link>
          <Link to="/sign-up">
            {" "}
            <i className="fab fa-buffer works"> </i> Works{" "}
          </Link>
          <Link to="/sign-out">
            {" "}
            <i className="fas fa-users team"> </i> Team{" "}
          </Link>
          <Link to="#">
            {" "}
            <i className="fas fa-headset contact"> </i> Contact
          </Link>
          
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
