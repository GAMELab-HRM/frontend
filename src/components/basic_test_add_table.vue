<template>
    <div>
        <el-table id=add_teble :data="table_data" height="470" border style="width: 100%; text-align: center" :header-cell-style="{ background: '#4C8ED2', color: 'white', borderColor: 'black'}" :cell-style="{borderColor: 'black'}" highlight-current-row>
            <el-table-column :label="patient_id" prop="metrics">
            </el-table-column>
            <el-table-column v-for="(index) in 10" :label='"swallow "+index' :prop='"sw"+index' :key="index">
                <template slot-scope="scope">
                    <div v-if="scope.$index < 3">
                        <el-select v-model="table_data[scope.$index]['sw'+index]" placeholder="請選擇" @change="check_table">
                            <el-option v-for="item in options(scope.$index)" :key="item.value" :label="item.label" :value="item.value">
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
    name: 'basic_test_add_table',
    data() {
        return {
            text:'',
            send_disable: true,
            vigor_options: [{
                value: 'Failed',
                label: 'Failed'
            }, {
                value: 'Weak',
                label: 'Weak'
            }, {
                value: 'Normal',
                label: 'Normal'
            }, {
                value: 'Hypercontractile',
                label: 'Hypercontractile'
            }],
            pattern_options: [{
                value: 'Failed',
                label: 'Failed'
            }, {
                value: 'Premature',
                label: 'Premature'
            }, {
                value: 'Fragmented',
                label: 'Fragmented'
            }, {
                value: 'Intact',
                label: 'Intact'
            }],
            type_options: [{
                value: 'Normal',
                label: 'Normal'
            }, {
                value: 'Weak',
                label: 'Weak'
            }, {
                value: 'Failed contraction',
                label: 'Failed contraction'
            }, {
                value: 'Premature',
                label: 'Premature'
            }, {
                value: 'Hyper',
                label: 'Hyper'
            }, {
                value: 'Fragmented',
                label: 'Fragmented'
            }],
        }
    },
    props: {
        patient_id: [String],
        table_data:[]
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
        options: function(idx) {
            var options_lst = [this.vigor_options, this.pattern_options, this.type_options]
            return options_lst[idx]
        }
    }
}
</script>


<style scoped>
.el-table--border:after,
.el-table--group:after,
.el-table:before {
    background-color: black;
}

.el-table--border,
.el-table--group {
    border-color: black;
}

.el-table td,
.el-table th.is-leaf {
        border-bottom: 1px solid black;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
        border-bottom: 1px solid black;
}

.el-table--border td,
.el-table--border th {
        border-right: 1px solid black;
}
</style>