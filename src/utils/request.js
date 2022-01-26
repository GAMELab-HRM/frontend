import axios from 'axios'
//axios.defaults.withCredentials = true 
const axios_instance = axios.create({
    baseURL:'http://140.118.157.26:8000', // just for developing 
    timeout:5000
})




export default axios_instance