import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { TextField } from '@material-ui/core'
import io from "socket.io-client";
import Spinner from "../components/Spinner"
import MyMessage from "../components/MyMessage"
import OtherMessage from "../components/OtherMessage";
import "../css/chat.css"
const jwt = require("jsonwebtoken")
// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

// import '../css/chat.css';

const ENDPOINT = 'http://localhost:5003';

let socket;

const Chat = ({ location }) => {
    const user = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"))

    let { id, room } = queryString.parse(location.search);
    room = jwt.verify(room, "mysecretkey101").roomid;

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('');
    const [msg, setMsg] = useState("")
    const [fire, setFire] = useState(false)
    const [message, setMessage] = useState('');
    const [cur, setCur] = useState("")
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        let { id, room } = queryString.parse(location.search);
        room = jwt.verify(room, "mysecretkey101").roomid;

        socket = io(ENDPOINT);


        socket.emit("join", { id, room }, ({ error }) => {
            console.log(error)
        })

        socket.on("message", data => {
            setMsg(data.text);
        })

        return () => {
            // socket.emit("disconnect")
            socket.off();
        }
    }, [ENDPOINT, location.search])


    useEffect(() => {
        // setLoading(true)

        socket.on('allmessage', ({ messages }) => {
            setMessages(messages)
            setCur("")
            // setLoading(false)
        })

    }, [])

    const handelSend = (e) => {
        e.preventDefault()
        setCur(text)
        socket.emit("sendMessage", { id, room, message: text })
        setText("")
    }


    const handelChange = (e) => {
        setText(e.target.value)
        // socket.emit("yugal", { dat: "Typing........" })
        // console.log("Typingggggg")
    }

    return (
        <div className="prof">

            <div className="card">
                {msg}
                <br />
                Chat
                <br />
                {loading ? <Spinner /> :
                    <div className="messages">
                        {messages?.map((msg) => (
                            <>
                                {(user.id == msg.user) ?                                  
                                    <MyMessage key={msg._id} 
                                    fire={fire} setFire={setFire} 
                                     msg={msg} socket={socket} room={room} id={id}   />
                                    :
                                    <OtherMessage key={msg._id} 
                                    msg={msg} socket={socket}
                                     room={room} id={id}  />   
                                }
                            </>
                        ))}

                        {cur &&
                            <div className="right ">
                                <div className="myMsg container-fluid">
                                    {cur}
                                </div>
                            </div>
                        }
                    </div>
                }

                <form onSubmit={handelSend}>
                    <TextField value={text} onChange={e => handelChange(e)} 
                    className="field" id="outlined-basic" variant="outlined" />
                    <button type="submit">Send</button>
                </form>

            </div>
        </div>
    );
}

export default Chat;
