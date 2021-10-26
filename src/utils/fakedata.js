// // "所有資料"頁面的假資料
// export let ws_main_table_data = [{
//     patient_id: 'A123456789',
//     raw_data: '6789-nromal.csv',
//     cc_result_mms: 'normal',
//     cc_result_ray: '-',
//     cc_result_liang: '-',
//     last_review_ray: '-',
//     last_review_liang: '-',
// }, {
//     patient_id: 'B123458888',
//     raw_data: '8888-nromal.csv',
//     cc_result_mms: 'normal',
//     cc_result_ray: '-',
//     cc_result_liang: 'normal',
//     last_review_ray: '-',
//     last_review_liang: '2021/10/9',
// }, {
//     patient_id: 'C123457891',
//     raw_data: '7891-nromal.csv',
//     cc_result_mms: 'normal',
//     cc_result_ray: 'IEM',
//     cc_result_liang: '-',
//     last_review_ray: '2021/10/1',
//     last_review_liang: '-',
// }, {
//     patient_id: 'D123450000',
//     raw_data: '0000-IEM.csv',
//     cc_result_mms: 'IEM',
//     cc_result_ray: 'Absent',
//     cc_result_liang: 'normal',
//     last_review_ray: '2021/10/3',
//     last_review_liang: '2021/10/7',
// }]

export let  mrs_main_table_data = [{
    patient_id: 'A123456789',
    raw_data: '16789-CR.csv',
    mrs_result_ray: 'Contractile Reserve',
    mrs_result_liang: 'Not Contractile Reserve',
    last_review_ray: '2021/10/3',
    last_review_liang: '2021/10/7',
}, {
    patient_id: 'B123458888',
    raw_data: '8888-CR.csv',
    mrs_result_ray: 'Not Contractile Reserve',
    mrs_result_liang: '-',
    last_review_ray: '2021/10/9',
    last_review_liang: '-',
}, {
    patient_id: 'C123457891',
    raw_data: '7891-not_CR.csv',
    mrs_result_ray: '-',
    mrs_result_liang: 'Contractile Reserve',
    last_review_ray: '-',
    last_review_liang: '2021/10/1',
}, {
    patient_id: 'C123457891',
    raw_data: '7891-not_CR.csv',
    mrs_result_ray: '-',
    mrs_result_liang: '-',
    last_review_ray: '-',
    last_review_liang: '-',
}]

export let rdc_main_table_data = [{
    patient_id: 'C123457891',
    raw_data: '7891-EGJOO.csv',
    rdc_result_ray: 'EGJOO',
    rdc_result_liang: 'EGJOO',
    last_review_ray: '2021/10/1',
    last_review_liang: '2021/10/9',
}, {
    patient_id: 'A183455839',
    raw_data: '5839-EGJOO.csv',
    rdc_result_ray: 'Not EGJOO',
    rdc_result_liang: '-',
    last_review_ray: '2021/10/3',
    last_review_liang: '-',
}, {
    patient_id: 'C123458345',
    raw_data: '8345-not_EGJOO.csv',
    rdc_result_ray: '-',
    rdc_result_liang: 'EGJOO',
    last_review_ray: '-',
    last_review_liang: '2021/10/7',
}, {
    patient_id: 'D123451143',
    raw_data: '1143-not_EGJOO.csv',
    rdc_result_ray: '-',
    rdc_result_liang: '-',
    last_review_ray: '-',
    last_review_liang: '-',
}]

export let hh_main_table_data = [{
    patient_id: 'D123458349',
    raw_data: '8349.csv',
    hh_result_ray: 'No Hiatal hernia',
    rip_result_ray: 'Proximal RIP',
    hh_result_liang: 'Hiatal hernia',
    rip_result_liang: 'Distal RIP',
    last_review_ray: '2021/11/2',
    last_review_liang: '2021/10/29',
}, {
    patient_id: 'D123452334',
    raw_data: '2334.csv',
    hh_result_ray: 'Hiatal hernia indeterminant',
    rip_result_ray: 'Distal RIP',
    hh_result_liang: '-',
    rip_result_liang: '-',
    last_review_ray: '2021/10/13',
    last_review_liang: '-',
}, {
    patient_id: 'D123452232',
    raw_data: '2232.csv',
    hh_result_ray: '-',
    rip_result_ray: '-',
    hh_result_liang: 'No Hiatal hernia',
    rip_result_liang: 'Proximal RIP',
    last_review_ray: '-',
    last_review_liang: '2021/10/5',
}, {
    patient_id: 'D123452232',
    raw_data: '2232.csv',
    hh_result_ray: '-',
    rip_result_ray: '-',
    hh_result_liang: '-',
    rip_result_liang: '-',
    last_review_ray: '-',
    last_review_liang: '-',
}]




// "所有資料"頁面的假資料
export let main_table_data = [{
    patient_id: 'A123456789',
    raw_data: '6789-nromal.csv',
    doctor: '0',
    ws_10_result: 'normal',
    mrs_result: 'Contractile Reverse',
    hh_result: 'Hiatal hernia',
    rip_result: 'Proximal RIP',
    last_update: '2021/10/1'
}, {
    patient_id: 'A123456789',
    raw_data: '6789-nromal.csv',
    doctor: '1',
    ws_10_result: 'IEM',
    mrs_result: 'Not Contractile Reverse',
    hh_result: 'No Hiatal hernia',
    rip_result: 'Distal RIP',
    last_update: '2021/10/7'
}, {
    patient_id: 'A123453423',
    raw_data: '3423-nromal.csv',
    doctor: '0',
    ws_10_result: 'Absent',
    mrs_result: '-',
    hh_result: 'Hiatal hernia',
    rip_result: '-',
    last_update: '2021/10/4'
}, {
    patient_id: 'A123453423',
    raw_data: '3423-nromal.csv',
    doctor: '1',
    ws_10_result: 'Fragmented',
    mrs_result: 'Not Contractile Reverse',
    hh_result: 'Hiatal hernia indeterminant',
    rip_result: 'Distal RIP',
    last_update: '2021/10/9'
}, {
    patient_id: 'A123452945',
    raw_data: '2945-nromal.csv',
    doctor: '0',
    ws_10_result: '-',
    mrs_result: 'Contractile Reverse',
    hh_result: '-',
    rip_result: 'Distal RIP',
    last_update: '2021/10/6'
}, {
    patient_id: 'A123452945',
    raw_data: '2945-nromal.csv',
    doctor: '1',
    ws_10_result: 'Fragmented',
    mrs_result: '-',
    hh_result: 'No Hiatal hernia',
    rip_result: 'Proximal RIP',
    last_update: '2021/10/8'
}]

export let upload_data = [{
    patient_id: 'A123452945',
    raw_data: '2945-nromal.csv',
    ws_10_result: 'Fragmented',
    mrs_result: '-',
    hh_result: 'No Hiatal hernia',
    rip_result: 'Proximal RIP',
    last_update: '2021/10/8'
}, {
    patient_id: 'A123452945',
    raw_data: '2945-nromal.csv',
    ws_10_result: '-',
    mrs_result: 'Contractile Reverse',
    hh_result: '-',
    rip_result: 'Distal RIP',
    last_update: '2021/10/6'
}, {
    patient_id: 'A123453423',
    raw_data: '3423-nromal.csv',
    ws_10_result: 'Absent',
    mrs_result: '-',
    hh_result: 'Hiatal hernia',
    rip_result: '-',
    last_update: '2021/10/4'
}]