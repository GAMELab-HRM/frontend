import request from '../utils/request'

export function UpdateWetSwallow(obj){
    let config = {
        url:'/api/v1/swallows/data',
        method:'PUT',
        data:obj
    }
    return request(config)
}

export function GetWetSwallow(record_id, d_id){
    let config = {
        url:'/api/v1/swallows/data',
        method:'GET',
        params:{
            record_id: record_id,
            doctor_id:d_id
        }
    }

    return request(config)
}