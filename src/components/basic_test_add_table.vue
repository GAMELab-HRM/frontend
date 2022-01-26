<template>
    <div>
        <el-table id=add_teble :data="table_data" height=530 border style="width: 100%; text-align: center" :header-cell-style="{ background: '#4C8ED2', color: 'white', borderColor: 'black'}" :cell-style="{borderColor: 'black'}" highlight-current-row>
            <el-table-column :label="patient_id" prop="metrics">
            </el-table-column>
            <el-table-column v-for="(index) in 10" :label='"swallow "+index' :prop='"sw"+index' :key="index">
                <template slot-scope="scope">
                    <div v-if="scope.$index < 3">
                        <el-select v-model="table_data[scope.$index]['sw'+index]" placeholder="請選擇" @change="check_table">
                            <el-option v-for="item in get_options(scope.$index)" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-else>
                        <el-input v-model="table_data[scope.$index]['sw'+index]" @change="table_text_change(scope)"></el-input>
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
        table_data:[],
    },

    mounted() {

    },

    methods: {
        check_table() {
            for (var i = 0; i < this.table_data.length; i++) {
                var val_lst = Object.values(this.table_data[i])
                if(val_lst.length != 11) {
                    this.send_disable = true
                    this.$emit('update_send', this.send_disable)
                    return 0
                }
            }

            var return_lst = []

            for(i = 0; i < this.table_data.length; i++) {
                var idxOfmetrics = Object.keys(this.table_data[i]).indexOf('metrics')
                val_lst = Object.values(this.table_data[i])
                val_lst.splice(idxOfmetrics, 1)
                return_lst.push(val_lst)
            }

            console.log("return lst", return_lst)

            this.send_disable = false
            this.$emit('update_send', this.send_disable)
            this.$emit('send_object', return_lst)

        },
        get_options: function(idx) {
            var options_lst = [this.vigor_options, this.pattern_options, this.type_options]
            return options_lst[idx]
        },
        table_text_change(scope) {
            var row = scope.row
            if(row['metrics'] == 'Break') {
                delete row['metrics']
                var break_lst = Object.values(row)
                break_lst = break_lst.filter(function(val) {
                    return val !== ''
                })
                break_lst = break_lst.map(function(val) {
                    return parseFloat(val)
                })
                if(break_lst.length > 0) {
                    this.set_mean_break(break_lst)
                    this.set_max_break(break_lst)
                }
                else {
                    this.$emit('set_mean_break', '-')
                    this.$emit('set_max_break', '-')
                }
                row["metrics"] = "Break"
            } else if(row['metrics'] == 'DCI') {
                this.set_vigor(scope)
                this.$emit('set_ws_10_DCI_in_MRS', '')
                this.$emit('set_MRS_DCI_ratio', '')
            }
            this.check_table()
        },
        set_mean_break(break_lst) {
            const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
            var mean_break = average(break_lst)
            this.$emit('set_mean_break', mean_break)
        },
        set_max_break(break_lst) {
            var max_break = Math.max(...break_lst)
            this.$emit('set_max_break', max_break)
        },
        set_vigor(scope) {
            var dci = this.table_data[scope.$index][scope.column.property]
            var vigor=''
            dci = parseFloat(dci)
            if(dci<100) {
                vigor='Failed'
            } else if(dci>=100 && dci<450) {
                vigor='Weak'
            } else {
                vigor='Normal'
            }
            this.table_data[0][scope.column.property] = vigor
        },
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