import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import "../css/navbar.css"

import $ from 'jquery'

const Navbar = () => {
  const usr = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))
  
  useEffect(() => {
    

    $(".menu-toggle-btn").click(function () {
      $(this).toggleClass("fa-times");
      $(".navigation-menu").toggleClass("active");
    });

  }, [$]);

  


  return (

    <header>
      <div className="top">
        <div>
          <Link to="/" className="logo" style={{ fontSize: 20 }}>
            {" "}
            <i className="fas fa-home"> Voice </i>{" "}
          </Link>
        </div>
        <div className="items">

          <i className="menu-toggle-btn fas fa-bars"> </i>

          <nav className="navigation-menu">
            <Link to="/">
              {" "}
              <i className="fas fa-home home"> </i> Home{" "}
            </Link>
            <Link to="/about">
              {" "}
              <i className="fas fa-align-left about"> </i> About{" "}
            </Link>
            {usr ?<>
              <Link to="/sign-out">
                {" "}
                <i className="fas fa-users team"> </i> Sign-Out{" "}
              </Link>
              <Link to={`/profile/${usr.id}`}>
                {" "}
                <i className="fas fa-users team"> </i> Profile{" "}
              </Link>
              </>:
              <>
                <Link to="/sign-in">
                  {" "}
                  <i className="fab fa-buffer works"> </i> Sign-In{" "}
                </Link>
                <Link to="/sign-up">
                  {" "}
                  <i className="fas fa-users team"> </i> Sign-Up{" "}
                </Link>
              </>
            }

          </nav>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
