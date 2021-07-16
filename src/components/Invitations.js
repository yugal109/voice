import React, { useEffect, useState } from "react";
import "../css/invitation.css";
import axios from "../axy";
import {Link} from "react-router-dom"

const Invitations = () => {
  const user =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));
  const [invitations, setInvitations] = useState([]);
  useEffect(() => {
    axios
      .get(`/requests/invite/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.token,
        },
      })
      .then((response) => {
        setInvitations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div className="invitations">
      {invitations.map((invitation) => (
        <div style={{backgroundColor:"blue",borderRadius:10}} key={invitation._id} className="invitations-body">
          {invitation.roomName}
          <Link style={{color:"white",textDecoration:"none"}} to={`chat?id=${user.id}&room=${invitation.link}`}>Goto Room</Link>
        </div>
      ))}
    </div>
  );
};

export default Invitations;
