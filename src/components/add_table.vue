<template>
    <div>
        <el-table :data="MMS_table_data" height="400" border style="width: 100% text-align: center" :header-cell-style="{ background: '#4C8ED2', color: 'white' }" highlight-current-row>
            <el-table-column :label="patient_id" prop="metrics">
            </el-table-column>
            
            <template >
                <el-table-column v-for="(index) in 10" :label='"wet swallow "+index' :key="index">
                    <!-- <el-input v-model='MMS_table_data.data[index]' @change="handleEdit(scope.$index, scope.row)"></el-input><span>{{ MMS_table_data.data[index] }}</span> -->
                    {{ MMS_table_data[index].data[index] }}
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>


<script>
export default {
    data() {
        return {
            MMS_table_data: [{
                metrics: 'Contraction Vigor',
                data: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                ]
            }, {
                metrics: 'Contraction Pattern',
                data: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                ]
            }, {
                metrics: 'IRP4 s',
                data: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                ]
            }, {
                metrics: 'DCI',
                data: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                ]
            }, {
                metrics: 'Distal Latency',
                data: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                ]
            }],
        }
    },
    props: {
        patient_id: [String]
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
        handleEdit: function(index, row) {
            console.log(index)
            console.log(row)
        }
    }
}
</script>


<style scoped>

</style>