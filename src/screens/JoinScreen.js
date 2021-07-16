import axios from "../axy";
import React, { useState } from "react";
import "../css/join.css";
import { Button } from "@material-ui/core";
import copy from "copy-to-clipboard";
import TextField from "@material-ui/core/TextField";

const JoinScreen = ({ history }) => {
  const user =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));

  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomname] = useState("");
  const [creatinglink, setCreatingLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelCreate = () => {
    setCreatingLink(true);
    setLoading(true);
    axios
      .post(
        "/create",
        {
          data: true,
          name: roomName,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            "x-auth-token": user.token,
          },
        }
      )
      .then((response) => {
        setCreatingLink(false);
        setRoomId(response.data.roomId);
        setLoading(false);
      })
      .catch((error) => {
        setCreatingLink(false);
        setLoading(false);
        console.log(error);
      });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    history.push(`/chat?id=${user.id}&room=${room}`);
    setLoading(false);
  };

  const copyToClipboard = () => {
    copy(roomId);
  };

  return (
    <div className="outer">
      <div>
        <div className="Caard">
          <h2>Create Room</h2>
          <div style={{ margin: 10 }}>
            <TextField
              id="outlined-basic"
              label="Enter name of room"
              variant="outlined"
              value={roomName}
              onChange={(e) => setRoomname(e.target.value)}
              style={{ width: 400 }}
              autoComplete={false}
            />
          </div>
          {roomName ? (
            <Button
              style={{ width: 400, height: 40 }}
              onClick={handelCreate}
              variant="contained"
              color="primary"
            >
              {loading ? "wait...." : "Create"}
            </Button>
          ) : (
            <Button
              onClick={handelCreate}
              variant="contained"
              color="primary"
              disabled
              style={{ width: 400, height: 40 }}
            >
              Create
            </Button>
          )}

          {roomId && (
            <>
              <div className="link-div">
                <div
                  style={{ padding: 10, margin: 10, backgroundColor: "white" }}
                >
                  {roomId}
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="contained"
                  color="primary"
                  style={{ width: 400, height: 40 }}
                >
                  Copy
                </Button>
              </div>
            </>
          )}
          <h2>Join Room</h2>

          <TextField
            id="outlined-basic"
            label="Enter"
            variant="outlined"
            onChange={(event) => setRoom(event.target.value)}
            style={{ width: 400 }}
          />

          <form
            onSubmit={handelSubmit}
            style={{
              display: "flex",
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            {room ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: 10, width: 400, height: 40 }}
              >
                {loading ? "wait..." : "Enter"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled
                style={{ marginTop: 10, width: 400, height: 40 }}
              >
                Enter
              </Button>
            )}
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default JoinScreen;
