import request from '../utils/request'

export function uploadFileDemo(obj){
    let config = {
        url:'/api/v1/files',
        method:'POST',
        data: obj,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }

    return request(config)
}

export function uploadFile(obj){
    let config = {
        url: '/api/v1/files',
        method: 'POST',
        data: obj,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }

    return request(config)
}
