import React,{useState} from 'react'
import "../css/message.css"
const MyMessage = ({msg,socket,room,id,fire,setFire}) => {
    const [react,setReact]=useState("")
    
    const handelReact = (msgid) => {
        socket.emit("reacting", { room, id, msgid, react })
        
    }

    return (
        <div>
            <div className="right ">
                <div key={msg._id} className="myMsg container-fluid">
                    {msg?.message}
                </div>
                {
                    msg.reacts.map((rct) => (
                        <small>{rct.reaction}</small>
                    ))
                }
                <button onClick={e => handelReact(msg._id,react)}>React</button>
                <input value={react} onChange={e => setReact(e.target.value)} />
            </div>
        </div>
    )
}

export default MyMessage
