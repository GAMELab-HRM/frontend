import request from '../utils/request'

export function GetHHDrawInfo(record_id, d_id) {
    let config = {
        url: '/api/v1/hh/drawinfo',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateHHDrawInfo(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/hh/drawinfo',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}

// 缺GetHHRawData的api
export function GetHHRawData(record_id) {
    let config = {
        url: 'api/v1/hh/rawdata',
        method: 'GET',
        params: {
            record_id: record_id
        }
    }
    return request(config)
}
export function GetHHMetrics(record_id, d_id) {
    let config = {
        url: '/api/v1/hh/metrics',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateHHMetrics(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/hh/metrics',
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
export function UpdateHHResult(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/hh/result',
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
export function GetHHResult(record_id, d_id) {
    let config = {
        url: '/api/v1/hh/result',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}