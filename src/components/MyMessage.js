import React, { useState, useEffect } from "react";
import "../css/message.css";
import Like from "./Like";
import axios from "../axy";

let socket;

const MyMessage = ({ msg, socket, room, id }) => {
  const [react, setReact] = useState("");
  const [reactionArray, setReactionArray] = useState([]);
  const [likeList, setLikeList] = useState(false);
  const [reactionNumber, setReactionNumber] = useState(0);
  const [fire, setFire] = useState(false);

  useEffect(()=>{
    
  },[reactionNumber])
  
  const num = (number) => {
    setReactionNumber(number);
  };

  const handelMessageLike = () => {
    setLikeList(!likeList);
  };

  return (
    <div>
      <div className="right">
        <div style={{ marginRight: 5 }}>
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

        <div
          onTouchMove={PointerEvent}
          onClick={handelMessageLike}
          key={msg?._id}
          className="myMsg container-fluid"
        >
          {msg?.message}
        </div>
        <span>{reactionNumber}</span>
      </div>
    </div>
  );
};

export default MyMessage;
