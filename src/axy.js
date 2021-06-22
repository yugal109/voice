import axios from "axios"

const Axios = axios.create({
    baseURL: 'https://voice101.herokuapp.com',
    
  });

export default Axios