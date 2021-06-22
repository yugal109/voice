import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { TextField } from '@material-ui/core'
import io from "socket.io-client";
import "../css/chat.css"

// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

// import '../css/chat.css';

const ENDPOINT = 'https://voice101.herokuapp.com';

let socket;

const Chat = ({ location }) => {
    const { id, room } = queryString.parse(location.search);

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [msg,setMsg]=useState("")
  const [fire,setFire]=useState(false)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { id, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    

    socket.emit("join",{id,room},({error})=>{
        console.log(error)
    })

    socket.on("message",data=>{
        
        setMsg(data.text);
    })

    return ()=>{
        // socket.emit("disconnect")
        socket.off();
    }
  },[ENDPOINT,location.search])


  useEffect(()=>{

      socket.on('allmessage',({messages})=>{
          setMessages(messages)
      })
  },[])

  const handelSend=(e)=>{
      e.preventDefault()
      socket.emit("sendMessage",{id,room,message:text})
      setText("")
  }

  return (
    <div className="prof">
        
            <div className="card">
            {msg}
            <br/>
        
      Chat
      <br/>
      <div className="messages">
      {messages?.map((msg)=>(
          <>
          <div className="message">
              {msg?.message}
              </div>
        
          </>
      ))}
      </div>

      <form onSubmit={handelSend}>
      <TextField value={text} onChange={e=>setText(e.target.value)} className="field" id="outlined-basic" variant="outlined" />
      <button type="submit" >Send</button>
      </form>
    </div>
    </div>
  );
}

export default Chat;
