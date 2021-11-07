<template>
    <el-table :data="upload_data" height="720" border style="width: 100%"  :header-cell-style="{background: '#D9C2A6', color: 'black', fontSize: '15px', borderColor: 'black'}" :cell-style="{borderColor: 'black'}" @sort-change='sort_date' :default-sort="default_sort_param">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="record_id" label="Record ID"></el-table-column>
        <el-table-column prop="patient_id" label="Patient ID"></el-table-column>
        <el-table-column prop="filename" label="Filename"></el-table-column>
        <el-table-column prop="last_update" label="Last update" sortable></el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'upload_table',
    data() {
        return {
            default_sort_param: {
                prop: 'last_update'
                , order: 'descending'
            },
            fileList: [],
        }
    },
    props:['upload_data'],
    created() {

    },
    methods: {
        sort_date(column) {
            var col_key = column.prop
            var sort_type = column.order
            var time_stamp = 0
            var t = ''

            for(var i = 0 ; i<this.upload_data.length ; i++) {
                if(this.upload_data[i][col_key] == '-'){
                    time_stamp = 0
                }
                else{
                    time_stamp = Date.parse(this.upload_data[i][col_key])
                }
                this.upload_data[i][col_key] = time_stamp
            }

            if(sort_type == 'descending') {
                this.upload_data = this.upload_data.sort(function(a, b) {
                    return b[col_key] < a[col_key]
                });
            }
            else {
                this.upload_data = this.upload_data.sort(function(a, b) {
                    return a[col_key] > b[col_key]
                });
            }

            for(var j = 0 ; j<this.upload_data.length ; j++) {
                if(this.upload_data[j][col_key] == 0) {
                    t = '-'
                }
                else {
                    var date = new Date(this.upload_data[j][col_key])
                    t = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                }
                
                this.upload_data[j][col_key] = t
            }
        },
    },
}
</script>

<style scoped>
.el-table--border:after,
.el-table--group:after,
.el-table:before {
    background-color: black;
}

.el-table--border,
.el-table--group {
    border-color: black;
}

.el-table td,
.el-table th.is-leaf {
        border-bottom: 1px solid black;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
        border-bottom: 1px solid black;
}

.el-table--border td,
.el-table--border th {
        border-right: 1px solid black;
}
</style>