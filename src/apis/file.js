import request from '../utils/request'

export function uploadFile(obj){
    let config = {
        url:'http://140.118.157.26:8000/api/v1/swallows/file',
        method:'POST',
        data: obj,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }

    return request(config)
}

