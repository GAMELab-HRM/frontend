<template>
    <div id=main_table_container>
        <!-- main table start -->
        <el-table :data="main_table_data" height="720" border style="width: 100%"  :header-cell-style="{background: '#D9C2A6', color: 'black', fontSize: '15px'}" @sort-change='sort_date' :default-sort="default_sort_param">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="patient_id" label="ID" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="raw_data" label="Raw Data" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="hh_result_ray" label="Dr. Ray Hiatal hernia result" :width="table_item_width" :filters="hh_filter" :filter-method="hh_filter_method_ray">
            </el-table-column>
            <el-table-column prop="rip_result_ray" label="Dr. Ray RIP result" :width="table_item_width" :filters="rip_filter" :filter-method="rip_filter_method_ray">
            </el-table-column>
            <el-table-column prop="hh_result_liang" label="Dr. Liang Hiatal hernia result" :width="table_item_width" :filters="hh_filter" :filter-method="hh_filter_method_liang">
            </el-table-column>
            <el-table-column prop="rip_result_liang" label="Dr. Liang RIP result" :width="table_item_width" :filters="rip_filter" :filter-method="rip_filter_method_liang">
            </el-table-column>
            <el-table-column prop="last_review_ray" label="Dr. Ray" :width="table_item_width" sortable>
            </el-table-column>
            <el-table-column prop="last_review_liang" label="Dr. Liang" :width="table_item_width" sortable>
            </el-table-column>
            <el-table-column prop="action" label="操作" :width="220">
                <template slot-scope="scope" style="display: flex-box">
                    <el-button size="mini" type='primary' @click="handleEdit(scope.$index, scope.row)" :disabled="check_login">輸 入</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="check_login">刪 除</el-button>
                    <el-button size="mini" type="success" @click="handleDraw(scope.$index, scope.row)" :disabled="check_login">繪 圖</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- main table end -->

        <!-- 輸入 table start-->
        <el-dialog :title="current_patient_id" :visible.sync="dialogVisible" width="85%"  destroy-on-close :before-close="handleClose">
            <el-select v-model="cc_result" placeholder="CC Result" style="margin-bottom: 15px;" @change="cc_selected_update">
				<el-option v-for="item in cc_options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
            <!-- <add_table :patient_id="current_patient_id" @update_send="update_table_send" @send_object="get_object"/>  -->
            <p>等 RDC_add好了才有</p>
            <div style="text-align:right; ">
				<el-button type="danger" icon="el-icon-close" @click="dialogVisible = false">關 閉</el-button>
                <el-button type="primary" icon="el-icon-check" @click="send_backend" style="margin-top: 30px; margin-bottom: 50px" :disabled="send_disable">送 出</el-button>
			</div>
        </el-dialog>
        <!-- 輸入 table end -->

        <!-- 刪除 dialog start -->
        <el-dialog :visible.sync="delete_dialogVisible" width="30%" cneter> 
            <span><h2> 是否刪除 {{ current_patient_id }} 資料?</h2></span>
                <span>
                    <el-button type="danger" @click="delete_one" style="margin-top: 30px; margin-right: 20px"> 刪除我的診斷 </el-button>
                    <el-button type="danger" @click="delete_all"> 刪除兩位醫師的診斷</el-button>
                </span>
        </el-dialog>
        <!-- 刪除 dialog end -->

        <!-- 繪圖 dialog start-->
        <el-dialog :title=current_patient_id :visible.sync="draw_dialog_visible" width="80%">
            <span>訊息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="draw_handle_close" type='danger'>關閉</el-button>
            </span>
        </el-dialog>

        <!-- 繪圖 dialog end -->
    </div>
</template>





<script>

// import add_table from "../components/WS_10_add_table.vue"
// import ws_10_draw from "./ws_10_draw.vue"

export default {
    name: 'Hiatal_hernia_home_table',
    components: {
		// add_table,
        // ws_10_draw,
	},
    data() {
        return {
            table_item_width: 200,
            hh_filter: [
                {text: 'No Hiatal hernia', value: 'not_hh'},
                {text: 'Hiatal hernia indeterminant', value: 'indeterminant'},
                {text: 'Hiatal hernia', value: 'hh'},
            ],
            rip_filter: [
                {text: 'Proximal RIP', value: 'proximal'},
                {text: 'Distal RIP', value: 'distal'},
            ],
            current_patient_id: '',
            dialogVisible: false,
            send_disable: true,
            object: '',
            delete_dialogVisible: false,
            cc_options:[{
                value: 'Absent',
                label: 'Absent'
            }, {
                value: 'IEM',
                label: 'IEM'
            }, {
                value: 'Fragmented',
                label: 'Fragmented'
            }, {
                value: 'Normal',
                label: 'Normal'
            }],
            cc_result: '',
            cc_result_selected: false,
            table_send: false,
            draw_dialog_visible: false,
            default_sort_param: {
                prop: Object.keys(this.main_table_data[0]).slice(-2)[this.$store.state.auth_app.login_name]
                , order: 'ascending'
            },
            test: 0
        }
    },
    props: ["main_table_data"],
    computed:{
        check_login:function(){
            return !(this.$store.state.auth_app.login_status)
        }
    },
    methods: {
        idx_method: function(index) {
            return index
        },
        hh_filter_method_ray: function(value, row) {
            for(var i=0 ; i<this.hh_filter.length ; i++) {
                var t = this.hh_filter[i]['text']
                var v = this.hh_filter[i]['value']

                if(t == row.hh_result_ray && v == value) {
                    return true
                }
            }
            return false
        },
        rip_filter_method_ray: function(value, row) {
            for(var i=0 ; i<this.rip_filter.length ; i++) {
                var t = this.rip_filter[i]['text']
                var v = this.rip_filter[i]['value']

                if(t == row.rip_result_ray && v == value) {
                    return true
                }
            }
            return false
        },
        hh_filter_method_liang: function(value, row) {
            for(var i=0 ; i<this.hh_filter.length ; i++) {
                var t = this.hh_filter[i]['text']
                var v = this.hh_filter[i]['value']

                if(t == row.hh_result_liang && v == value) {
                    return true
                }
            }
            return false
        },
        rip_filter_method_liang: function(value, row) {
            for(var i=0 ; i<this.rip_filter.length ; i++) {
                var t = this.rip_filter[i]['text']
                var v = this.rip_filter[i]['value']

                if(t == row.rip_result_liang && v == value) {
                    return true
                }
            }
            return false
        },
        handleEdit: function(index, row) {
            this.current_patient_id = this.main_table_data[index].patient_id
            this.dialogVisible = true;
            console.log(this.current_patient_id)
            console.log(row)
        },
        handleDelete: function(index, row) {
            this.delete_dialogVisible = true;
            this.current_patient_id = this.main_table_data[index].patient_id
            console.log(index)
            console.log(row)
        },
        tableRowClassName: function(row, rowIndex) {
            if (rowIndex === 1) {
                return 'column_name';
            } 
            console.log(row)
            return '';
        },
        handleClose(done) {
            this.$confirm('確認關閉?').then(_ => {
                done();
                console.log(_)
            }).catch(_ => {
                console.log(_)
            });
            
        
        },
        update_table_send(val) {
            // 因為val是send_disable
            this.table_send = !val
            this.update_send()
        },
        update_send() {
            console.log(this.table_send)
            console.log(this.cc_result_selected)
            if(this.table_send && this.cc_result_selected) {
                this.send_disable = false
            }
            else {
                this.send_disable = true
            }
        },
        get_object(object) {
            this.object = object
        },
        send_backend() {
            var all_object_col = ['id', 'vigor', 'pattern', 'swallow_type', 'irp', 'dci', 'dl']
			var dic = {}
			dic[all_object_col[0]] = this.current_patient_id
			for (var i = 0; i < this.object.length; i++) {
				var temp = Object.values(this.object[i])
				temp.shift()
				dic[all_object_col[i+1]] = temp
			}
            dic['cc_result'] = this.cc_result

			this.$alert('成功 !', '信息', { confirmButtonText: '确定',  callback: action => {
                    this.dialogVisible = false
                    console.log(action)
                }
            });
            console.log(dic)
            this.cc_result = ''
        },
        cc_selected_update() {
            this.cc_result_selected = true
            this.update_send()
        },
        delete_one() {
            console.log(this.$store.state.auth_app.login_name)
            this.delete_dialogVisible = false
        },
        delete_all() {
            this.delete_dialogVisible = false
        },
        handleDraw(index, row) {
            this.current_patient_id = this.main_table_data[index].patient_id
            this.draw_dialog_visible = true
            console.log(index, row)
        },
        draw_handle_close() {
            this.draw_dialog_visible = false
        },
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


#main_table_container {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    width: 80%
}

.el-table .column_name {
    background: gray;
}

</style>