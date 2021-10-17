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
			<el-row :gutter="1">
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">Ground Truth
						<el-select v-model="GT_cc_result" placeholder="CC Result" style="margin-top: 15px" @change="GT_selected_update">
							<el-option v-for="item in cc_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
				<el-col :span="4" offset="16"  style="margin-top: 70px">
					<el-upload class="upload-demo" ref="upload" accept=".csv" :http-request="customUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :limit="1" :on-success="upload_success">
						<el-button slot="trigger"  type="primary">選取文件</el-button>
						<el-button style="margin-left: 10px; margin-right: 0px"  type="success" @click="submitUpload">上傳檔案</el-button>
					</el-upload>
				</el-col>
			</el-row>
			<div id=GT_table_container>
				<add_table :patient_id="patient_id" @update_send="GT_update_send" @send_object="get_GT_object"/>
			</div>
			<el-row :gutter="1">
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">MMS Result
						<el-select v-model="MMS_cc_result" placeholder="CC Result" style="margin-top: 15px" @change="MMS_selected_update">
							<el-option v-for="item in cc_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
			</el-row>
			<div id=MMS_table_container>
				<add_table :patient_id="patient_id" @update_send="MMS_update_send" @send_object="get_MMS_object"/>
			</div>

			<div style="text-align:right; ">
				<el-button type="primary" icon="el-icon-check" @click="send" style="margin-top: 30px; margin-bottom: 50px" :disabled="send_disable"> 送出 </el-button>
			</div>

			<el-dialog title="提示" :visible.sync="send_dialogVisible" width="30%" center>
                <span><h2> 確認送出? </h2></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="send_backend"> 確認 </el-button>
					<el-button type="danger" @click="send_dialogVisible = false"> 返回 </el-button>
                </span>
            </el-dialog>

		</div>
	</div>
	
</template>


<script>

import add_table from "../components/add_table.vue"
import {uploadFile} from "@/apis/file.js"
export default {
	name: 'Add',
	components: {
		add_table,
	},
	data() {
		return {
			patient_id: '',
			patient_id_exist: false,
			patient_id_style: '',
			dialogVisible: false,
			check_btn_style: '',
			edit_btn_style: 'display: none',
			dialog_text : '',
			dialog_btn_label: '',
			send_dialogVisible: false,
			send_btn_style: 'margin-top: 30px; ',
			GT_send_disable: true,
			MMS_send_disable: true,
			send_disable: true,
			GT_object: '', 
			MMS_object: '',
			all_object: {},
			GT_cc_result: '',
			MMS_cc_result: '', 
			cc_options:[{
                value: 'Absent',
                label: 'Absent'
            }, {
                value: 'IEM',
                label: 'IEM'
            }, {
                value: 'Fragmented',
                label: 'Fragmented'
            }, {
                value: 'Normal',
                label: 'Normal'
            }],
			GT_selected: false,
			MMS_selected: false,
			raw_data_upload: false,
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
			this.update_send_btn()
			// this.patient_id_style = 'background: "red"'
		},
		edit_patient_id: function() {
			this.patient_id_exist = false
			this.dialogVisible = true
			this.edit_btn_style = 'display: none'
			this.check_btn_style = '',
			this.dialog_text = "修改病患身分證字號"
			this.dialog_btn_label = '關閉'
			this.patient_id = ''
			this.update_send_btn()
		},
		send: function() {
			this.send_dialogVisible = true
		},
		GT_update_send: function(val) {
			console.log(val)
			this.GT_send_disable = val
			this.update_send_btn()
		},
		MMS_update_send: function(val) {
			console.log(val)
			this.MMS_send_disable = val
			this.update_send_btn()
		},
		GT_selected_update: function() {
			this.GT_selected = true
			this.update_send_btn()
		},
		MMS_selected_update: function() {
			this.MMS_selected = true
			this.update_send_btn()
		},
		update_send_btn: function() {
			if(this.GT_send_disable == false && this.MMS_send_disable == false && this.GT_selected == true && this.MMS_selected == true && this.patient_id != '' && this.raw_data_upload == true) {
				this.send_disable = false                                                                                                                           
			}
			else {
				this.send_disable = true
			}
		},
		get_GT_object: function(table) {
			this.GT_object = table
		},
		get_MMS_object: function(table) {
			this.MMS_object = table
		},
		preprocess_table_data: function(object) {
			// 處理來自GT table & MMS table 的資料
			var all_object_col = ['ID', 'V', 'P', 'swallow_type', 'IRP40', 'DCI', 'DL']
			var dic = {}
			dic[all_object_col[0]] = this.patient_id
			for (var i = 0; i < object.length; i++) {
				var temp = Object.values(object[i])
				temp.shift()
				dic[all_object_col[i+1]] = temp
			}
			return dic
		},
		preprocessing_data: function(object) {
			// 處理CC result 與 doctor
			object['GT']['cc_result'] = this.GT_cc_result
			object['MMS']['cc_result'] = this.MMS_cc_result

			return object
		},
		send_backend: function() {
			this.send_dialogVisible = false
			this.all_object['GT'] = this.preprocess_table_data(this.GT_object)
			this.all_object['MMS'] = this.preprocess_table_data(this.MMS_object)
			this.all_object = this.preprocessing_data(this.all_object)
			//加入doctor id 到all_object
			this.all_object['GT']["doctor"] = this.$store.state.auth_app.login_name //拿到doctor id的方法
			this.all_object["MMS"]["doctor"] = "MMS"
			// console.log(this.all_object)
			// axios.post("http://127.0.0.1:8000/api/v1/swallows/data", this.all_object).then((res)=>{
			// 	console.log("成功")
			// 	console.log(res)
			// })
			console.log(this.all_object)
		},
		submitUpload() {
			this.$refs.upload.submit();
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
			this.raw_data_upload = false
			this.update_send_btn()
		},
		handlePreview(file) {
			console.log(file);
		},
		upload_success(response, file, fileList) {
			this.raw_data_upload = true
			this.update_send_btn()
			console.log(response, file, fileList)
		},
		customUpload(item){
			const file = item.file 
			//const size = file.size / 1024 / 1024
			this.forms = new FormData()
			this.forms.append("files", file)

			uploadFile(this.forms).then((res)=>{
				console.log("response")
				console.log(res)
				let raw_data = JSON.parse(res['data']['raw'])
				for(let i =0; i<10; i++){
					console.log(raw_data[i])
					console.log(raw_data[i].length)
				}
				// let filename = res['data']['filename']
				// let raw_data = res['data']['raw']
				// let swallow_index = res['data']['index']


			})
			
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
	margin-left: 11%;
    margin-right: 5%;
	width: 84%
}

/* .el-upload-list__item-name {
	width: 30%;
} */

.upload-demo {
	text-align:right;
}

.el-upload-list__item {
	color: black;
	font-weight: bold;
	background-color:white;
}





</style>
