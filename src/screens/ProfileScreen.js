import React, { useEffect, useMemo, useState } from "react";
import axios from "../axy";
import "../css/profile.css";
import { TextField } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Spinner from "../components/Spinner";

import io from "socket.io-client";
import URL from "../url";
const ENDPOINT = URL + "/requests";
let socket;
const ProfileScreen = ({ match, history }) => {

  const user =
  localStorage.getItem("userInfo") &&
  JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    
  //   return () => {
  //     socket.off();
  //   };
  }, [match]);


  const token =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo")).token;
  const [loading, setLoading] = useState(false);

  const [userdetail, setUserDetail] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [fire, setFire] = useState(false);
  const [spin, setSpin] = useState(false);
  const [privspin, setPrivSpin] = useState(false);
  const [status, setStatus] = useState("");

  

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`/users/${match.params.id}`, {
          headers: {
            "Content-Type": "Application/json",
            "x-auth-token": token,
          },
        })
        .then((response) => {
          setUserDetail(response.data);
          setUsername(response.data?.username);
          setEmail(response.data?.email);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      history.push("/");
    }
  }, [history, token, match, fire]);

  useEffect(() => {
    axios
      .get(`/users/isfriend/${match?.params.id}`, {
        headers: {
          "Content-Type": "Application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, match, fire]);

  useMemo(() => {
    axios
      .get(`/users/accountType/${match.params.id}`, {
        headers: {
          "Content-Type": "Application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        response.data?.accountType == "public"
          ? setChecked(false)
          : setChecked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match, token]);

  const handelAccountChange = () => {
    setPrivSpin(true);
    axios
      .put(
        `/users/${match.params.id}`,
        {
          data: checked,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            "x-auth-token": user.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPrivSpin(false);

        setFire(!fire);
      })
      .catch((error) => {
        console.log(error);
        setPrivSpin(false);

        setFire(!fire);
      });
  };

  const handelUpdate = () => {
    setSpin(true);
    axios
      .put(
        `/users/all/${match.params.id}`,
        {
          username,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            "x-auth-token": user.token,
          },
        }
      )
      .then((response) => {
        setSpin(false);
        setFire(!fire);
      })
      .catch((error) => {
        console.log(error);
        setSpin(false);
        setFire(!fire);
      });
  };

  const handelRequest = () => {
    // socket.emit("sendfriendrequest", {
    //   requestType: "friend_request",
    //   requestor: user.id,
    //   acceptor: match.params.id,
    // });
    // setFire(!fire);
    axios
      .post(
        "/requests",
        {
          requestType: "friend_request",
          requestor: user.id,
          acceptor: match.params.id,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            "x-auth-token": user.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFire(!fire);
      })
      .catch((error) => {
        setFire(!fire);

        console.log(error);
      });
  };

  const handelRemove = () => {
    axios
      .post(
        "/requests",
        {
          requestType: "friend_request",
          requestor: user.id,
          acceptor: match.params.id,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            "x-auth-token": user.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFire(!fire);
      })
      .catch((error) => {
        setFire(!fire);
        console.log(error);
      });
  };
  return (
    <div className="prof">
      <div className="card">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="topSec">
              <div className="names">
                <div id="name">{userdetail?.fullname}</div>
                <div>@{userdetail?.username}</div>
                {privspin ? (
                  <Spinner />
                ) : (
                  <>
                    {user?.id == match.params.id ? (
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              name="checkedA"
                              checked={checked}
                              onChange={handelAccountChange}
                            />
                          }
                          label="Private"
                        />
                      </FormGroup>
                    ) : (
                      <div>
                        {checked ? (
                          <div className="acc-type">Private</div>
                        ) : (
                          <div className="acc-type">Public</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="image">
                <img src={userdetail?.image} />
                <div className="plus">
                  <i style={{ padding: 5 }} className="fas fa-plus"></i>
                </div>
                {user?.id !== match.params.id && (
                  <>
                    {status == "friends" ? (
                      <Button variant="contained" color="primary">
                        Remove as Friend
                      </Button>
                    ) : status == "pending" ? (
                      <Button
                        onClick={handelRemove}
                        variant="contained"
                        color="primary"
                      >
                        Pending
                      </Button>
                    ) : (
                      <Button
                        onClick={()=>handelRequest()}
                        variant="contained"
                        color="primary"
                      >
                        Add friend
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
            <hr />
            {(user?.id == match.params.id ||
              userdetail.accountType == "public") && (
              <>
                <div className="detail">
                  <div className="sameLine">
                    <TextField
                      className="field"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      id="outlined-basic"
                      variant="outlined"
                    />
                  </div>
                  <div className="sameLine">
                    <TextField
                      className="field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="outlined-basic"
                      variant="outlined"
                    />
                  </div>
                  <div className="footer">
                    {spin ? (
                      <Spinner />
                    ) : (
                      <>
                        {user?.id == match.params.id && (
                          <Button
                            onClick={handelUpdate}
                            variant="contained"
                            color="primary"
                          >
                            Update
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
