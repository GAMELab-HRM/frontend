import request from '../utils/request'

export function UserLogin(obj){
    let config = {
        url:'/api/v1/auth/login',
        method:'POST',
        data:obj
    }
    return request(config)
}

export function RefreshToken(){
    let refresh_token = localStorage.getItem("refresh_token")
    let config = {
        url:'/api/v1/auth/refresh',
        method:'POST',
        headers: {Authorization:`Bearer ${refresh_token}`}
    }
    return request(config)
}

