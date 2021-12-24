import request from '../utils/request'

export function GetMRSDrawInfo(record_id, d_id) {
    var sample_url = 'http://140.118.157.26:8000/api/v1/MRS/draw_info'
    let config = {
        url: sample_url + "/" + record_id,
        method: 'PUT',
        params: {
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateMRSDrawInfo(obj, record_id, d_id) {
    var sample_url = 'http://140.118.157.26:8000/api/v1/MRS/draw_info'
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