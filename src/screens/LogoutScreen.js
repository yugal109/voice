import React from 'react'

const LogoutScreen = ({history}) => {
    const handelLogout=()=>{
        localStorage.removeItem("userInfo")
        history.push("/")
    }
    return (
        <div>
            <button onClick={handelLogout}>Logout</button>
        </div>
    )
}

export default LogoutScreen
