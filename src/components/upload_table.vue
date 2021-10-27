<template>
    <el-table :data="main_table_data" height="720" border style="width: 100%"  :header-cell-style="{background: '#D9C2A6', color: 'black', fontSize: '15px'}" @sort-change='sort_date' :default-sort="default_sort_param">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="patient_id" label="Patient ID"></el-table-column>
        <el-table-column prop="ws_10_result" label="Wet swallow 10"></el-table-column>
        <el-table-column prop="mrs_result" label="MRS"></el-table-column>
        <el-table-column prop="hh_result" label="Hiatal hernia"></el-table-column>
        <el-table-column prop="rip_result" label="RIP"></el-table-column>
        <el-table-column prop="last_update" label="Last update" sortable></el-table-column>
    </el-table>
</template>

<script>

import {upload_data} from '@/utils/fakedata.js'


export default {
    name: 'upload_table',
    data() {
        return {
            main_table_data: 0,
            default_sort_param: {
                prop: 'last_update'
                , order: 'descending'
            },
            temp_upload_data: [{
                file_name: 'test1.csv'
            }],
            fileList: [],
        }
    },
    created() {
        this.main_table_data = upload_data
    },
    methods: {
        sort_date(column) {
            var col_key = column.prop
            var sort_type = column.order
            var time_stamp = 0
            var t = ''

            for(var i = 0 ; i<this.main_table_data.length ; i++) {
                if(this.main_table_data[i][col_key] == '-'){
                    time_stamp = 0
                }
                else{
                    time_stamp = Date.parse(this.main_table_data[i][col_key])
                }
                this.main_table_data[i][col_key] = time_stamp
            }

            if(sort_type == 'descending') {
                this.main_table_data = this.main_table_data.sort(function(a, b) {
                    return b[col_key] < a[col_key]
                });
            }
            else {
                this.main_table_data = this.main_table_data.sort(function(a, b) {
                    return a[col_key] > b[col_key]
                });
            }

            for(var j = 0 ; j<this.main_table_data.length ; j++) {
                if(this.main_table_data[j][col_key] == 0) {
                    t = '-'
                }
                else {
                    var date = new Date(this.main_table_data[j][col_key])
                    t = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                }
                
                this.main_table_data[j][col_key] = t
            }
        },
    },
}
</script>

<style scoped>

</style>