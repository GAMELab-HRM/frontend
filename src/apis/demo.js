import request from '../utils/request'

export function CallDemoAPI(){
    let config = {
        url:'/demo',
        method:'GET',
    }

    return request(config)
}


export function CallDemo2API(){
    let config = {
        url:'/demo2',
        method:'GET',
    }

    return request(config)
}