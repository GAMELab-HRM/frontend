<template>
    <div>
        <el-table :data="MMS_table_data" height="400" border style="width: 100% text-align: center" :header-cell-style="{ background: '#4C8ED2', color: 'white' }" highlight-current-row>
            <el-table-column :label="patient_id" prop="metrics">
            </el-table-column>
            <el-table-column v-for="(index) in 10" :label='"wet swallow "+index' :prop='"sw"+index' :key="index">
                <template slot-scope="scope">
                    <el-input v-model="MMS_table_data[scope.$index]['sw'+index]"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
export default {
    data() {
        return {
            text:'',
            MMS_table_data: [{
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
                metrics: 'IRP4 s',
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