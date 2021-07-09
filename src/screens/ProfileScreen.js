import React, { useEffect, useState } from "react";
import axios from "../axy";
import "../css/profile.css";
import { TextField } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Spinner from "../components/Spinner";

const ProfileScreen = ({ match, history }) => {
  const user =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);

  const [userdetail, setUserDetail] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [fire, setFire] = useState(false);
  const [spin, setSpin] = useState(false);
  const [privspin, setPrivSpin] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`/users/${match.params.id}`, {
          headers: {
            "Content-Type": "Application/json",
            "x-auth-token": user.token,
          },
        })
        .then((response) => {
          setUserDetail(response.data);
          setUsername(response.data?.username);
          setEmail(response.data?.email);
          {
            response.data?.accountType == "public"
              ? setChecked(false)
              : setChecked(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      history.push("/");
    }
  }, [history, match, fire]);

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
  return (
    <div className="prof">
      <div className="card">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="topSec">
              <div className="names">
                <div id="name">
                  {userdetail?.firstname} {userdetail?.lastname}
                </div>
                <div>@{userdetail?.username}</div>
                {privspin ? (
                  <Spinner />
                ) : (
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
                )}
              </div>
              <div className="image">
                <img src={userdetail?.image} />
                <div className="plus">
                  <i style={{ padding: 5 }} className="fas fa-plus"></i>
                </div>
              </div>
            </div>
            <hr />
            <div className="details">
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
                  <Button
                    onClick={handelUpdate}
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
