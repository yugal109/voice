import axios from "axios"

const Axios = axios.create({
    baseURL: 'https://some-domain.com/api/',
    
  });

export default Axios