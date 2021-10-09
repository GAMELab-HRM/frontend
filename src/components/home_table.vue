<template>
    <div id=main_table_container>
        <!-- main table start -->
        <el-table :data="main_table_data" height="720" border style="width: 100%"  :header-cell-style="{background: '#4C8ED2', color: 'white'}">
            <el-table-column type="index" :index="idx_method">
            </el-table-column>
            <el-table-column prop="patient_id" label="ID" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="mms_cc_result" label="MMS CC result" :width="table_item_width" :filters="cc_filter" :filter-method="mms_cc_filter_method">
            </el-table-column>
            <el-table-column prop="ray_cc_result" label="Dr. Ray CC result" :width="table_item_width" :filters="cc_filter" :filter-method="ray_cc_filter_method">
            </el-table-column>
            <el-table-column prop="liang_cc_result" label="Dr. Liang CC result" :width="table_item_width" :filters="cc_filter" :filter-method="liang_cc_filter_method">
            </el-table-column>
            <el-table-column prop="last_review_ray" label="Dr. Ray" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="last_review_liang" label="Dr. Liang" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="action" label="操作" :width="table_item_width">
                <template slot-scope="scope">
                    <el-button size="mini" type='primary' @click="handleEdit(scope.$index, scope.row)" :disabled="check_login">輸入診斷</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="check_login">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- main table end -->

        <!-- 輸入診斷 table start-->
        <el-dialog :title="current_patient_id" :visible.sync="dialogVisible" width="85%"  destroy-on-close :before-close="handleClose">
            <add_table :patient_id="current_patient_id" @update_send="update_send" @send_object="get_object"/> 
            <div style="text-align:right; ">
				<el-button type="danger" icon="el-icon-close" @click="dialogVisible = false">關 閉</el-button>
                <el-button type="primary" icon="el-icon-check" @click="send_backend" style="margin-top: 30px; margin-bottom: 50px" :disabled="send_disable"> 送出 </el-button>
			</div>
        </el-dialog>
        <!-- 輸入診斷 table end -->

        <!-- 刪除 dialog start -->
        <el-dialog :visible.sync="delete_dialogVisible" width="30%" cneter> 
            <span><h2> 是否刪除 {{ current_patient_id }} 所有資料?</h2></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="delete_dialogVisible = false">返回</el-button>
                    <el-button type="danger" @click="delete_dialogVisible = false"> 確認刪除 </el-button>
                </span>
        </el-dialog>
        <!-- 刪除 dialog end -->
    </div>
</template>





<script>

import add_table from "../components/add_table.vue"

export default {
    components: {
		add_table,
	},
    data() {
        return {
            main_table_data: [{
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: '-',
                liang_cc_result: '-',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'B12738912703',
                mms_cc_result: 'Absent',
                ray_cc_result: '-',
                liang_cc_result: '-',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'C1837901283',
                mms_cc_result: 'IEM',
                ray_cc_result: '-',
                liang_cc_result: '-',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }],
            table_item_width: 200,
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
        update_send(val) {
            console.log(val)
            if(val == false) {
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
			this.$alert('成功 !', '信息', { confirmButtonText: '确定',  callback: action => {
                this.dialogVisible = false
                console.log(action)
            }
        });
            console.log(dic)
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