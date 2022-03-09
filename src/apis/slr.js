import request from '../utils/request'
export function GetSLRDrawInfo(record_id, d_id) {
    let config = {
        url: '/api/v1/leg/drawinfo',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateSLRDrawInfo(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/leg/drawinfo',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}

export function GetSLRRawData(record_id) {
    let config = {
        url: '/api/v1/leg/rawdata',
        method: 'GET',
        params: {
            record_id: record_id
        }
    }
    return request(config)
}

export function GetSLRMetrics(record_id, d_id) {
    let config = {
        url: '/api/v1/leg/metrics',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}

export function UpdateSLRMetrics(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/leg/metrics',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}


export function UpdateSLRResult(obj, record_id, d_id) {
    let config = {
        url: '/api/v1/leg/result',
        method: 'PUT',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
        data: obj
    }
    return request(config)
}


export function GetSLRResult(record_id, d_id) {
    let config = {
        url: '/api/v1/leg/result',
        method: 'GET',
        params: {
            record_id: record_id,
            doctor_id: d_id
        },
    }

    return request(config)
}