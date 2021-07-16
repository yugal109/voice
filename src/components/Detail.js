import React, { useEffect, useMemo, useState } from "react";
import "../css/detail.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import axios from "../axy";
import { Link } from "react-router-dom";

const Detail = ({ roomId }) => {
  const token =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo")).token;

  //   const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [usersList, setUsersList] = useState([]);
  const [adminOfRoom, setAdminOfRoom] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/users_in_room/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setAdminOfRoom(response.data.admin);
        setUsersList(response.data.usersList.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, roomId, handleOpen]);

  return (
    <div>
      <MoreVertIcon style={{ fontSize: 30 }} onClick={handleOpen} />
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
              <h3 id="transition-modal-title">
                Users in the room.({usersList.length + 1})
              </h3>
            </div>
            <div className="users">
              <div className="list-items">
                {adminOfRoom.admin && adminOfRoom.admin != null ? (
                  <Link to={`/profile/${adminOfRoom.admin?._id}`}>
                    <Avatar
                      alt={adminOfRoom.admin?.username}
                      src={adminOfRoom.admin?.image}
                    />
                  </Link>
                ) : (
                  <Avatar
                    alt={adminOfRoom.admin?.username}
                    src={adminOfRoom.admin?.image}
                  />
                )}

                <div style={{ marginLeft: 5 }}>
                  {adminOfRoom.admin?.username}
                </div>
                <div className="admin-tag">Admin</div>
              </div>
            </div>

            {usersList.map((user) => (
              <div key={user.userId._id} className="users">
                <div className="list-items">
                    <Link to={`/profile/${user.userId._id}`}>
                    <Avatar alt={user.userId.username} src={user.userId.image} />
                    </Link>
                  
                  <div style={{ marginLeft: 5 }}>{user.userId.username}</div>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Detail;
