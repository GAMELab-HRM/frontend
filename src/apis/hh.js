import request from '../utils/request'

export function GetHHDrawInfo(record_id, d_id) {
    var sample_url = 'http://140.118.157.26:8000/api/v1/HH/draw_info'
    let config = {
        url: sample_url + "/" + record_id,
        method: 'GET',
        params: {
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateHHDrawInfo(obj, record_id, d_id) {
    var sample_url = 'http://140.118.157.26:8000/api/v1/HH/draw_info'
    let config = {
        url: sample_url + '/' + record_id,
        method: 'PUT',
        params: {
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}