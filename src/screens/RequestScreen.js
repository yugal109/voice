import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import "../css/request.css";
import axios from "../axy";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

const RequestScreen = ({ history }) => {
  const user =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));

  const token =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo")).token;

  const [requestsOfAddFriend, setRequestsOfAddFriend] = useState([]);
  const [requestAccepted, setRequestAccepted] = useState([]);
  const [invitesOfAddFriend, setInvitesOfAddFriend] = useState([]);

  const [fire, setFire] = useState(false);

  useEffect(() => {
    axios
      .get("/requests/addfriend", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setRequestsOfAddFriend(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, fire]);

  useEffect(() => {
    axios
      .get("/requests/friendaccepted", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setRequestAccepted(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  // useEffect(() => {
  //   axios
  //     .get("/requests/invite", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-auth-token": token,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data)
  //       setInvitesOfAddFriend(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [token, fire]);

  const handelConfirm = (id) => {
    axios
      .post(
        "/requests/addfriend",
        {
          requestor: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      )
      .then((response) => {
        setFire(!fire);
      })
      .catch((error) => {
        setFire(!fire);

        console.log(error);
      });
  };

  const handelCancel = (id) => {
    axios
      .delete(`/requests/deleterequest/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setFire(!fire);
      })
      .catch((error) => {
        setFire(!fire);
        console.log(error);
      });
  };

  const handelJoin = (link, id) => {
    axios
      .post(
        `/requests/accept/${id}`,
        {
          acceptor: user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      )
      .then((response) => {
        setFire(!fire);
      })
      .catch((error) => {
        setFire(!fire);
        console.log(error);
      });

    history.push(`chat?id=${user.id}&room=${link}`);
  };

  return (
    <div className="request">
      <div className="request-body">
        <div className="friends-header">
          <h2>Friend Requests</h2>
        </div>
        <div className="requests-list">
          {requestsOfAddFriend?.map((req) => (
            <>
              {req.requestType == "friend_request" && (
                <div key={req._id} className="request-item">
                  <div className="request-item-message">
                    <Link to={`/profile/${req.requestor._id}`}>
                      <Avatar
                        style={{ marginRight: 5 }}
                        src={req?.requestor?.image}
                      />
                    </Link>
                    {req.requestor.username} has sent a request to add you as a
                    friend.
                  </div>
                  <div>
                    <Button
                      onClick={() => handelConfirm(req.requestor._id)}
                      variant="contained"
                      color="primary"
                    >
                      Confirm
                    </Button>
                    <Button
                      style={{ marginLeft: 10 }}
                      variant="contained"
                      color="secondary"
                      onClick={() => handelCancel(req._id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="requests-list">
      
          {requestAccepted.map((req) => (
            <div key={req._id} className="request-item">
              <div className="request-item-message">
                <Link to={`/profile/${req.acceptor._id}`}>
                  <Avatar
                    style={{ marginRight: 5 }}
                    src={req?.acceptor?.image}
                  />
                </Link>
                {req.acceptor.username} has accepted your request.
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="request-body">
        <div className="friends-header">
          <h2>Invitations</h2>
        </div>
        {requestsOfAddFriend.map((req) => (
          <>
            {req.requestType == "invitation" && (
              <div key={req._id} className="request-item">
                <div className="request-item-message">
                  <Link to={`/profile/${req.requestor._id}`}>
                    <Avatar
                      style={{ marginRight: 5 }}
                      src={req?.requestor?.image}
                    />
                  </Link>
                  {req.requestor.username} has sent you an invite link.
                </div>
                <div>
                  <Button
                    onClick={() => handelJoin(req.link, req._id)}
                    variant="contained"
                    color="primary"
                  >
                    Go to the room.
                  </Button>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default RequestScreen;
