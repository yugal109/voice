import React, { useState, useMemo } from "react";
import "../css/message.css";
import Like from "./Like";
import Reactions from "./Reactions";
import Avatar from "@material-ui/core/Avatar";
import DoneIcon from '@material-ui/icons/Done';


// import URL from "../url";
// import io from "socket.io-client";
// const ENDPOINT = URL + "/reactions";

// let socket;

const MyMessage = ({ msg, user }) => {
  const [likeList, setLikeList] = useState(false);
  const handelMessageLike = () => {
    setLikeList(!likeList);
  };

  return (
    <div>
      <div className="right">
        <div style={{ marginRight: 5 }}>
          {likeList && <Like key={msg._id} id={msg._id} />}
        </div>

        <div
          onTouchMove={PointerEvent}
          onClick={handelMessageLike}
          key={msg?._id}
          className="myMsg container-fluid"
        >
          {msg?.message}
          {/* <div className="username">{user.username}</div> */}

          <div className="username"><DoneIcon/></div>
        </div>
        <div style={{padding:5}}>
          <Avatar style={{width:25,height:25}} src={user.image} />
        </div>
        {/* {reactionNumber !== 0 && <span>{reactionNumber}</span>} */}
        <Reactions msg={msg} />
      </div>
    </div>
  );
};

export default MyMessage;
