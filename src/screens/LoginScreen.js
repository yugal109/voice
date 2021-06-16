import React, { useEffect, useState } from 'react'
import axios from "../axy"
import { Link } from "react-router-dom"
import localStore from '../helpingfunc/localStore'
import CanOrNot from '../helpingfunc/CanOrNot'
import "../css/sign-in-up.css"

const LoginScreen = ({history}) => {

    const userInfo=localStorage.getItem("userInfo")
    CanOrNot(userInfo,"/",history)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handelLogin = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post("/login", {
            email,
            password
        })
            .then((response) => {
                localStore("userInfo",response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setError("Either email or password is wrong.")
                setLoading(false)
            })
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

                    {loading ? "Wait a damn second bitch!" :
                        <input type="submit" class="btn" name="login" value="Sign In" />

                    }
                    <Link to="/sign-up">Don't Have an account? Register</Link>

                    {error && <div>{error}</div>}
                </div>

            </form>
        </section>
    )
}

export default LoginScreen
