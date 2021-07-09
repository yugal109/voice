import axios from "axios"
// https://voice101.herokuapp.com/
// http://localhost:5003
const baseURL="http://localhost:5003"
const Axios = axios.create({
    baseURL
    
  });

export default Axios