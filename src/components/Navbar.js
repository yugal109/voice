import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import $ from "jquery";
import Badge from "@material-ui/core/Badge";
import io from "socket.io-client";
import URL from "../url";
import axios from "../axy";
const ENDPOINT = URL + "/requests";
let socket;

const Navbar = () => {
  const [count, setCount] = useState(0);
  const [inviteCount, setInviteCount] = useState(0);
  const [reqAccept, setReqAccept] = useState(0);
  socket = io.connect(ENDPOINT);
  const usr =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));
  const handel = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  useEffect(() => {
    $(".menu-toggle-btn").click(function () {
      $(this).toggleClass("fa-times");
      $(".navigation-menu").toggleClass("active");
    });
  }, [$]);

  useEffect(() => {
    socket.emit("join", usr.id);
    socket.on("notifications", (data) => {
      handel("https://freesound.org/data/previews/316/316798_5383582-lq.mp3");
      setCount(data);
    });

    socket.on("accepted", (data) => {
      console.log("The data is ", data);
      setInviteCount(1);
    });

    return () => {
      socket.off();
    };
  }, [usr]);

  useEffect(() => {
    if (usr) {
      axios
        .get("/requests/addfriend", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": usr.token,
          },
        })
        .then((response) => {
          setCount(response.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [usr]);



  return (
    <header>
      <div className="top">
        <div className="web-name">
          <Link to="/">
            <i style={{ color: "white" }} className="fas fa-home">
              {" "}
              Voice{" "}
            </i>{" "}
          </Link>
        </div>
        <div className="items">
          <i className="menu-toggle-btn fas fa-bars"> </i>

          <nav className="navigation-menu">
            <Link style={{ textDecoration: "none" }} to="/">
              {" "}
              <i className="fas fa-home home"> </i> Home{" "}
            </Link>

            {usr ? (
              <>
                <Link style={{ textDecoration: "none" }} to="/join">
                  {" "}
                  <i className="fas fa-align-left about"> </i> Join{" "}
                </Link>
                <Link style={{ textDecoration: "none" }} to="/inbox">
                  {" "}
                  <i className="fas fa-align-left about"> </i> Room Links{" "}
                </Link>
                <Link style={{ textDecoration: "none" }} to="/search">
                  {" "}
                  <i className="fas fa-align-left about"> </i> Search{" "}
                </Link>
                <Link style={{ textDecoration: "none" }} to="/sign-out">
                  {" "}
                  <i className="fas fa-users team"> </i> Sign-Out{" "}
                </Link>
                <Link style={{ textDecoration: "none" }} to="/requests">
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 16,
                    }}
                  >
                    <i className="fas fa-users team"> </i> Requests
                    <Badge badgeContent={count + inviteCount} color="secondary">
                      <NotificationsIcon style={{ fontSize: 20 }} />
                    </Badge>
                  </div>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${usr.id}`}
                >
                  {" "}
                  <i className="fas fa-users team"> </i> Profile{" "}
                </Link>
              </>
            ) : (
              <>
                <Link style={{ textDecoration: "none" }} to="/sign-in">
                  {" "}
                  <i className="fab fa-buffer works"> </i> Sign-In{" "}
                </Link>
                <Link style={{ textDecoration: "none" }} to="/sign-up">
                  {" "}
                  <i className="fas fa-users team"> </i> Sign-Up{" "}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
