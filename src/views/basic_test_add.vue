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
				<el-col :span="4">
					<h1 style="text-align:left; color: white; padding-top: 20px">MRS Test<br>
						<el-select v-model="mrs_subtest" placeholder="MRS Test" style="margin-top: 15px" @change="mrs_subtest_selected_update">
							<el-option v-for="item in mrs_subtest_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</h1>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="draw_rerender+=1,clear_all('MRS', true)" icon='el-icon-refresh' style="margin-top: 83px">Refresh Contour plots</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="14">
					<draw :raw_data='raw_data' :time_scale='time_scale' :catheter_scale='catheter_scale' :polys="MRS_polys['MRS'+mrs_subtest.toString()]" :key='draw_rerender' ref="MRS_draw" @update_draw_btn_status='mrs_update_draw_btn' @get_DCI='get_DCI' @clear_last='clear_last' @get_polys='get_polys' />
				</el-col>
				<el-col :span="7" :offset='3'>
					<div style="margin-top: 50px">
						<h2>繪圖工具</h2>

						<el-button type="primary" class="draw_btn" @click="MRS_draw_btn(draw_type='horizontal', metrics='MRS_TZ')"  :disabled="MRS_disable['MRS_TZ']" >Time Zone</el-button >
						<el-button type="primary" class="draw_btn" @click="MRS_draw_btn(draw_type='horizontal', metrics='MRS_LES_upper')" :disabled="MRS_disable['MRS_LES_upper']">LES upper</el-button>
						<el-button type="primary" class="draw_btn" @click="MRS_draw_btn(draw_type='horizontal', metrics='MRS_LES_lower')" :disabled="MRS_disable['MRS_LES_lower']">LES lower</el-button>
						<br>

						<el-table :data='MRS_metrics_table_data' style="width: 80%">
							<el-table-column prop="metrics" label='Metrics'/>
							<el-table-column label='Operation'>
								<template slot-scope="scope">
									<el-button type="primary" @click="draw_handler('MRS', scope.$index)" :disabled='Object.values(MRS_disable)[scope.$index]'>標記</el-button>
									<el-button type="danger" @click="delete_handler(scope.$index)" :disabled="delete_disable('MRS', scope.$index)">刪除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-row style="margin-top: 30px">
						<el-col :span="5" :offset="6">
							<el-button type="danger" class="draw_btn" @click="$refs.MRS_draw.clear_last()" :disabled='MRS_DCI_disable==false&&MRS_DCI_after_MRS_disable==false&&MRS_IRP_disable== false'>Clear last</el-button>
						</el-col>
						<el-col :span="5" :offset="2">
							<el-button type="danger" class="draw_btn" @click="clear_all('MRS', true)" :disabled='MRS_DCI_disable==false&&MRS_DCI_after_MRS_disable==false&&MRS_IRP_disable== false'>Clear all</el-button>
						</el-col>
					</el-row>
					<el-row style="margin-top: 30px">
						<el-col :span="16" :offset="4">
							<el-table :data='MRS_draw_data' style="width: 100%">
								<el-table-column prop="flag" label="參數"/>
								<el-table-column prop="value"  label="值"/>
							</el-table>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
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
			x_size: 0,
			draw_rerender: 0,
			draw_obj_lst: [],
			catheter_scale: [40, 35, 34, 33, 32, 31, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0],
			time_scale: [],
			MRS_disable: {
				'MRS_TZ': false,
				'MRS_LES_upper': false,
				'MRS_LES_lower': false,
				'MRS_DCI_left': true,
				'MRS_DCI_right': true,
				'MRS_IRP_left': true,
				'MRS_IRP_right': true,
			},
			MRS_metrics_table_data:[{
				'metrics': 'Time Zone'
			},{
				'metrics': 'LES upper line'
			}, {
				'metrics': 'LES lower line'
			}, {
				'metrics': 'DCI left line'
			}, {
				'metrics': 'DCI right line'
			}, {
				'metrics': 'IRP left line'
			}, {
				'metrics': 'IRP right line'
			}],
			MRS_DCI_disable: false,
			MRS_DCI_after_MRS_disable: false,
			MRS_IRP_disable: false,
			MRS_metrics: {},
			MRS_polys:{},
			MRS_draw_data: [
			{
				flag: 'MRS DCI',
				value: 0
			}, 
			{
				flag: 'MRS DCI after MRS',
				value: 0
			},
			{
				flag: 'MRS IRP4',
				value: 0
			}],

			//不同次 mrs test 相關的變數
			mrs_subtest: 1,
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

		// 繪圖initial data
		this.draw_obj_lst = str_data['rawdata']
		// 預設繪製 mrs subtest1
		this.set_contour_data(this.draw_obj_lst, 0)

		// 因為要先確認有幾個mrs_subtest所以放這裡
		var mrs_subtest_num = JSON.parse(this.draw_obj_lst).length;
		mrs_subtest_options.splice(mrs_subtest_num, mrs_subtest_options.length)
		this.mrs_subtest_options = mrs_subtest_options

		// initial all subtest all metrics data
		for(var i=0; i<mrs_subtest_num; i++) {
			var temp = {
				'MRS_DCI': 0,
				'MRS_DCI_after_MRS': 0,
				'MRS_IRP': 0,
			}
			this.MRS_metrics['MRS'+(i+1).toString()] = temp
			this.MRS_polys['MRS'+(i+1).toString()] = []
		}

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
		set_contour_data(obj_lst, idx) {
			this.raw_data = JSON.parse(obj_lst)[idx]
			// 不知道為啥，但他的y軸會突出去，所以先-1 
			this.x_size = this.raw_data[0].length - 1
			this.time_scale = [...Array(this.x_size).keys()].map(function(val){
				return val / 20
			})
		},

		get_polys(poly_lst) {
			this.MRS_polys['MRS'+this.mrs_subtest.toString()] = poly_lst
		},

		mrs_subtest_selected_update() {
			// this.$refs.MRS_draw.get_current_polys()

			this.set_contour_data(this.draw_obj_lst, this.mrs_subtest-1)
			this.draw_rerender += 1

			// rerender draw table data 
			this.MRS_draw_data[0]['value'] = this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI']
			this.MRS_draw_data[1]['value'] = this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI_after_MRS']
			this.MRS_draw_data[2]['value'] = this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_IRP']
			this.clear_all('MRS', false)

			for(var i=0; i<this.MRS_polys['MRS'+this.mrs_subtest.toString()].length; i++) {
				var flag = this.MRS_polys['MRS'+this.mrs_subtest.toString()][i]['flag']
				if(flag == 'MRS_DCI') {
					this.MRS_DCI_disable = true
				}
				else if(flag == 'MRS_DCI_after_MRS') {
					this.MRS_DCI_after_MRS_disable = true
				}
				else if(flag == 'MRS_IRP') {
					this.MRS_IRP_disable = true
				}
			}
		},

		MRS_draw_btn(draw_type, metrics) {
			this.$refs.MRS_draw.set_draw_data(draw_type, metrics)
		},
		mrs_update_draw_btn(obj) {
			this.MRS_disable[obj['flag']] = obj['status']
			if(Object.keys(this.MRS_disable).slice(0, 3).includes(obj['flag'])) {
				if(!Object.values(this.MRS_disable).slice(0, 3).includes(false) && !obj['rehorizontal']) {
					this.MRS_disable['MRS_DCI_left'] = false
					this.MRS_disable['MRS_DCI_right'] = false
					this.MRS_disable['MRS_IRP_left'] = false
					this.MRS_disable['MRS_IRP_right'] = false
				}
			}
		},
		draw_handler(test, idx) {
			var horizontal_lst = [0, 1, 2]
			var vertical_lst = [3, 4, 5, 6]
			// var box = []
			var draw_type = ''

			if(horizontal_lst.includes(idx)) {
				draw_type = 'horizontal'
			}
			else if(vertical_lst.includes(idx)) {
				draw_type = 'vertical'
			}
			else {
				draw_type = 'box'
			}
			
			if(test=='MRS') {
				var metrics = Object.keys(this.MRS_disable)[idx]
				this.$refs.MRS_draw.set_draw_data(draw_type, metrics)
			}
		},
		delete_handler(idx) {
			var idx_lst = [idx]

			//  delete TZ
			if(idx == 0) {
				idx_lst.push(3, 4)
				this.MRS_disable['MRS_DCI_left'] = true
				this.MRS_disable['MRS_DCI_right'] = true
			}
			// delete LES upper
			else if(idx == 1) {
				idx_lst.push(3, 4, 5, 6)
				this.MRS_disable['MRS_DCI_left'] = true
				this.MRS_disable['MRS_DCI_right'] = true
				this.MRS_disable['MRS_IRP_left'] = true
				this.MRS_disable['MRS_IRP_right'] = true
			}
			// delete LES lower
			else if (idx == 2) {
				idx_lst.push(5, 6)
				this.MRS_disable['MRS_IRP_left'] = true
				this.MRS_disable['MRS_IRP_right'] = true
			}

			idx_lst = idx_lst.map(function(val) {
				return val + 3
			})

			this.$refs.MRS_draw.clear_target(idx_lst)
			this.$refs.MRS_draw.delete_line_title(Object.keys(this.MRS_disable)[idx])

			// force DCI table to 0
			if([0, 1, 3, 4].includes(idx)) {
				this.MRS_draw_data[0]['value']=0
			}
		},
		
		delete_disable(test, idx) {
			if(test == "MRS") {
				var basic_horizontal = !Object.values(this.MRS_disable).slice(0, 3).includes(false)
				if(idx<3) {
					return !Object.values(this.MRS_disable)[idx]
				}
				else if(basic_horizontal) {
					return !Object.values(this.MRS_disable)[idx]
				}
				else {
					return true
				}
			}
				
			
		},
		get_DCI(obj) {
			if(obj['flag'].includes('DCI') || obj['flag']=='MRS_TZ' || obj['flag']=='MRS_LES_upper') {
				this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI'] = obj['DCI']
				this.MRS_draw_data[0]['value'] = obj['DCI']
			}
			// if(obj['flag']=='MRS_DCI_after_MRS') {
			// 	this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI_after_MRS'] = obj['DCI']
			// 	this.MRS_draw_data[1]['value'] = obj['DCI']
			// }
		},
		clear_all(test, if_clean_line) {
			if(test == 'MRS') {
				if(if_clean_line) {
					this.$refs.MRS_draw.clear_all()

					// MRS DCI
					this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI'] = 0
					this.MRS_draw_data[0]['value'] = 0
					
					// MRS DCI_after_MRS
					this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI_after_MRS'] = 0
					this.MRS_draw_data[1]['value'] = 0
					
					// MRS IRP
					this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_IRP'] = 0
					this.MRS_draw_data[2]['value'] = 0
				} else {
					this.MRS_draw_data[0]['value'] = this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI']
					this.MRS_draw_data[1]['value'] = this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI_after_MRS']
					this.MRS_draw_data[2]['value'] = this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_IRP']
				}
				// draw btn disable
				this.MRS_DCI_disable = false
				this.MRS_DCI_after_MRS_disable = false
				this.MRS_IRP_disable = false
			}
		},
		clear_last(flag) {
			if(flag == 'MRS_DCI') {
				this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI'] = 0
				this.MRS_draw_data[0]['value'] = 0
				this.MRS_DCI_disable = false
			}
			else if(flag=='MRS_DCI_after_MRS') {

				this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_DCI_after_MRS'] = 0
				this.MRS_draw_data[1]['value'] = 0
				this.MRS_DCI_after_MRS_disable = false

			}
			else if(flag == 'MRS_IRP') {

				this.MRS_metrics['MRS'+this.mrs_subtest.toString()]['MRS_IRP'] = 0
				this.MRS_draw_data[2]['value'] = 0
				this.MRS_IRP_disable = false

			}
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
