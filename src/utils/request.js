import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import router from '@/router/index.js';

//axios.defaults.withCredentials = true 
var base_url = 'http://140.118.157.26:8000'
const axios_instance = axios.create({
    baseURL:base_url, // just for developing 
    timeout:5000
})

axios_instance.interceptors.request.use((config)=>{
    // do something before request is sent
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config 
},(error)=>{
    console.log("ERRROR in request interceptors")
    return Promise.reject(error)
})
// const refreshAuthLogic = function(){
//     let token = localStorage.getItem("refresh_token")
//     let config = {
//         headers: { Authorization: `Bearer ${token}` }
//     }
//     let data = {

//     }
//     axios.post(base_url + "/api/v1/auth/refresh", data, config).then((res)=>{
//         console.log("refresh logic")
//         console.log(res)
//         localStorage.setItem("access_token", res.data["access_token"])
//         return Promise.resolve()
//     }).catch((err)=>{
//         console.log("refresh error")
//         console.log(err)
//         router.push('/login')        
//     })
// }
const refreshAuthLogic = () => axios.post(base_url+"/api/v1/auth/refresh",{},{headers: { Authorization: `Bearer ${localStorage.getItem("refresh_token")}` }}).then((res)=>{
    console.log("refresh logic")
    console.log(res)
    localStorage.setItem("access_token", res.data["access_token"])
    // new token should be written in local storage 
    return Promise.resolve()
}).catch((err)=>{
    //代表refresh token 過期了
    console.log("refresh error")
    console.log(err)
    router.push('/login')
})

createAuthRefreshInterceptor(
    axios_instance,
    refreshAuthLogic
)



/*
    set response interceptores 
    收到http response後會先來這邊，再到使用者那邊
*/
axios_instance.interceptors.response.use((response)=>{
    return response
},(error)=>{
    //return error
    return Promise.reject(error)
})

export default axios_instance