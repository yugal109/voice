import React, { useEffect, useState } from "react";
import "../css/inbox.css";
import axios from "../axy";
import IndividualRoomLinks from "../components/IndividualRoomLinks";
import Invitations from "../components/Invitations";
const InboxScreen = () => {
  const { id: userId, token } =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));
  const [inboxList, setInboxList] = useState([]);
  const [whichOne,setWhichOne]=useState(true)

  useEffect(() => {
    axios
      .post(
        "/inbox",
        {
          id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      )
      .then((response) => {
        setInboxList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId,token]);

  return (
    <div className="inbox">
      <div className="inbox-body">
        <div className="inbox-header">
          <h3>Rooms And Links</h3>
        </div>
        <div className="headers">

     
        <div  onClick={e=>setWhichOne(true)}>Your Creations</div>
        <div  onClick={e=>setWhichOne(false)}>Inviations</div>

        </div>
        {whichOne ?
         <div className="chat-list">
         {inboxList.map((ibx) => (
           <IndividualRoomLinks ibx={ibx} />
         ))}
       </div>:
         <div>
         <Invitations/>
       </div>

        }
       
      
      </div>
    </div>
  );
};

export default InboxScreen;
