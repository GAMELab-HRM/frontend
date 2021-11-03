import request from '../utils/request'

export function UpdateWetSwallow(obj){
    let config = {
        url:'http://140.118.157.26:8000/api/v1/swallows/data',
        method:'PUT',
        data:obj
    }
    return request(config)
}
