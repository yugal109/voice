import React,{useEffect,useState} from 'react'
import axios from "../axy"

const LoginScreen = () => {

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    useEffect(()=>{
        axios.get("/man")
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })

    },[])

    return (
        <div>
            This is login screen.
        </div>
    )
}

export default LoginScreen
