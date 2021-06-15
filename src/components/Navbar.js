import React from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom"

import $ from 'jquery'

const Navbar = () => {
    useEffect(() => {
      $(".menu-toggle-btn").click(function() {
        $(this).toggleClass("fa-times");
        $(".navigation-menu").toggleClass("active");
      });

    }, []);

  return (
    <header>
      <div class="inner-width">
        <a href="https://www.instagram.com/aashish_xetri/" class="logo">
          {" "}
          <i class="fas fa-home"> School </i>{" "}
        </a>
        <i class="menu-toggle-btn fas fa-bars"> </i>
        <nav class="navigation-menu">
          <Link to="/">
            {" "}
            <i class="fas fa-home home"> </i> Home{" "}
          </Link>
          <a href="#">
            {" "}
            <i class="fas fa-align-left about"> </i> About{" "}
          </a>
          <a href="#">
            {" "}
            <i class="fab fa-buffer works"> </i> Works{" "}
          </a>
          <a href="#">
            {" "}
            <i class="fas fa-users team"> </i> Team{" "}
          </a>
          <a href="#">
            {" "}
            <i class="fas fa-headset contact"> </i> Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
