import React, { useEffect, useState } from "react";
import axios from "../axy";
import { Link } from "react-router-dom"
import CanOrNot from "../helpingfunc/CanOrNot";
import ErrorAlert from "../components/ErrorAlert";
import Spinner from "../components/Spinner"

const RegisterScreen = ({ history }) => {

  const userInfo = localStorage.getItem("userInfo")
  CanOrNot(userInfo, "/", history)

  const [passnotmatch, setPassNotMatch] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)

  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")

  const handelSubmit = (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)
    if (password != confirmpassword) {
      setPassNotMatch("The passwords don't match.")
      setLoading(false)
    } else {
      setPassNotMatch("")
      axios.post("/users", {
        fullname,
        email,
        username,
        password
      })
        .then((response) => {
          setLoading(false)
          if (response.data.message) {
            setMessage(response.data.message)
          } else {
            history.push("/sign-in")
          }
        })
        .catch((error) => {
          setLoading(false)
          setError(true)
        })
    }
  }

  return (
    <section>
      <form onSubmit={handelSubmit}>
        <div class="registration-box">
          <h1>Sign Up</h1>
          <div class="textbox">
            <input
              type="text"
              name="fName"
              placeholder="Full Name"
              autofocus=""
              required
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>


          <div class="textbox">
            <input type="text" name="uname" placeholder="Username" required
              onChange={(e) => setUsername(e.target.value)}

            />
          </div>

          <div class="textbox">
            <input type="email" name="email" placeholder="Email" required
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>

          <div class="textbox">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>

          <div class="textbox">
            <input type="password" name="cPassword"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}

            />
          </div>

          

          {loading ? <Spinner/> :
            <div class="buttons">
              <input type="submit" class="btn" value="Register" />
            </div>
          }


          <small style={{color:"red"}}>{passnotmatch}</small>
          {error && <ErrorAlert message={message}/>}
          <small style={{color:"red"}}>{message}</small><br/>
          <small><Link to="/sign-in">Already Have an account?Sign In</Link></small>
        </div>
      </form>
    </section>
  );
};

export default RegisterScreen;
