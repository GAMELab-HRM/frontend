import request from '../utils/request'

export function UpdateWetSwallow(obj){
    //let token = localStorage.getItem("access_token")
    let config = {
        url:'/api/v1/swallows/data',
        method:'PUT',
        data:obj,
        //headers: {Authorization:`Bearer ${token}`}
        
    }
    return request(config)
}

export function GetWetSwallow(record_id, d_id){
    //let token = localStorage.getItem("access_token")
    let config = {
        url:'/api/v1/swallows/data',
        method:'GET',
        params:{
            record_id: record_id,
            doctor_id:d_id
        },
        //headers: {Authorization:`Bearer ${token}`}
    }

    return request(config)
}