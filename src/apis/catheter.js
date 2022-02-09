import request from '../utils/request'

export function GetCatheterType(record_id) {
    let config = {
        url: '/api/v1/patient/catheter',
        method: 'GET',
        params: {
            record_id: record_id,
        },
    }

    return request(config)
}