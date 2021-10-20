import request from '../utils/request'

export function CallDemoAPI(){
    let config = {
        url:'http://140.118.157.26:8000/demo',
        method:'GET',
    }

    return request(config)
}


export function CallDemo2API(){
    let config = {
        url:'http://140.118.157.26:8000/demo2',
        method:'GET',
    }

    return request(config)
}