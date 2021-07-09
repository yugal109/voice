import React, { useEffect, useState } from "react";
import "../css/inbox.css";
import axios from "../axy";
import IndividualRoomLinks from "../components/IndividualRoomLinks";
const InboxScreen = () => {
  const {id:userId,token} =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"))
  const [inboxList, setInboxList] = useState([]);

  useEffect(() => {
    axios
      .post("/inbox", {
        id: userId,
      },{
        headers:{
          "Content-Type":"application/json",
          "x-auth-token":token
        }
      })
      .then((response) => {
        setInboxList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div className="inbox">
      <div className="inbox-body">
        <div className="inbox-header">
          <h3>Rooms created in last 24 hours</h3>
        </div>
        <div className="chat-list">
          {inboxList.map((ibx) => (
           <IndividualRoomLinks ibx={ibx}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxScreen;
