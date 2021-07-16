import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import axios from "../axy";
import { Link } from "react-router-dom";
import "../css/detail.css";

const token =
  localStorage.getItem("userInfo") &&
  JSON.parse(localStorage.getItem("userInfo")).token;

const ReactionsListUsers = ({ msg }) => {
  const [open, setOpen] = React.useState(true);
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
  }, [msg]);

  return (
    <>
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

export default ReactionsListUsers;
