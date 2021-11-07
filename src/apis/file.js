import request from '../utils/request'

export function uploadFileDemo(obj){
    let config = {
        url:'http://140.118.157.26:8000/api/v1/files',
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
        url: 'http://140.118.157.26:8000/api/v1/files',
        method: 'POST',
        data: obj,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }

    return request(config)
}
