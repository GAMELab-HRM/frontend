import request from '../utils/request'

export function AddHrmData(data){
    let config = {
        url:'api/v1/user/data',
        method:'POST',
        data
    }

    return request(config)
}

export function UpdateHrmData(data){
    let config = {
        url:'api/v1/user/data',
        method:'PUT',
        data
    }
    
    return request(config)
}