<template>
    <div id=main_table_container>
<<<<<<< HEAD
        <el-table :data="main_table_data" height="720" border style="width: 100%"  :header-cell-style="{background: '#4C8ED2', color: 'white'}">
=======
        <el-table :data="main_table_data" height="720" border style="width: 100%" >
>>>>>>> d4d6de7db6f30f09a2c853b5e4f5cf92b74dd556
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
            <el-table-column prop="source" label="資料來源" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="last_review_ray" label="Dr. Ray" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="last_review_liang" label="Dr. Liang" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="action" label="操作" :width="table_item_width">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" :disabled="check_login">編輯</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="check_login">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>





<script>
export default {
    data() {
        return {
            main_table_data: [{
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'Absent',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'IRP',
                ray_cc_result: 'Absent',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                mms_cc_result: 'normal',
                ray_cc_result: 'normal',
                liang_cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }],
            table_item_width: 180,
            cc_filter: [
                {text: 'normal', value: 'normal'},
                {text: 'IRP', value: 'IRP'},
                {text: 'Absent', value: 'Absent'},
                {text: 'Fragmented', value: 'Fragmented'}
            ]
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
        handleDelete: function(index, row) {
            console.log(index)
            console.log(row)
        },
        tableRowClassName: function(row, rowIndex) {
            if (rowIndex === 1) {
                return 'column_name';
            } 
            console.log(row)
            return '';
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