import React from "react";
// import { useEffect } from "react";

const Navbar = () => {
  //   useEffect(() => {
  //     const script = document.createElement("script");
  //     script.src = "../JS/Toogle.js";
  //     script.async = true;
  //     document.body.appendChild(script);
  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);

  return (
    <header>
      <div class="inner-width">
        <a href="https://www.instagram.com/aashish_xetri/" class="logo">
          {" "}
          <i class="fas fa-home"> School </i>{" "}
        </a>
        <i class="menu-toggle-btn fas fa-bars"> </i>
        <nav class="navigation-menu">
          <a href="#">
            {" "}
            <i class="fas fa-home home"> </i> Home{" "}
          </a>
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
