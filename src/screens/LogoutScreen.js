import React from 'react'
import "../css/sign-in-up.css"
import CanOrNot from '../helpingfunc/CanOrNot'
const LogoutScreen = ({history}) => {
    const userInfo = localStorage.getItem("userInfo")
    CanOrNot(!userInfo,"/",history)
    const handelLogout=()=>{
        localStorage.removeItem("userInfo")
        window.location.reload(true);

        history.push("/")
    }
    const handelGoBack=()=>{
        history.push("/")
    }
    return (
        <section>
        <form >
            <div class="login-box">

                <h1>Sign Out</h1>
               
                <div>
                <input id="logout" type="button" onClick={handelLogout} class="btn" name="logout" value="Sign Out" />
                </div>
                <div>
                <input type="button" onClick={handelGoBack} class="btn" name="goback" value="No" />

                </div>
                

                
            </div>

        </form>
    </section>
    )
}

export default LogoutScreen
