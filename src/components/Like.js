import React from "react";
import "../css/like.css";
import io from "socket.io-client";
import URL from "../url";
const ENDPOINT = URL + "/reactions";

let socket;

const Like = ({ id }) => {
  socket = io.connect(ENDPOINT);

  const { id: userId } =
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
          Haha
        </div>
        <div onClick={handelHeart} style={{ padding: 4 }} className="reacts">
          Heart
        </div>
        <div onClick={handelLike} style={{ padding: 4 }} className="reacts">
          Like
        </div>
        <div onClick={handelSad} style={{ padding: 4 }} className="reacts">
          Sad
        </div>
      </div>
    </div>
  );
};

export default Like;
