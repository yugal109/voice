import axios from '../axy'
import React, { useState, useEffect } from 'react'
import Spinner from "../components/Spinner"
import {Link} from "react-router-dom"
import "../css/join.css"



const JoinScreen = ({history}) => {
    const user=localStorage.getItem("userInfo")&& JSON.parse(localStorage.getItem("userInfo"))
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [roomId,setRoomId]=useState("")
    const [creatinglink,setCreatingLink]=useState(false)

    const handelCreate=()=>{
        setCreatingLink(true)
        axios.post("/create",{
            data:true
        },{
                headers: {
                    "Content-Type": "Application/json",
                    "x-auth-token": user.token
                } 
        })
        .then((response)=>{
        setCreatingLink(false)
            setRoomId(response.data.roomId)
            
            
        })
        .catch((error)=>{
        setCreatingLink(false)
            console.log(error)
        })

    }

    const handelSubmit=(e)=>{
        e.preventDefault()
        history.push(`/chat?id=${user.id}&room=${room}`)
    }


    return (
        <div>
            <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                    <h1 className="heading">Create Link</h1>
                    
            <button onClick={handelCreate} className={'button mt-20'}>Create</button>
                    
                </div>
                {/* {creatinglink && <Spinner/>} */}
                {roomId && 
                <>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>    
                <span style={{color:"white"}}>{roomId}</span>
                <button style={{width:"40%",marginTop:10}}>Copy</button>    
                </div>  
                </>}
                <div className="joinInnerContainer">
                    
                    <h1 className="heading">Join</h1>
                   <form onSubmit={handelSubmit}>
                    <div>
                        <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                    </div>
                    
                        <button className={'button mt-20'} type="submit">Sign In</button>
                    
                    </form>
                </div>
            </div>

        </div>
    )
}

export default JoinScreen
