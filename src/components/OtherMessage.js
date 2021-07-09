import React, { useState, useEffect } from "react";
import "../css/message.css";
import Like from "./Like";
import axios from "../axy";

const OtherMessage = ({ msg, socket, room, id }) => {
  const [react, setReact] = useState("");
  const [likeList, setLikeList] = useState(false);
  const [reactionNumber, setReactionNumber] = useState(0);
  const [fire, setFire] = useState(false);

  const handelMessageLike = () => {
    setLikeList(!likeList);
  };

  const num = (number) => {
    setReactionNumber(number);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          onTouchMove={PointerEvent}
          onClick={handelMessageLike}
          key={msg?._id}
          className="othersMsg container-fluid"
          style={{ color: "white", fontWeight: 800 }}
        >
          {msg?.message}
        </div>
        <div style={{ marginLeft: 5 }}>
          {likeList && (
            <Like
              key={msg._id}
              num={num}
              fire={fire}
              setFire={setFire}
              id={msg._id}
            />
          )}
        </div>
        <span>{reactionNumber}</span>
      </div>
    </div>
  );
};

export default OtherMessage;
