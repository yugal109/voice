import React, { useState, useMemo } from "react";
import "../css/message.css";
import Like from "./Like";
import io from "socket.io-client";
import Avatar from "@material-ui/core/Avatar";
import Reactions from "./Reactions";
import DoneIcon from '@material-ui/icons/Done';

import URL from "../url";
const ENDPOINT = URL + "/reactions";

let socket;
const OtherMessage = ({ msg, user }) => {
  // const [react, setReact] = useState("");
  const [likeList, setLikeList] = useState(false);
  const [reactionNumber, setReactionNumber] = useState(0);
  // const [fire, setFire] = useState(false);

  const handelMessageLike = () => {
    setLikeList(!likeList);
  };

  useMemo(() => {
    socket = io.connect(ENDPOINT);
    socket.emit("join", { messageId: msg._id });
    socket.on("getallreacts", (data) => {
      setReactionNumber(data.react);
    });
  }, [msg._id]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{padding:5}}>
          <Avatar style={{width:25,height:25}} src={user.image} />
        </div>
        <div
          onTouchMove={PointerEvent}
          onClick={handelMessageLike}
          key={msg?._id}
          className="othersMsg container-fluid"
          style={{ color: "white", fontWeight: 800 }}
        >
          {msg?.message}
          <div style={{color:"white",fontSize:7,display:"flex",justifyContent:"flex-end"}}>{user.username}</div>
        </div>
        <div style={{ marginLeft: 5 }}>
          {likeList && <Like  id={msg._id} />}
        </div>
        {/* {reactionNumber !== 0 && <span>{reactionNumber}</span>} */}
        <Reactions msg={msg}/>
      </div>
    </div>
  );
};

export default OtherMessage;
