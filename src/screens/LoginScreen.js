import React,{useEffect,useState} from 'react'
import axios from "../axy"
const LoginScreen = () => {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })

    },[])

    return (
        <section>
      <form method="post" action="">
        <div class="login-box">
          <h1>Sign In</h1>
          <div class="textbox">
            <i class="fa fa-user"></i>
            <input
              type="text"
              name="uName"
              placeholder="Username"
              required
              autofocus=""
            />
          </div>
          <div class="textbox">
            <i class="fa fa-lock"></i>
            <input type="password" placeholder="Password" name="pwd" required />
          </div>
          <input type="submit" class="btn" name="login" value="Sign In" />
        </div>
      </form>
    </section>
    )
}

export default LoginScreen
