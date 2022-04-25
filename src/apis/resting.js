import request from '../utils/request'

export function GetRestingDrawInfo(record_id, d_id) {
    let config = {
        url: '/api/v1/resting/drawinfo',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateRestingDrawInfo(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/resting/drawinfo',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}

export function GetRestingRawData(record_id) {
    let config = {
        url: 'api/v1/resting/rawdata',
        method: 'GET',
        params: {
            record_id: record_id
        }
    }
    return request(config)
}
export function GetRestingMetrics(record_id, d_id) {
    let config = {
        url: '/api/v1/resting/metrics',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateRestingMetrics(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/resting/metrics',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}


export function UpdateRestingResult(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/resting/result',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}


export function GetRestingResult(record_id, d_id) {
    let config = {
        url: '/api/v1/resting/result',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}