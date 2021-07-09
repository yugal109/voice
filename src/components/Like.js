import React, { useEffect, useState } from "react";
import "../css/like.css";
import { emojify } from "react-emojione";
import axios from "../axy";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5003/reactions";

let socket;

const Like = ({ id,num }) => {
  const [reactionnumber, setReactionNumber] = useState(0);
  socket = io.connect(ENDPOINT);

  useEffect(() => {
    socket.emit("join", id);
    socket.on("getallreacts", (data) => {
      setReactionNumber(data.react.length);
      num(data.react.length)
    });
  }, [num]);

  const { id: userId, token } =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));

  const handelHaha = () => {
    socket.emit("reaction", { messageId: id, userId, reacts: "haha" });
  };
  const handelLike = () => {
    socket.emit("reaction", { messageId: id, userId, reacts: "like" });
  };
  const handelHeart = () => {
    socket.emit("reaction", { messageId: id, userId, reacts: "love" });
  };
  const handelSad = () => {
    socket.emit("reaction", { messageId: id, userId, reacts: "sad" });
  };
  return (
    <div
      className="like-strip"
      style={{
        display: "flex",
        alignItems: "center",
        padding: 5,
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div onClick={handelHaha} style={{ padding: 4 }} className="reacts">
          {emojify("XD")}
        </div>

        <div onClick={handelHeart} style={{ padding: 4 }} className="reacts">
          Heart
        </div>
        <div onClick={handelLike} style={{ padding: 4 }} className="reacts">
          Like
        </div>
        <div onClick={handelSad} style={{ padding: 4 }} className="reacts">
          {emojify(":'(")}
        </div>
      </div>
      <span>{reactionnumber}</span>
    </div>
  );
};

export default Like;
