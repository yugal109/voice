import React, { useState, useMemo, useEffect } from "react";
import queryString from "query-string";
import { TextField, Button } from "@material-ui/core";
import io from "socket.io-client";
import Spinner from "../components/Spinner";
import MyMessage from "../components/MyMessage";
import Detail from "../components/Detail";
import OtherMessage from "../components/OtherMessage";
import "../css/chat.css";
import Avatar from "@material-ui/core/Avatar";
import URL from "../url";
const jwt = require("jsonwebtoken");

const ENDPOINT = URL;
console.log(ENDPOINT);

let socket;

const Chat = ({ location }) => {
  let { id, room } = queryString.parse(location.search);
  const user =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));

  room = jwt.verify(room, "mysecretkey101").roomid;

  const [loading, setLoading] = useState(false);
  const [showdetails, setShowDetails] = useState(false)
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [cur, setCur] = useState("");
  const [messages, setMessages] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    let { id, room } = queryString.parse(location.search);
    room = jwt.verify(room, "mysecretkey101").roomid;

    socket.emit("join", { id, room }, ({ error }) => {
      console.log(error);
    });

    socket.on("message", (data) => {
      setMsg(data.text);
    });

    return () => {
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("allmessage", ({ messages }) => {
      setMessages(messages);
      setCur("");
    });
  }, []);

  const handelSend = (e) => {
    setDisable(true);
    e.preventDefault();
    setCur(text);
    if (text) {
      socket.emit("sendMessage", { id, room, message: text });
      setText("");
      setDisable(false);
    } else {
      alert("Message cannot be empty.");
    }
  };

  const handelChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="prof">
        <div className="card">
          <div className="top-header">
            {/* <div className="message-banner"> */}
            <div className="message-box">{msg}</div>
            {/* </div> */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Detail roomId={room} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}></div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="messages">
              {messages?.map((msg) => (
                <>
                  {user.id == msg.user._id ? (
                    <MyMessage user={msg.user} key={msg._id} msg={msg} />
                  ) : (
                    <OtherMessage user={msg.user} key={msg._id} msg={msg} />
                  )}
                </>
              ))}

              {cur && (
                <>
                  <div className="right ">
                    <div className="myMsg container-fluid">
                      {cur}
                      {/* <div
                        style={{
                          fontSize: 7,
                          fontWeight: 100,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {user.username}
                      </div> */}
                      {/* <div style={{height:5}}></div> */}
                    </div>

                    <div style={{ padding: 5 }}>
                      <Avatar
                        style={{ width: 25, height: 25 }}
                        src={user.image}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="bottom"></div>
          <form className="bottom-form" onSubmit={handelSend}>
            <TextField
              value={text}
              onChange={(e) => handelChange(e)}
              className="field"
              id="outlined-basic"
              label="Message"
              variant="outlined"
            />
            {disable ? (
              <Button
                style={{ marginLeft: 5 }}
                variant="contained"
                color="primary"
                type="submit"
                disabled
              >
                Send
              </Button>
            ) : (
              <Button
                style={{ marginLeft: 5 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Send
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
