<template>
    <div id=main_table_container>
        <!-- main table start -->
        <el-table :data="main_table_data" height="720" border style="width: 100%"  :header-cell-style="{background: '#D9C2A6', color: 'black', fontSize: '15px'}" :span-method="main_table_span">
            <!-- 暫時刪除sort的功能 -->
            <!-- @sort-change='sort_date' :default-sort="default_sort_param" -->
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="patient_id" label="ID" width="110">
            </el-table-column>
            <el-table-column prop="filename" label="Filename">
            </el-table-column>
            <el-table-column prop="doctor_id" label="Doctor" width="110">
            </el-table-column>
            <el-table-column prop="ws_result" label="Wet Swallow 10 result" :filters="ws_10_filter" :filter-method="ws_10_filter_method">
            </el-table-column>
            <el-table-column prop="mrs_result" label="MRS result"  :filters="mrs_filter" :filter-method="mrs_filter_method">
            </el-table-column>
            <el-table-column prop="hiatal_hernia_result" label="Hiatal hernia result" :filters="hh_filter" :filter-method="hh_filter_method">
            </el-table-column>
            <el-table-column prop="rip_result" label="RIP result" :filters="rip_filter" :filter-method="rip_filter_method">
            </el-table-column>
            <el-table-column prop="last_update" label="Last update">
                <!-- 暫時刪除sort的功能 -->
                <!-- sortable -->
            </el-table-column>
            <el-table-column prop="action" label="操作">
                <template slot-scope="scope" style="display: flex-box">
                    <el-button size="mini" type='primary' :disabled="check_login" @click="handleEdit(scope.$index, scope.row)">輸 入</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="check_login">刪 除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- main table end -->

        <!-- 刪除 dialog start -->
        <el-dialog :visible.sync="delete_dialogVisible" width="30%" cneter> 
            <span><h2> 是否刪除 {{ current_patient_id }} 資料?</h2></span>
                <span>
                    <el-button type="danger" @click="delete_one" style="margin-top: 30px; margin-right: 20px"> 刪除我的診斷 </el-button>
                    <el-button type="danger" @click="delete_all"> 刪除兩位醫師的診斷</el-button>
                </span>
        </el-dialog>
        <!-- 刪除 dialog end -->
    </div>
</template>


<script>

export default {
    name: 'basic_test_table',
    components: {

	},
    props: ["main_table_data"],
    computed:{
        check_login:function(){
            return !(this.$store.state.auth_app.login_status)
        }
    },
    data() {
        return {
            ws_10_filter: [
                {text: 'normal', value: 'normal'},
                {text: 'IEM', value: 'IEM'},
                {text: 'Absent', value: 'Absent'},
                {text: 'Fragmented', value: 'Fragmented'}
            ],
            mrs_filter: [
                {text: 'Contractile Reserve', value: 'CR'},
                {text: 'Not Contractile Reserve', value: 'not_CR'},
            ],
            hh_filter: [
                {text: 'No Hiatal hernia', value: 'no_hh'},
                {text: 'Hiatal hernia indeterminant', value: 'indet_hh'},
                {text: 'Hiatal hernia', value: 'hh'},
            ],
            rip_filter: [
                {text: 'Proximal RIP', value: 'proximal'},
                {text: 'Distal RIP', value: 'distal'},
            ],
            // basic test 篩選對應表 end
            
            current_patient_id: '',
            // 選擇刪除類型彈框
            delete_dialogVisible: false,

            // 排序日期時使用的變數
            // default_sort_param: {
            //     prop: Object.keys(this.main_table_data[0]).slice(-2)[this.$store.state.auth_app.login_name]
            //     , order: 'ascending'
            // },
        }
    },
    methods: {
        // basic test filter method start
        ws_10_filter_method: function(value, row) {
            return row.ws_10_result === value;
        },
        mrs_filter_method: function(value, row) {
            for(var i=0 ; i<this.mrs_filter.length ; i++) {
                var t = this.mrs_filter[i]['text']
                var v = this.mrs_filter[i]['value']

                if(t == row.mrs_result && v == value) {
                    return true
                }
            }
            return false
        },
        hh_filter_method: function(value, row) {
            for(var i=0 ; i<this.hh_filter.length ; i++) {
                var t = this.hh_filter[i]['text']
                var v = this.hh_filter[i]['value']

                if(t == row.hh_result && v == value) {
                    return true
                }
            }
            return false
        },
        rip_filter_method: function(value, row) {
            for(var i=0 ; i<this.rip_filter.length ; i++) {
                var t = this.rip_filter[i]['text']
                var v = this.rip_filter[i]['value']

                if(t == row.rip_result && v == value) {
                    return true
                }
            }
            return false
        },
        // basic test filter method end

        // 輸入btn click event
        handleEdit: function(index) {
            this.$router.push({name: 'basic_test_add', params: {current_patient_id: this.main_table_data[index].patient_id}})
        },

        // 刪除btn click event
        handleDelete: function(index, row) {
            this.delete_dialogVisible = true;
            this.current_patient_id = this.main_table_data[index].patient_id
            console.log(index)
            console.log(row)
        },

        // two delete type
        delete_one() {
            console.log(this.$store.state.auth_app.login_name)
            this.delete_dialogVisible = false
        },
        delete_all() {
            this.delete_dialogVisible = false
        },

        // sort column
        // sort 會直接改變每筆row的順序(有機會出現同個病人但兩個標註的醫師都是Liang)，因此暫刪
        // sort_date(column) {
        //     var col_key = column.prop
        //     var sort_type = column.order
        //     var time_stamp = 0
        //     var t = ''

        //     for(var i = 0 ; i<this.main_table_data.length ; i++) {
        //         if(this.main_table_data[i][col_key] == '-'){
        //             time_stamp = 0
        //         }
        //         else{
        //             time_stamp = Date.parse(this.main_table_data[i][col_key])
        //         }
        //         this.main_table_data[i][col_key] = time_stamp
        //     }

        //     if(sort_type == 'descending') {
        //         this.main_table_data = this.main_table_data.sort(function(a, b) {
        //             return b[col_key] < a[col_key]
        //         });
        //     }
        //     else {
        //         this.main_table_data = this.main_table_data.sort(function(a, b) {
        //             return a[col_key] > b[col_key]
        //         });
        //     }

        //     for(var j = 0 ; j<this.main_table_data.length ; j++) {
        //         if(this.main_table_data[j][col_key] == 0) {
        //             t = '-'
        //         }
        //         else {
        //             var date = new Date(this.main_table_data[j][col_key])
        //             t = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        //         }
                
        //         this.main_table_data[j][col_key] = t
        //     }

        // },


        // 合併table row start
        indexMethod(index) {
            return parseInt(index/2) + 1
        },
        // main_table_span({row, column, rowIndex, columnIndex})
        main_table_span({rowIndex, columnIndex}) {
            // console.log(row, column)
            var concate_row = [0, 1, 2, 9]
            // console.log(columnIndex)
            if(concate_row.includes(columnIndex)) {
                console.log(true)
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    }
                }
                else {
                    return {
                        rowspan:0,
                        colspan:0
                    }
                }
            }
        }
        // 合併table row end
    }
    
}
</script>


<style scoped>
#main_table_container {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    width: 80%
}

.el-table .column_name {
    background: gray;
}

::v-deep .el-dialog .el-dialog__header .el-dialog__title {
    font-size: 30px
}

</style>