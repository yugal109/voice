import React from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom"

import $ from 'jquery'

const Navbar = () => {
    useEffect(() => {
      $(".menu-toggle-btn").click(function() {
        $(this).toggleClassname("fa-times");
        $(".navigation-menu").toggleClassname("active");
      });

    }, []);

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
          <a href="#">
            {" "}
            <i className="fas fa-align-left about"> </i> About{" "}
          </a>
          <a href="#">
            {" "}
            <i className="fab fa-buffer works"> </i> Works{" "}
          </a>
          <a href="#">
            {" "}
            <i className="fas fa-users team"> </i> Team{" "}
          </a>
          <a href="#">
            {" "}
            <i className="fas fa-headset contact"> </i> Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
