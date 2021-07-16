import React, { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import URL from "../url";
import axios from "../axy"
import ReactionsListUsers from "./ReactionsListUsers";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const ENDPOINT = URL + "/reactions";

let socket;

const Reactions = ({ msg }) => {
  const token =
  localStorage.getItem("userInfo") &&
  JSON.parse(localStorage.getItem("userInfo")).token;

  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const [reactions, setReactions] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/reactions/${msg._id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setReactions(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [msg,token,num]);

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    socket.emit("join", { messageId: msg._id });
    socket.on("getallreacts", (data) => {
      setNum(data.react);
    });
  }, [msg._id]);

  return (
    <>
      <div>
        {num !== 0 && <span onClick={(e) => handleOpen()}>{num}</span>}
      </div>
      

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper">
            <div className="inside-box">
              <h3 id="transition-modal-title">Reacts</h3>
            </div>
            {reactions?.map((reaction) => (
              <div key={reaction.userId._id} className="users">
                <div className="list-items">
                  <Link to={`/profile/${reaction.userId._id}`}>
                    <Avatar
                      alt={reaction.userId.username}
                      src={reaction.userId.image}
                    />
                  </Link>

                  <div style={{ marginLeft: 5 }}>
                    {reaction.userId.username}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </Modal>

    </>
  );
};

export default Reactions;
