import request from '../utils/request'
export function GetMRSDrawInfo(record_id, d_id) {
    let config = {
        url: '/api/v1/mrs/drawinfo',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateMRSDrawInfo(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/mrs/drawinfo',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}

// 缺GetMRSRawData的api
export function GetMRSRawData(record_id) {
    let config = {
        url: '/api/v1/mrs/rawdata',
        method: 'GET',
        params: {
            record_id: record_id
        }
    }
    return request(config)
}

export function GetMRSMetrics(record_id, d_id) {
    let config = {
        url: '/api/v1/mrs/metrics',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateMRSMetrics(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/mrs/metrics',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}

// [for 品峰]
export function UpdateMRSResult(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/mrs/result',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}

// [for 品峰]
export function GetMRSResult(record_id, d_id) {
    let config = {
        url: '/api/v1/mrs/result',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}