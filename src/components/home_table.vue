<template>
    <div id=main_table_container>
        <!-- main table start -->
        <el-table :data="main_table_data" height="720" border style="width: 100%"  :header-cell-style="{background: '#94F552', color: 'black'}" @sort-change='sort_date'>
            <el-table-column type="index" :index="idx_method">
            </el-table-column>
            <el-table-column prop="patient_id" label="ID" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="raw_data" label="Raw Data" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="mms_cc_result" label="MMS CC result" :width="table_item_width" :filters="cc_filter" :filter-method="mms_cc_filter_method">
            </el-table-column>
            <el-table-column prop="ray_cc_result" label="Dr. Ray CC result" :width="table_item_width" :filters="cc_filter" :filter-method="ray_cc_filter_method">
            </el-table-column>
            <el-table-column prop="liang_cc_result" label="Dr. Liang CC result" :width="table_item_width" :filters="cc_filter" :filter-method="liang_cc_filter_method">
            </el-table-column>
            <el-table-column prop="last_review_ray" label="Dr. Ray" :width="table_item_width" sortable="'custom'">
            </el-table-column>
            <el-table-column prop="last_review_liang" label="Dr. Liang" :width="table_item_width" sortable="'custom'">
            </el-table-column>
            <el-table-column prop="action" label="操作" :width="220">
                <template slot-scope="scope" style="display: flex-box">
                    <el-button size="mini" type='primary' @click="handleEdit(scope.$index, scope.row)" :disabled="check_login">輸入</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="check_login">刪除</el-button>
                    <el-button size="mini" type="success" @click="handleDraw(scope.$index, scope.row)" :disabled="check_login">繪圖</el-button>
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
            <add_table :patient_id="current_patient_id" @update_send="update_table_send" @send_object="get_object"/> 
            <div style="text-align:right; ">
				<el-button type="danger" icon="el-icon-close" @click="dialogVisible = false">關 閉</el-button>
                <el-button type="primary" icon="el-icon-check" @click="send_backend" style="margin-top: 30px; margin-bottom: 50px" :disabled="send_disable"> 送出 </el-button>
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

import add_table from "../components/add_table.vue"
// import ws_10_draw from "./ws_10_draw.vue"

export default {
    name: 'home_table',
    components: {
		add_table,
        // ws_10_draw,
	},
    data() {
        return {
            main_table_data: [{
                patient_id: 'A123456789',
                raw_data: '1234-nromal.csv',
                mms_cc_result: 'normal',
                ray_cc_result: '-',
                liang_cc_result: '-',
                last_review_ray: '2021/10/4 10:00:00',
                last_review_liang: '2021/10/7',
            }, {
                patient_id: 'A123456789',
                raw_data: '1234-nromal.csv',
                mms_cc_result: 'normal',
                ray_cc_result: '-',
                liang_cc_result: '-',
                last_review_ray: '2021/10/3',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                raw_data: '1234-nromal.csv',
                mms_cc_result: 'normal',
                ray_cc_result: '-',
                liang_cc_result: '-',
                last_review_ray: '-',
                last_review_liang: '-',
            }],
            table_item_width: 170,
            cc_filter: [
                {text: 'normal', value: 'normal'},
                {text: 'IRP', value: 'IRP'},
                {text: 'Absent', value: 'Absent'},
                {text: 'Fragmented', value: 'Fragmented'}
            ],
            current_patient_id: '',
            dialogVisible: false,
            table_data: [{
                metrics: 'Contraction Vigor',
                sw1: '',
                sw2: '',
                sw3: '',
                sw4: '',
                sw5: '',
                sw6: '',
                sw7: '',
                sw8: '',
                sw9: '',
                sw10: '',
            }, {
                metrics: 'Contraction Pattern',
                sw1: '',
                sw2: '',
                sw3: '',
                sw4: '',
                sw5: '',
                sw6: '',
                sw7: '',
                sw8: '',
                sw9: '',
                sw10: '',
            }, {
                metrics: 'Swallow Type',
                sw1: '',
                sw2: '',
                sw3: '',
                sw4: '',
                sw5: '',
                sw6: '',
                sw7: '',
                sw8: '',
                sw9: '',
                sw10: '',
            }, {
                metrics: 'IRP 4s',
                sw1: '',
                sw2: '',
                sw3: '',
                sw4: '',
                sw5: '',
                sw6: '',
                sw7: '',
                sw8: '',
                sw9: '',
                sw10: '',
            }, {
                metrics: 'DCI',
                sw1: '',
                sw2: '',
                sw3: '',
                sw4: '',
                sw5: '',
                sw6: '',
                sw7: '',
                sw8: '',
                sw9: '',
                sw10: '',
            }, {
                metrics: 'Distal Latency',
                sw1: '',
                sw2: '',
                sw3: '',
                sw4: '',
                sw5: '',
                sw6: '',
                sw7: '',
                sw8: '',
                sw9: '',
                sw10: '',
            }],
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
        }  
    },
    props: {
        
    },
    computed:{
        check_login:function(){
            return !(this.$store.state.auth_app.login_status)
        }
    },
    methods: {
        idx_method: function(index) {
            return index
        },
        mms_cc_filter_method: function(value, row) {
            return row.mms_cc_result === value;
        },
        ray_cc_filter_method: function(value, row) {
            return row.ray_cc_result === value;
        },
        liang_cc_filter_method: function(value, row) {
            return row.liang_cc_result === value;
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

            for(var i = 0 ; i<this.main_table_data.length ; i++) {
                var time_stamp = Date.parse(this.main_table_data[i][col_key])
                this.main_table_data[i][col_key] = time_stamp
            }

            if(sort_type == 'descending') {
                this.main_table_data = this.main_table_data.sort(function(a, b) {
                    return b[col_key] - a[col_key]
                });
            }
            else {
                this.main_table_data = this.main_table_data.sort(function(a, b) {
                    return a[col_key] - b[col_key]
                });
            }

            for(var j = 0 ; j<this.main_table_data.length ; j++) {
                var date = new Date(this.main_table_data[j][col_key])
                var t = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                this.main_table_data[j][col_key] = t
            }

        }
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

</style>