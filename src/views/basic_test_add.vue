<template>
	<div id="add">
		<div id="main_container">	
			<p style="font-size: 30px; color: white; margin-bottom: 0px">Current patient ID : {{ current_patient_id }}</p>

			<!-- section1 start -->
			<el-row :gutter="1">
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">Wet swallow 10
						<el-select v-model="ws_10_result" placeholder="WS10 Result" style="margin-top: 15px" @change="basic_test_selected_update('ws_10')">
							<el-option v-for="item in ws_10_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
			</el-row>
			<div id=ws_10_table_container>
				<add_table :patient_id="current_patient_id" :table_data="table_data" @update_send="ws_10_update_send" @send_object="get_ws_10_table_data"/>
			</div>

			<div style="text-align:right; ">
				<el-button class='send_btn' type="primary" icon="el-icon-check" @click="basic_test_send('ws_10', 1)" :disabled="ws_10_send_disable"> 送出 </el-button>
				<el-button class='send_btn' type="primary" icon="el-icon-check" @click="basic_test_send('ws_10', 2)" :disabled="ws_10_send_disable"> 送出兩位醫師的診斷 </el-button>
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
			<el-row>
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">MRS Result
						<el-select v-model="mrs_result" placeholder="MRS Result" style="margin-top: 15px" @change="basic_test_selected_update('mrs')">
							<el-option v-for="item in mrs_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
				<el-col :span="4" :offset="2">
					<h1 style="text-align:left; color: white; padding-top: 20px">MRS Test
						<el-select v-model="mrs_subtest" placeholder="MRS Test" style="margin-top: 15px" @change="mrs_subtest_selected_update">
							<el-option v-for="item in mrs_subtest_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
			</el-row>

			<draw :raw_data='raw_data' :x_size='x_size' :y_size='y_size' :key='draw_rerender' />

			<div style="text-align:right; ">
				<el-button class="send_btn" type="primary" icon="el-icon-check" @click="basic_test_send('mrs', 1)" :disabled="mrs_send_disable"> 送出 </el-button>
				<el-button class="send_btn" type="primary" icon="el-icon-check" @click="basic_test_send('mrs', 2)" :disabled="mrs_send_disable"> 送出兩位醫師的診斷 </el-button>
			</div>

			<!-- section2 dialog start -->
			<el-dialog title="提示" :visible.sync="mrs_confirm" width="30%" center>
				<span><h2> 確認送出? </h2></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="confirm_send({status: true, test_type: 'mrs'})"> 確認 </el-button>
					<el-button type="danger" @click="confirm_send({status: false, test_type: 'mrs'})"> 返回 </el-button>
				</span>
			</el-dialog>
			<!-- section2 dialog end -->
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
import { ws_10_options, mrs_options, hh_options, rip_options ,table_data_format, mrs_subtest_options } from "@/utils/optiondata.js"
import { str_data } from '@/utils/fakedata.js'
import draw from '@/components/draw'
import {UpdateWetSwallow, GetWetSwallow} from "@/apis/ws.js"
// import { uploadFileDemo } from "@/apis/file.js" // demo
// import { CallDemoAPI, CallDemo2API } from "@/apis/demo.js" // demo


export default {
	name: 'basic_test_add',
	components: {
		add_table,
		draw,
	},
	data() {
		return {
			// basic test selector result
			ws_10_result:'',
			mrs_result: '',
			hh_result: '',
			rip_result: '',

			// basic test send btn 是否可以點擊
			ws_10_send_disable: true,
			mrs_send_disable: true,

			// ws_10 table data是否可傳送(是否全部填完)
			ws_10_table_send_disable: true,

			// basic test table data
			table_data:[],
			ws_10_table_data: '', 
			mrs_table_data:'',
			hh_table_data:'',

			// basic test selector result 的 options，於created中獲取資料
			ws_10_options:0,
			mrs_options:0,
			hh_options:0,
			rip_options:0,

			// listen basic test result has value
			ws_10_selected: false,
			mrs_selected: false,

			// 上傳時送出診斷的醫生數量
			send_doctor_num: 0,

			// 回傳data時需要的重要參數
			current_patient_id: this.$route.params.current_patient_id,
			current_record_id: this.$route.params.current_record_id,
			
			// basic test 二次確認 dialogVisible
			ws_10_confirm: false,
			mrs_confirm: false,

			//basic test final data to send backend
			ws_10_object:0,

			// 繪圖的變數
			raw_data:[],
			x_size:0,
			y_size:0,
			draw_rerender: 0,
			draw_obj_lst: [],

			//不同次 mrs test 相關的變數
			mrs_subtest:'',
			mrs_subtest_options: 0
		}
	},
	created(){
		// load option data
		this.ws_10_options = ws_10_options
		this.mrs_options = mrs_options
		this.hh_options = hh_options
		this.rip_options = rip_options 
		this.table_data = table_data_format
		this.mrs_subtest_options = mrs_subtest_options
		
		GetWetSwallow(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
            console.log("Call get swallow API successed!")
			let retv = res.data
			let eptmetric_order = ['vigors', 'patterns', 'swallow_types', 'irp4s', 'dcis', 'dls']
			
			for(let i=0; i<eptmetric_order.length; i++){
				console.log(res.data[eptmetric_order[i]])
				for(let j=0; j<10; j++){
					this.table_data[i]["sw"+(j+1).toString()] = retv[eptmetric_order[i]][j]
				}
			}
			this.ws_10_result = retv["ws_result"]
		}).catch((err)=>{
            console.log("Call get swallow API Failed!")
			console.log(err)
		})
		// 舊的繪圖，你看OK就刪掉再PR
		// CallDemoAPI().then((res)=>{
		// 	console.log("call demo API")
		// 	console.log(res)
		// 	let raw_data = JSON.parse(res['data']['raw'])
		// 	this.mrs_ysize = raw_data.length 
		// 	this.mrs_xsize = raw_data[0].length 
		// 	this.mrs_rawdata = raw_data
		// 	this.mrs_paint_render = true 

		// })
		// CallDemo2API().then((res)=>{
		// 	console.log("call demo2 API")
		// 	console.log(res)
		// 	let raw_data = JSON.parse(res['data']['raw'])
		// 	this.hiatal_ysize = raw_data.length
		// 	this.hiatal_xsize = raw_data[0].length
		// 	this.hiatal_rawdata = raw_data
		// 	this.hiatal_paint_render = true
		// })

		// 繪圖initial data
		this.draw_obj_lst = str_data
		// 預設繪製 mrs subtest1
		this.set_draw_data(this.draw_obj_lst, 1)
	},
	methods: {
		// click send data (trigger confirm dialog)
		basic_test_send: function(test_type, doctor_num) {
			this.send_doctor_num = doctor_num
			if(test_type == 'ws_10') {
				this.ws_10_confirm = true
			}
			else if(test_type == 'mrs') {
				this.mrs_confirm = true
			}
			
		},

		// trigger when table data input
		ws_10_update_send: function(val) {
			console.log(val)
			this.ws_10_table_send_disable = val
			this.update_ws_10_send_btn()
		},

		// trigger when any result selector selected 
		basic_test_selected_update: function(test_type) {
			if(test_type == 'ws_10') {
				this.ws_10_selected = true
				this.update_ws_10_send_btn()
			}
			else if(test_type == 'mrs') {
				this.mrs_selected = true
				this.update_mrs_send_btn()
			}
			
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

		// update mrs send btn status
		update_mrs_send_btn: function() {
			this.mrs_send_disable = false
			// this.mrs_send_disable = true
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

		// doctor_id 目前是"0"，不是0
		send_backend: function(test_type) {
			// call api here
			// ws_10_object is ready send to backend
			console.log(this.ws_10_table_data)
			if(test_type == 'ws_10') {
				this.ws_10_object = this.preprocess_ws_10_table_data(this.ws_10_table_data)
				
				// 還沒實做送出兩位醫師的診斷(需要討論資料格式)
				this.ws_10_object['doctor_id'] = parseInt(this.$store.state.auth_app.login_name)
				this.ws_10_object['ws_result'] = this.ws_10_result
				this.ws_10_object['record_id'] = this.current_record_id
			}
			console.log(this.ws_10_object)

			
			UpdateWetSwallow(this.ws_10_object).then((res)=>{
                console.log("Call update WS API successed!")
				console.log(res)
				this.$message({message: '更新成功!',type: 'success'});
			}).catch((err)=>{
                console.log("Call update WS API successed!")
				console.log(err)
				this.$message.error('更新失敗!');
			})

			
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
			if(type == 'mrs'){
				this.mrs_confirm = false
				if(confirm_result) {
					console.log('mrs can send to backend')
				}
			}
		},

		// 上傳檔案的都刪掉了，這邊應該也是要刪，你看OK就刪掉再PR
		// customUpload(item){
		// 	const file = item.file 
		// 	//const size = file.size / 1024 / 1024
		// 	this.forms = new FormData()
		// 	this.forms.append("files", file)

		// 	/* 這個api的內容寫在 /src/apis/file.js  */
		// 	uploadFileDemo(this.forms).then((res)=>{
		// 		console.log("response")
		// 		console.log(res)
		// 		let raw_data = JSON.parse(res['data']['raw'])
		// 		this.y_size = raw_data.length 
		// 		this.x_size = raw_data[0].length
		// 		this.raw_data = raw_data
		// 		console.log(this.x_size, this.y_size)
		// 	})
		// }

		// set new raw data to draw
		set_draw_data(obj_lst, idx) {
			this.raw_data = JSON.parse(obj_lst[idx]['raw_data'])
			// 不知道為啥，但他的y軸會突出去，所以先-1 
			this.x_size = this.raw_data[0].length - 1
			this.y_size = this.raw_data.length - 1
		},

		mrs_subtest_selected_update() {
			this.set_draw_data(this.draw_obj_lst, this.mrs_subtest-1)
			this.draw_rerender += 1
		},
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
