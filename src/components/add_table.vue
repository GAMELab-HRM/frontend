<template>
    <div>
        <el-table :data="table_data" height="470" border style="width: 100% text-align: center" :header-cell-style="{ background: '#4C8ED2', color: 'white' }" highlight-current-row>
            <el-table-column :label="patient_id" prop="metrics">
            </el-table-column>
            <el-table-column v-for="(index) in 10" :label='"wet swallow "+index' :prop='"sw"+index' :key="index">
                <template slot-scope="scope">
                    <div v-if="toggle_selector(scope, scope.$index)">
                        <el-select :v-model="value[idx]" placeholder="請選擇">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-else>
                        <el-input v-model="table_data[scope.$index]['sw'+index]" @change="check_table"></el-input>
                    </div>
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
            options: [{
                value: '0',
                label: 'Normal'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: [0] * 10,
            idx: 0,
        }
    },
    props: {
        patient_id: [String],
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
        check_table: function() {
            // for (var i = 0; i < this.table_data.length; i++) {
            for (var i = 0; i < 1; i++) {
                var val_lst = Object.values(this.table_data[i])
                val_lst.shift()
                // for (var k = 0; k < val_lst.length; k++){
                for (var k = 0; k < 1; k++){
                    if (val_lst[k].length === 0) {
                        this.send_disable = true
                        this.$emit('update_send', this.send_disable)
                        return 0
                    }
                }
            }
            this.send_disable = false
            this.$emit('update_send', this.send_disable)
            this.$emit('send_object', this.table_data)
        },
        change_if_selector: function() {
            this.if_selector = !this.if_selector
        },
        toggle_selector: function(scope, idx) {
            console.log(scope)
            this.idx = parseInt(scope.column.property.slice(2), 10)
            console.log(this.idx)
            console.log(this.vigor_value)
            if (idx == 1) {
                return true
            }
            else {
                return false
            }
        }

    }
}
</script>


<style scoped>

</style>