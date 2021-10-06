<template>
	<div id="add">
		<div id="main_container">
		
			<el-row :gutter="1">
				<el-col :span="4">
					<el-input placeholder="請輸入身分證字號" prefix-icon="el-icon-s-custom" v-model="patient_id" :disabled="patient_id_exist" :style='patient_id_style'/>
				</el-col>
				<el-col :span="3">
					<el-button type="primary" icon="el-icon-check" @click="check_patient_id" :style="check_btn_style"> 確認 </el-button>
					<el-button type="danger" icon="el-icon-refresh" @click="edit_patient_id" :style="edit_btn_style"> 修改 </el-button>
				</el-col>
			</el-row>

			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
                <span><h2> {{ dialog_text }}</h2></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">{{ dialog_btn_label }}</el-button>
                </span>
            </el-dialog>

			
			<h2 style="text-align:left; color: white; padding-top: 20px">Ground Truth</h2>
			<div id=GT_table_container>
				<add_table :patient_id="patient_id"/>
			</div>

			<h2 style="text-align:left; color: white; padding-top: 50px">MMS Result</h2>
			<div id=MMS_table_container>
				<add_table :patient_id="patient_id"/>
			</div>

			<div style="text-align:right; ">
				<el-button type="primary" icon="el-icon-check" @click="send" style="margin-top: 30px; "> 送出 </el-button>
			</div>

			<el-dialog title="提示" :visible.sync="send_dialogVisible" width="30%" center>
                <span><h2> 確認送出? </h2></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="send_dialogVisible = false"> 確認 </el-button>
					<el-button type="danger" @click="send_dialogVisible = false"> 返回 </el-button>
                </span>
            </el-dialog>

		</div>
	</div>
	
</template>


<script>


import add_table from "../components/add_table.vue"


export default {
	name: 'Add',
	components: {
		add_table,
	},
	data() {
		return {
			patient_id: "",
			patient_id_exist: false,
			patient_id_style: '',
			dialogVisible: false,
			check_btn_style: '',
			edit_btn_style: 'display: none',
			dialog_text : '',
			dialog_btn_label: '',
			send_dialogVisible: false,
		}
	},
	methods: {
		check_patient_id: function() {
			this.patient_id_exist = true
			this.dialogVisible = true
			this.edit_btn_style = ''
			this.check_btn_style = 'display: none'
			this.dialog_text = 'Patient ID : ' + this.patient_id
			this.dialog_btn_label = '確認'
			// this.patient_id_style = 'background: "red"'
		},
		edit_patient_id: function() {
			this.patient_id_exist = false
			this.dialogVisible = true
			this.edit_btn_style = 'display: none'
			this.check_btn_style = '',
			this.dialog_text = "修改病患身分證字號"
			this.dialog_btn_label = '關閉'
		},
		send: function() {
			this.send_dialogVisible = true
		}
	}
}
</script>

<style>
#app {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

#main_container {
	margin-top: 40px;
	margin-left: 10%;
    margin-right: 10%;
	width: 80%
}






</style>
