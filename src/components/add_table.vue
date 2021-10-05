<template>
    <div>
        <el-table :data="MMS_table_data" height="300" border style="width: 100% text-align: center" :header-cell-style="{ background: '#4C8ED2', color: 'white' }">
            <el-table-column :label="patient_id" prop="metrics">
            </el-table-column>
            <el-table-column v-for="(index) in 10" :label='"wet swallow "+index' :prop='"sw"+index' :key="index">
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
export default {
    data() {
        return {
            MMS_table_data: [{
                metrics: 'Contraction Vigor',
                sw1: 123,
                sw2: 123,
                sw3: 123,
                sw4: 123,
                sw5: 123,
                sw6: 123,
                sw7: 123,
                sw8: 123,
                sw9: 123,
                sw10: 123,
            }, {
                metrics: 'Contraction Pattern',
                sw1: 123,
                sw2: 123,
                sw3: 123,
                sw4: 123,
                sw5: 123,
                sw6: 123,
                sw7: 123,
                sw8: 123,
                sw9: 123,
                sw10: 123,
            }, {
                metrics: 'IRP4 s',
                sw1: 123,
                sw2: 123,
                sw3: 123,
                sw4: 123,
                sw5: 123,
                sw6: 123,
                sw7: 123,
                sw8: 123,
                sw9: 123,
                sw10: 123,
            }, {
                metrics: 'DCI',
                sw1: 123,
                sw2: 123,
                sw3: 123,
                sw4: 123,
                sw5: 123,
                sw6: 123,
                sw7: 123,
                sw8: 123,
                sw9: 123,
                sw10: 123,
            }, {
                metrics: 'Distal Latency',
                sw1: 123,
                sw2: 123,
                sw3: 123,
                sw4: 123,
                sw5: 123,
                sw6: 123,
                sw7: 123,
                sw8: 123,
                sw9: 123,
                sw10: 123,
            }]
        }
    },
    props: {
        patient_id: String
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
        }
    }
}
</script>


<style scoped>

</style>