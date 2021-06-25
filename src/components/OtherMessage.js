import React, { useState } from 'react'
import "../css/message.css"

const OtherMessage = ({ msg,socket,room,id }) => {
    const [react,setReact]=useState("")
    
    const handelReact = (msgid) => {
        socket.emit("reacting", { room, id, msgid, react })
    }

    return (
        <div>
            <div key={msg._id} className="othersMsg">
                {msg?.message}
            </div>
            {
                msg.reacts.map((rct) => (
                    <small>{rct.reaction}</small>
                ))
            }
                <input value={react} onChange={e => setReact(e.target.value)} />
            <button onClick={e => handelReact(msg._id)}>React</button>
        </div>
    )
}

export default OtherMessage
