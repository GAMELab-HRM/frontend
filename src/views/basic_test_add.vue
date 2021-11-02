<template>
	<div id="add">
		<div id="main_container">	
			<p style="font-size: 30px; color: white; margin-bottom: 0px">Current patient ID : {{ current_patient_id }}</p>

			<!-- section1 start -->
			<el-row :gutter="1">
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">Wet swallow 10
						<el-select v-model="ws_10_result" placeholder="WS10 Result" style="margin-top: 15px" @change="ws_10_selected_update">
							<el-option v-for="item in ws_10_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
			</el-row>
			<div id=ws_10_table_container>
				<add_table :patient_id="current_patient_id" @update_send="ws_10_update_send" @send_object="get_ws_10_table_data"/>
			</div>

			<div style="text-align:right; ">
				<el-button class='send_btn' type="primary" icon="el-icon-check" @click="ws_10_send(1)" :disabled="ws_10_send_disable"> 送出 </el-button>
				<el-button class='send_btn' type="primary" icon="el-icon-check" @click="ws_10_send(2)" :disabled="ws_10_send_disable"> 送出兩位醫師的診斷 </el-button>
			</div>
			
			<!-- section1 dialog start -->
			<el-dialog title="提示" :visible.sync="ws_10_confirm" width="30%" center>
				<span><h2> 確認送出? </h2></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="confirm_send({status: true, test_type: 'ws_10'})"> 確認 </el-button>
					<el-button type="danger" @click="confirm_send({status: false, test_type: 'ws_10'})"> 返回 </el-button>
				</span>
			</el-dialog>
			<!-- section1 dialog end -->
			<!-- section1 end -->

			<!-- section2 start -->
			<!-- <el-row :gutter="1">
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">MRS Result
						<el-select v-model="mrs_result" placeholder="MRS Result" style="margin-top: 15px" @change="mrs_selected_update">
							<el-option v-for="item in mrs_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
			</el-row> -->
			<!-- <add_table :patient_id="current_patient_id" @update_send="ws_10_update_send" @send_object="get_ws_10_object"/> -->
			<!-- <paint v-if="mrs_paint_render" :x_size="mrs_xsize" :y_size="mrs_ysize" :raw_data="mrs_rawdata"></paint> -->
			<!-- <draw :raw_data='fake_raw_data' :x_size='fake_x_size' :y_size='fake_y_size' />

			<div style="text-align:right; ">
				<el-button class="send_btn" type="primary" icon="el-icon-check" @click="send(1)" :disabled="send_disable"> 送出 </el-button>
				<el-button class="send_btn" type="primary" icon="el-icon-check" @click="send(2)" :disabled="send_disable"> 送出兩位醫師的診斷 </el-button>
			</div> -->
			<!-- section2 end -->

			<!-- section3 start -->
			<!-- <el-row :gutter="1">
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">Hiatal hernia Result
						<el-select v-model="hh_result" placeholder="Hiatal hernia Result" style="margin-top: 15px" @change="hh_selected_update">
							<el-option v-for="item in hh_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">RIP Result
						<el-select v-model="rip_result" placeholder="RIP Result" style="margin-top: 15px" @change="rip_selected_update">
							<el-option v-for="item in rip_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
			</el-row>
			<paint v-if="hiatal_paint_render" :x_size="hiatal_xsize" :y_size="hiatal_ysize" :raw_data="hiatal_rawdata"></paint>
			<div style="text-align:right; ">
				<el-button type="primary" icon="el-icon-check" @click="send(1)" style="margin-top: 30px; margin-bottom: 50px" :disabled="send_disable"> 送出 </el-button>
				<el-button type="primary" icon="el-icon-check" @click="send(2)" style="margin-top: 30px; margin-bottom: 50px" :disabled="send_disable"> 送出兩位醫師的診斷 </el-button>
			</div> -->
			<!-- section3 end -->



		</div>
	</div>
	
</template>
<script>
import add_table from "../components/basic_test_add_table.vue"
import { ws_10_options, mrs_options, hh_options, rip_options } from "@/utils/optiondata.js"
import { str_data } from '@/utils/fakedata.js'
// import draw from '@/components/draw'
import { uploadFileDemo } from "@/apis/file.js" // demo
import { CallDemoAPI, CallDemo2API } from "@/apis/demo.js" // demo


export default {
	name: 'basic_test_add',
	components: {
		add_table,
		// draw,
	},
	data() {
		return {
			// basic test selector result
			ws_10_result:'',
			mrs_result: '',
			hh_result: '',
			rip_result: '',

			fileList:[],
			dialogVisible: false,
			check_btn_style: '',
			edit_btn_style: 'display: none',
			dialog_text : '',
			dialog_btn_label: '',
			send_dialogVisible: false,
			send_btn_style: 'margin-top: 30px; ',

			// ws_10 send btn 是否可以點擊
			ws_10_send_disable: true,
			mrs_10_send_disable: true,

			ws_10_table_send_disable: true,


			// basic test table data
			ws_10_table_data: '', 
			mrs_table_data:'',
			hh_table_data:'',

			all_object: {},

			ws_10_options:0,
			mrs_options:0,
			hh_options:0,
			rip_options:0,

			// listen ws_10_result has value
			ws_10_selected: false,
			
			mrs_10_selected: false,

			raw_data_upload: false,
			x_size:0,
			y_size:0,
			raw_data:0,
			send_doctor_num: 0,
			current_patient_id: this.$route.params.current_patient_id,
			current_record_id: this.$route.params.current_record_id,

			// fake raw data
			fake_raw_data:0,
			
			// basic 二次確認 dialog
			ws_10_confirm: false,


			//test final data to send backend
			ws_10_object:0,
		}
	},
	created(){
		// load option data
		this.ws_10_options = ws_10_options
		this.mrs_options = mrs_options
		this.hh_options = hh_options
		this.rip_options = rip_options 
		
		console.log(this.current_patient_id)
		CallDemoAPI().then((res)=>{
			console.log("call demo API")
			console.log(res)
			let raw_data = JSON.parse(res['data']['raw'])
			this.mrs_ysize = raw_data.length 
			this.mrs_xsize = raw_data[0].length 
			this.mrs_rawdata = raw_data
			this.mrs_paint_render = true 

		})
		CallDemo2API().then((res)=>{
			console.log("call demo2 API")
			console.log(res)
			let raw_data = JSON.parse(res['data']['raw'])
			this.hiatal_ysize = raw_data.length
			this.hiatal_xsize = raw_data[0].length
			this.hiatal_rawdata = raw_data
			this.hiatal_paint_render = true
		})

		var fake_obj = JSON.parse(str_data)
        this.fake_raw_data = fake_obj['raw_data']
        this.fake_x_size = this.fake_raw_data[0].length
		this.fake_y_size = this.fake_raw_data.length
	},
	methods: {
		// click send data (trigger confirm dialog)
		ws_10_send: function(doctor_num) {
			this.send_doctor_num = doctor_num
			this.ws_10_confirm = true
		},

		// trigger when table data input
		ws_10_update_send: function(val) {
			console.log(val)
			this.ws_10_table_send_disable = val
			this.update_ws_10_send_btn()
		},

		// trigger when ws_10_result selected 
		ws_10_selected_update: function() {
			this.ws_10_selected = true
			this.update_ws_10_send_btn()
		},

		// update ws_10 send btn status
		update_ws_10_send_btn: function() {
			if(this.ws_10_table_send_disable == false && this.ws_10_selected == true) {
				this.ws_10_send_disable = false
			}
			else {
				this.ws_10_send_disable = true
			}
		},
		
		// get ws_10 table data
		get_ws_10_table_data: function(table) {
			this.ws_10_table_data = table
		},

		// 處理table的資料
		preprocess_ws_10_table_data: function(table_data) {
			// 這個只是要對add_table裡數據的順序而已
			var ws_10_object_col = ['vigors', 'patterns', 'swallow_types', 'irp4s', 'dcis', 'dls']
			var dic = {}
			
			for (var i = 0; i < table_data.length; i++) {
				var temp = Object.values(table_data[i])
				// 去除metrics
				temp.shift()
				dic[ws_10_object_col[i]] = temp
			}
			dic['pressure_max'] = 0
			dic['pressure_min'] = 0

			return dic
		},

		// 剩下record_id
		// doctor_id 目前是"0"，不是0
		send_backend: function(test_type) {
			this.send_dialogVisible = false
			console.log(this.ws_10_table_data)
			if(test_type == 'ws_10') {
				this.ws_10_object = this.preprocess_ws_10_table_data(this.ws_10_table_data)
				
				// 還沒實做送出兩位醫師的診斷(需要討論資料格式)
				this.ws_10_object['doctor_id'] = this.$store.state.auth_app.login_name
				this.ws_10_object['ws_result'] = this.ws_10_result
				this.ws_10_object['record_id'] = this.current_record_id
			}
			console.log(this.ws_10_object)
		

			// axios.post("http://127.0.0.1:8000/api/v1/swallows/data", this.all_object).then((res)=>{
			// 	console.log("成功")
			// 	console.log(res)
			// })

			
			// if(this.send_doctor_num==1) {
			// 	console.log("send 1 doctor's data")
			// }
			// else {
			// 	console.log("send 2 doctor's data")
			// }

		},

		// 二次確認彈框關閉時的call back
		confirm_send(response) {
			var confirm_result = response.status
			var type = response.test_type
			if(type == 'ws_10'){
				// 重置confirm dialog 狀態
				this.ws_10_confirm = false
				if(confirm_result) {
					this.send_backend('ws_10')
				}
			}
			// if(type == 'mrs'){
			// 	this.ws_10_confirm = false
			// }
		},



		submitUpload() {
			this.$refs.upload.submit();
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
			this.raw_data_upload = false
			this.update_send_btn()
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

			/* 這個api的內容寫在 /src/apis/file.js  */
			uploadFileDemo(this.forms).then((res)=>{
				console.log("response")
				console.log(res)
				let raw_data = JSON.parse(res['data']['raw'])

				this.y_size = raw_data.length 
				this.x_size = raw_data[0].length
				this.raw_data = raw_data
				console.log(this.x_size, this.y_size)
				

			})
			
		}
	}
}
</script>

<style scoped>
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

.send_btn {
	margin-top: 30px;
	margin-bottom: 50px
}



</style>
