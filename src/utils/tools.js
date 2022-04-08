import zlib from 'zlib'
export function DecodeRawdata(rawdata){
    /*
    rawdata <= res.data.rawdata 
    */
    let retv = zlib.inflateSync(Buffer.from(rawdata, 'base64')).toString()
    return retv
}
