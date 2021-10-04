<template>
    <div id=main_table_container>
        <el-table :data="main_table_data" height="700" border style="width: 100%">
            <el-table-column type="index" :index="idx_method">
            </el-table-column>
            <el-table-column prop="patient_id" label="ID" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="cc_result" label="MMS CC result" :width="table_item_width" :filters="cc_filter" :filter-method="cc_filter_method">
            </el-table-column>
            <el-table-column prop="source" label="資料來源" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="last_review_ray" label="Dr. Ray" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="last_review_liang" label="Dr. Liang" :width="table_item_width">
            </el-table-column>
            <el-table-column prop="action" label="操作" :width="table_item_width">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">編輯</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>





<script>
export default {
    name: 'main_table',
    data() {
        return {
            main_table_data: [{
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'Fragmented',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'Absent',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'IRP',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }, {
                patient_id: 'A123456789',
                cc_result: 'normal',
                source: 'google drive',
                last_review_ray: '2021/10/4',
                last_review_liang: '2021/10/5',
            }],
            table_item_width: 210,
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

    methods: {
        idx_method: function(index) {
            return index
        },
        cc_filter_method: function(value, row) {
            return row.cc_result === value;
        }
    }
}
</script>



<style scoped>

#main_table_container {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 40px;
    width: 70%
}




</style>