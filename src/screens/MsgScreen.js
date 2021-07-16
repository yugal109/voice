import React,{useEffect,useState} from 'react'

import fire from "../firebase"
let messageRef=fire.database().ref("messages")

const MsgScreen = () => {
    const [msg,setMsg]=useState([])
    const [text,setText]=useState("")

    useEffect(() => {
        messageRef.once('value', function(snapshot) {
            let messages=[]
            snapshot.forEach(function(childSnapshot) {
                messages.push(childSnapshot.val())
            });
            setMsg(messages)
          });
         
    }, [msg])




    const handelSubmit=()=>{
        msg.push({
            id:"new",
            message:text,
        })
        setMsg(msg)
        

        messageRef.push({
            id:12345,
            message:text
        })

        setText("")

    }

    return (
        <div style={{height:"80vh"}}>
          Msg:
          {msg.map((ms)=>(
              <h1>{ms.message}</h1>
          ))}
          <input value={text} onChange={e=>setText(e.target.value)} />
          <button onClick={handelSubmit}>Send</button>
          
        </div>
    )
}

export default MsgScreen
