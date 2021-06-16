import axios from "axios"

const Axios = axios.create({
    baseURL: 'https://school101.herokuapp.com',
    
  });

export default Axios