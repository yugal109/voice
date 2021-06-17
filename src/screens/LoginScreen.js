import React, { useEffect, useState } from 'react'
import axios from "../axy"
import { Link } from "react-router-dom"
import localStore from '../helpingfunc/localStore'
import CanOrNot from '../helpingfunc/CanOrNot'
import ErrorAlert from '../components/ErrorAlert'
import Spinner from "../components/Spinner"
import GoogleLogin from 'react-google-login';
import "../css/sign-in-up.css"





const LoginScreen = ({ history }) => {

    const CLIENT_ID="820102087536-rqic20dfm37vp6ugg05isbh4h4g6ffg6.apps.googleusercontent.com"

    const userInfo = localStorage.getItem("userInfo")
    CanOrNot(userInfo, "/", history)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const handelLogin = (e) => {
        e.preventDefault();
        setLoading(true)
        setError("")
        axios.post("/login", {
            email,
            password
        })
            .then((response) => {
                localStore("userInfo", response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setError("Either email or password is wrong.")
                setLoading(false)
            })
    }

    const responseGoogle = (response) => {
        axios.post("/login/googlelogin",{
            tokenId:response.tokenId
        })
        .then((rsp)=>{
            localStorage.setItem("userInfo",rsp.data)
            history.push("/")
            
        })
        .catch((error)=>{
            setError("User already exists.")
            
        })
    }
    const responsefailedGoogle = (response) => {
        setError("EROOORRR")
    }


    return (
        <section>

            <form onSubmit={handelLogin}>
                <div class="login-box">

                    <h1>Sign In</h1>
                    <div class="textbox">
                        <i class="fa fa-user"></i>
                        <input
                            type="text"
                            name="uName"
                            placeholder="Username"
                            required
                            autofocus=""
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="textbox">
                        <i class="fa fa-lock"></i>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" name="pwd" required />
                    </div>
                    <div>
                        {loading ? <Spinner /> :
                            <input type="submit" class="btn" name="login" value="Sign In" />

                        }
                    </div>
                    <div style={{display:"flex",justifyContent:"center"}}>OR</div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText="  Login Using Google  "
                            onSuccess={responseGoogle}
                            onFailure={responsefailedGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div style={{ margin: 3, color: "red" }}><small>{error && <div>{error}</div>}</small></div>
                    <small><Link to="/sign-up">Don't Have an account? Sign Up</Link></small>


                </div>

            </form>
        </section>
    )
}

export default LoginScreen
