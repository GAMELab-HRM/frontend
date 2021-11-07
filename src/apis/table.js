import request from '../utils/request'

export function GetBasicTable(){
    let config = {
        url:'http://140.118.157.26:8000/api/v1/table/basic_test/all',
        method:'GET'
    }
    return request(config)
}
export function GetBasicUploadTable(){
    let config = {
        url:'http://140.118.157.26:8000/api/v1/table/basic_test/upload',
        method:'GET'
    }
    return request(config)
}


