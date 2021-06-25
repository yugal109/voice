import axios from "axios"
// https://voice101.herokuapp.com/
// http://localhost:5001
const Axios = axios.create({
    baseURL: 'http://localhost:5001',
    
  });

export default Axios