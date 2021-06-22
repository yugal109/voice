import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import "../css/join.css"

const JoinScreen = () => {
    const user=localStorage.getItem("userInfo")&& JSON.parse(localStorage.getItem("userInfo"))
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")


    return (
        <div>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Join</h1>
                   
                    <div>
                        <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                    </div>
                    <Link onClick={e => (!room) ? e.preventDefault() : null} to={`/chat?id=${user.id}&room=${room}`}>
                        <button className={'button mt-20'} type="submit">Sign In</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default JoinScreen
