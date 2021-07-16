import axios from "axios"
import URL from "./url"
const baseURL=URL
const Axios = axios.create({
    baseURL
    
  });

export default Axios