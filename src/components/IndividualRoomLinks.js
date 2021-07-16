import React, { useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";
import jwt from "jsonwebtoken";
import "../css/individual.css";
import { Button, TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "../axy";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 500,
  },
}));

const IndividualRoomLinks = ({ ibx }) => {
  const user =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));
  const classes = useStyles();
  const Link = jwt.sign({ roomid: ibx._id }, "mysecretkey101");
  const [link, setLink] = useState(false);
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  const handleOpen = () => {
    axios
      .get(`/friends/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.token,
        },
      })
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = (id) => {
    axios
      .post(
        "/requests/invite",
        {
          acceptor: id,
          requestor: user.id,
          link:Link,
          roomName:ibx?.name
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": user.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="individual-chat"
      style={{ display: "flex", flexDirection: "column", padding: 20 }}
    >
      <div className="top">
        <div className="room-name">{ibx?.name}</div>
        <div className="room-name" onClick={handleOpen}>
          Invite
        </div>

        {!link ? (
          <KeyboardArrowDownIcon
            onClick={() => setLink(!link)}
            style={{ fontSize: 50, color: "rgb(12, 207, 159)" }}
          />
        ) : (
          <>
            <KeyboardArrowUpIcon
              onClick={() => setLink(!link)}
              style={{ fontSize: 50, color: "rgb(12, 207, 159)" }}
            />
          </>
        )}
      </div>
      {link && (
        <div
          style={{
            wordBreak: "break-all",
            backgroundColor: "white",
            padding: 10,
            // marginBottom: 10,
            marginTop: 10,
          }}
        >
          {Link}
        </div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Invite Friends</h2>
            {friends?.map((friend) => (
              <div key={friend._id} className="friends-list">
                <div>{friend?.userId?.username}</div>
                <div
                  onClick={() => handleInvite(friend?.userId._id)}
                  className="invite"
                >
                  Invite
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default IndividualRoomLinks;
