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
				<add_table :patient_id="current_patient_id" :table_data="table_data" @update_send="ws_10_update_send" @send_object="get_ws_10_table_data" @set_mean_break='seted=>set_mean_break("ws_10", seted)' @set_max_break='seted=>set_max_break("ws_10", seted)' />
			</div>
			<div style="text-align:left; color : white; font-size: 20px;">
				<div>
					mean break : <span v-text='ws_10_mean_break'/>
				</div>
				<div>
					large break : <span v-text='ws_10_max_break'/>
				</div>
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
			<div v-if="mrs_result_show & mrs_drawinfo_show  & mrs_metric_show & mrs_rawdata_show">
				<el-row>
					<el-col :span="4">
						<h1 style="text-align:left; color: white; padding-top: 20px">MRS Result
							<el-select v-model="mrs_result" placeholder="MRS Result" style="margin-top: 15px" @change="basic_test_selected_update('mrs')">
								<el-option v-for="item in mrs_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</h1>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4">
						<h1 style="text-align:left; color: white; padding-top: 20px">MRS Test<br>
							<el-select v-model="mrs_subtest" placeholder="MRS Test" style="margin-top: 15px" @change="mrs_subtest_selected_update">
								<el-option v-for="item in mrs_subtest_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</h1>
					</el-col>
					<el-col :span="2">
						<el-button type="primary" @click="MRS_draw_rerender+=1,clear_all('MRS'),MRS_draw_param['contour_size']=30" icon='el-icon-refresh' style="margin-top: 83px">Refresh Contour plots</el-button>
					</el-col>
				</el-row>
				<el-row type="flex" class="row-bg" justify="space-between">
					<el-col :span="14">
						<draw :raw_data='MRS_draw_param["raw_data"]' :time_scale='MRS_draw_param["time_scale"]' :catheter_scale='MRS_draw_param["catheter_scale"]' :polys="MRS_draw_param['polys']['MRS'+mrs_subtest.toString()]" :key='MRS_draw_rerender' ref="MRS_draw"  @update_draw_btn_status='update_draw_btn' @get_polys='get_poly=>get_polys("MRS", get_poly)' @get_DCI='get_DCI' @get_IRP='get_IRP'/>
					</el-col>
					<el-col :span="7" >
						<div style="margin-top: 50px">
							<h2 style="padding-right: 100px">繪圖工具</h2>
							<br>
							<el-slider v-model="MRS_draw_param['contour_size']" :step="1" :min='5' @change="changed=>contour_size_change('MRS', changed)"   style="padding-right: 100px"/>
							<br>
							<el-table :data='MRS_metrics_table_data' style="width: 80%" height="400">
								<el-table-column prop="metrics" label='Metrics'/>
								<el-table-column label='Operation'>
									<template slot-scope="scope">
										<el-button type="primary" @click="draw_handler('MRS', scope.$index)" :disabled="draw_disable('MRS', scope.$index)" :key='draw_btn_rerender'>標記</el-button>
										<el-button type="danger" @click="delete_handler('MRS', scope.$index)" :disabled="delete_disable('MRS', scope.$index)">刪除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<el-table :data='MRS_draw_data' style="width: 80%; margin-top:30px">
							<el-table-column prop="flag" label="參數">
								<template slot-scope="scope">
									<div v-html="scope.row.flag"></div>
								</template>
							</el-table-column>
							<el-table-column prop="value"  label="值"/>
						</el-table>
						<el-button class="send_btn" type="primary" icon="el-icon-check" @click="basic_test_send('mrs', 1)" :disabled="mrs_send_disable"> 送出 </el-button>
						<el-button class="send_btn" type="primary" icon="el-icon-check" @click="basic_test_send('mrs', 2)" :disabled="mrs_send_disable"> 送出兩位醫師的診斷 </el-button>
					</el-col>
				</el-row>

				<!-- section2 dialog start -->
				<el-dialog title="提示" :visible.sync="mrs_confirm" width="30%" center>
					<span><h2> 確認送出? </h2></span>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="confirm_send({status: true, test_type: 'mrs'})"> 確認 </el-button>
						<el-button type="danger" @click="confirm_send({status: false, test_type: 'mrs'})"> 返回 </el-button>
					</span>
				</el-dialog>
			</div>
			<!-- section2 dialog end -->
			<!-- section2 end -->

			<div v-if="hh_drawinfo_show & hh_result_show & rip_result_show & hh_metric_show & hh_rawdata_show">
				<!-- section3 start -->
				<el-row :gutter="1">
					<el-col :span="4">
						<h1 style="text-align:left; color: white; padding-top: 20px">Hiatal hernia Result
							<el-select v-model="hh_result" placeholder="Hiatal hernia Result" style="margin-top: 15px" @change="basic_test_selected_update('hh')">
								<el-option v-for="item in hh_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</h1>
					</el-col>
					<el-col :span="4">
						<h1 style="text-align:left; color: white; padding-top: 20px">RIP Result
							<el-select v-model="rip_result" placeholder="RIP Result" style="margin-top: 15px" @change="basic_test_selected_update('rip')">
								<el-option v-for="item in rip_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</h1>
					</el-col>
					<el-col :span="2">
						<el-button type="primary" @click="HH_draw_rerender+=1,clear_all('HH'),HH_draw_param['contour_size']=30" icon='el-icon-refresh' style="margin-top: 83px">Refresh Contour plots</el-button>
					</el-col>
				</el-row>

				<el-row type="flex" class="row-bg" justify="space-between">
					<el-col :span="14">
						<draw :raw_data='HH_draw_param["raw_data"]' :time_scale='HH_draw_param["time_scale"]' :catheter_scale='HH_draw_param["catheter_scale"]' :polys='HH_draw_param["polys"]["landmark"]' :key='HH_draw_rerender' ref="HH_draw" @update_draw_btn_status='update_draw_btn' @get_LES_CD='get_LES_CD' @get_polys='get_poly=>get_polys("HH", get_poly)'/>
					</el-col>
					<el-col :span="7" >
						<div style="margin-top: 50px">
							<h2 style="padding-right: 100px">繪圖工具</h2>
							<br>
							<el-slider v-model="HH_draw_param['contour_size']" :step="1" :min='5' @change="changed=>contour_size_change('HH', changed)" style="padding-right: 100px"/>
							<br>
							<el-table :data='HH_metrics_table_data' style="width: 80%" height="400">
								<el-table-column prop="metrics" label='Metrics'/>
								<el-table-column label='Operation'>
									<template slot-scope="scope">
										<el-button type="primary" @click="draw_handler('HH', scope.$index)" :disabled="draw_disable('HH', scope.$index)" :key='draw_btn_rerender'>標記</el-button>
										<el-button type="danger" @click="delete_handler('HH', scope.$index)" :disabled="delete_disable('HH', scope.$index)">刪除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<el-table :data='HH_draw_data' style="width: 80%; margin-top:30px">
							<el-table-column prop="flag" label="參數"/>
							<el-table-column prop="value"  label="值"/>
						</el-table>
						<el-button type="primary" icon="el-icon-check" @click="basic_test_send('hh', 1)" :disabled="hh_send_disable" style="margin-top: 30px; margin-bottom: 50px"> 送出 </el-button>
						<el-button type="primary" icon="el-icon-check" @click="basic_test_send('hh', 2)" :disabled="hh_send_disable" style="margin-top: 30px; margin-bottom: 50px"> 送出兩位醫師的診斷 </el-button>
					</el-col>
				</el-row>

				<!-- section3 dialog start -->
				<el-dialog title="提示" :visible.sync="hh_confirm" width="30%" center>
					<span><h2> 確認送出? </h2></span>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="confirm_send({status: true, test_type: 'hh'})"> 確認 </el-button>
						<el-button type="danger" @click="confirm_send({status: false, test_type: 'hh'})"> 返回 </el-button>
					</span>
				</el-dialog>
				<!-- section3 dialog end -->
				<!-- section3 end -->
			</div>

			<!-- section4 start -->
			<el-row :gutter="1">
				<el-col :span="10">
					<h1 style="text-align:left; color: white; padding-top: 20px">二度收縮
						<div style="text-align:left; color : white; font-size: 35px; padding-top: 30px">
							<div>
								Secondary peristalsis response : <span v-text='SPR'/> %
							</div>
							<div>
								Effective response : <span v-text='ER'/> %
							</div>
						</div>
					</h1>
				</el-col>
			</el-row>
			<div id=ab_table_container>
				<ab_add_table :patient_id="current_patient_id" :table_data="ab_table_data" @update_send="ws_10_update_send" @send_object="get_ws_10_table_data" @set_mean_break='seted=>set_mean_break("ab", seted)' @set_max_break='seted=>set_max_break("ab", seted)' @set_SPR='set_SPR' @set_ER='set_ER'/>
			</div>
			<div style="text-align:left; color : white; font-size: 20px;">
				<div>
					mean break : <span v-text='ab_mean_break'/>
				</div>
				<div>
					large break : <span v-text='ab_max_break'/>
				</div>
			</div>
			<div style="text-align:right; ">
				<el-button class='send_btn' type="primary" icon="el-icon-check" @click="basic_test_send('ws_10', 1)" :disabled="ws_10_send_disable"> 送出 </el-button>
				<el-button class='send_btn' type="primary" icon="el-icon-check" @click="basic_test_send('ws_10', 2)" :disabled="ws_10_send_disable"> 送出兩位醫師的診斷 </el-button>
			</div>
			
			<!-- section4 dialog start -->
			<el-dialog title="提示" :visible.sync="ws_10_confirm" width="30%" center>
				<span><h2> 確認送出? </h2></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="confirm_send({status: true, test_type: 'ws_10'})"> 確認 </el-button>
					<el-button type="danger" @click="confirm_send({status: false, test_type: 'ws_10'})"> 返回 </el-button>
				</span>
			</el-dialog>
			<!-- section4 dialog end -->
			<!-- section4 end -->
		</div>
	</div>
	
</template>
<script>
import add_table from "../components/basic_test_add_table.vue"
import { ws_10_options, mrs_options, hh_options, rip_options ,table_data_format, mrs_subtest_options, ab_table_data_format } from "@/utils/optiondata.js"
import draw from '@/components/draw'
import {UpdateWetSwallow, GetWetSwallow} from "@/apis/ws.js"
import {UpdateMRSDrawInfo, UpdateMRSMetrics, UpdateMRSResult, GetMRSDrawInfo, GetMRSMetrics, GetMRSRawData, GetMRSResult} from "@/apis/mrs.js"
import {UpdateHHDrawInfo, UpdateHHMetrics, UpdateHHResult, GetHHDrawInfo, GetHHMetrics, GetHHRawData, GetHHResult} from "@/apis/hh.js"
import ab_add_table from "@/components/ab_add_table.vue"

// import { uploadFileDemo } from "@/apis/file.js" // demo
// import { CallDemoAPI, CallDemo2API } from "@/apis/demo.js" // demo


export default {
	name: 'basic_test_add',
	components: {
		add_table,
		draw,
		ab_add_table
	},
	data() {
		return {
			mrs_show:false,
			mrs_result_show: false,
			mrs_drawinfo_show: false,
			mrs_metric_show: false,
			mrs_rawdata_show: false,
			hh_result_show: false,
			rip_result_show: false,
			hh_drawinfo_show: false,
			hh_metric_show: false,
			hh_rawdata_show: false,
			// basic test selector result
			ws_10_result:'',
			mrs_result: 'CR',
			hh_result: '',
			rip_result: '',

			// basic test send btn 是否可以點擊
			ws_10_send_disable: true,
			mrs_send_disable: true,
			hh_send_disable: true,

			// ws_10 table data是否可傳送(是否全部填完)
			ws_10_table_send_disable: true,

			// basic test table data
			table_data:[],
			ws_10_table_data: '',

			ab_table_data: [],

			// break 相關變數
			ws_10_mean_break: '-',
			ws_10_max_break: '-',

			// basic test selector result 的 options，於created中獲取資料
			ws_10_options:0,
			mrs_options:0,
			hh_options:0,
			rip_options:0,

			// 上傳時送出診斷的醫生數量
			send_doctor_num: 0,

			// 回傳data時需要的重要參數
			current_patient_id: this.$route.params.current_patient_id,
			current_record_id: this.$route.params.current_record_id,
			
			// basic test 二次確認 dialogVisible
			ws_10_confirm: false,
			mrs_confirm: false,
			hh_confirm: false,

			//basic test final data to send backend
			ws_10_object:0,

			// 繪圖的變數
			MRS_draw_param: {
				raw_data: [],
				x_size: 0,
				draw_obj_lst: [],
				catheter_scale: [40, 35, 34, 33, 32, 31, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0],
				time_scale: [],
				disable_dict: {},
				metrics: {},
				polys: {},
				ini: {},
				contour_size: 30,
			},

			HH_draw_param: {
				raw_data: [],
				x_size: 0,
				draw_obj_lst: [],
				catheter_scale: [40, 35, 34, 33, 32, 31, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0],
				time_scale: [],
				disable_dict: {},
				metrics: {},
				polys: {},
				contour_size: 30
			},

			MRS_draw_rerender: 0,
			HH_draw_rerender: 0,
			MRS_metrics_table_data:[{
				'metrics': 'Time Zone'
			},{
				'metrics': 'LES upper'
			}, {
				'metrics': 'LES lower'
			}, {
				'metrics': 'during MRS DCI left'
			}, {
				'metrics': 'during MRS DCI right'
			},  {
				'metrics': 'post MRS DCI left'
			},  {
				'metrics': 'post MRS DCI right'
			}, {
				'metrics': 'during MRS IRP left'
			}, {
				'metrics': 'during MRS IRP right'
			}, {
				'metrics': 'post MRS IRP left'
			}, {
				'metrics': 'post MRS IRP right'
			}],

			HH_metrics_table_data:[{
				'metrics': 'UES upper'
			},{
				'metrics': 'UES lower'
			}, {
				'metrics': 'LES upper'
			}, {
				'metrics': 'LES lower'
			}, {
				'metrics': 'RIP'
			}, {
				'metrics': 'CD'
			}],

			MRS_draw_data: [
			{
				flag: 'DCI(during MRS)',
				value: 0
			}, 
			{
				flag: 'DCI(post MRS)',
				value: 0
			},
			{
				flag: 'IRP(during MRS)',
				value: 0
			},
			{
				flag: 'IRP(post MRS)',
				value: 0
			},
			{
				flag: 'Max DCI(post MRS)',
				value: 0
			},
			{
				flag: 'Mean DCI(post MRS)',
				value: 0
			},
			{
				flag: '<b>DCI ratio<b>',
				value: 0
			},
			{
				flag: 'Deglutitive inhibition',
				value: 'incomplete'
			},
			{
				flag: 'contour threshold',
				value: 30
			}],

			HH_draw_data:[
			{
				flag: 'LES-CD',
				value: 0
			},
			{
				flag: 'seperate',
				value: false.toString()
			}, 
			{
				flag: 'contour threshold',
				value: 30
			}],

			draw_btn_rerender: 0,

			//不同次 mrs test 相關的變數
			mrs_subtest: 1,
			mrs_subtest_options: 0,

			loading_options: {
				lock: true,
				text: 'loading...',
				background: 'rgba(0, 0, 0, 0.7)'
			},
			loading_instance: {},

			// 二度收縮的參數
			ab_mean_break: '-',
			ab_max_break: '-',
			SPR: '-',
			ER: '-',
		}
	},
	created(){
		// let loadingInstance = this.$loading(this.loading_options)
		this.loading_instance = this.$loading(this.loading_options)
		// load option data
		this.ws_10_options = ws_10_options
		this.mrs_options = mrs_options
		this.hh_options = hh_options
		this.rip_options = rip_options 
		this.table_data = table_data_format
		this.ab_table_data = ab_table_data_format
		
		GetWetSwallow(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
            console.log("Call get swallow API successed!")
			let retv = res.data
			let eptmetric_order = ['vigors', 'patterns', 'swallow_types', 'irp4s', 'dcis', 'dls']
			
			for(let i=0; i<eptmetric_order.length; i++){
				//console.log(res.data[eptmetric_order[i]])
				for(let j=0; j<10; j++){
					this.table_data[i]["sw"+(j+1).toString()] = retv[eptmetric_order[i]][j]
				}
			}
			
			this.ws_10_result = retv["ws_result"]
			this.update_ws_10_send_btn()

			// [TODO]
			var lst = Object.values(this.table_data[4])
			if(lst.length==10) {
				this.set_DCI_ratio()
			}
			
		}).catch((err)=>{
            console.log("Call get swallow API Failed!")
			console.log(err)
		})

		/*
			[MRS] Raw Data 
		*/
		GetMRSRawData(this.current_record_id).then((res)=>{
			console.log("Call get MRS RawData API successed!")
			let retv = res.data
			this.MRS_draw_param['draw_obj_lst'] = retv['rawdata']
			this.set_contour_data('MRS', this.MRS_draw_param['draw_obj_lst'], 0)
			let mrs_subtest_num = JSON.parse(this.MRS_draw_param['draw_obj_lst']).length
			mrs_subtest_options.splice(mrs_subtest_num, mrs_subtest_options.length)
			this.mrs_subtest_options = mrs_subtest_options
			this.init_mrs(mrs_subtest_num)
			this.mrs_rawdata_show = true
			this.loading_instance.close()
			

		}).catch((err)=>{
			console.log("Call get MRS RawData API failed")
			console.log(err)
		})

		/*
			[Hiatal Hernia] Raw Data 
		*/
		GetHHRawData(this.current_record_id).then((res)=>{
			console.log("Call get MRS RawData API successed!")
			let retv = res.data 
			this.HH_draw_param['draw_obj_lst'] = retv['rawdata']
			this.set_contour_data('HH', this.HH_draw_param['draw_obj_lst'], 0)
			this.init_hh()
			this.hh_rawdata_show = true
			this.fullscreenLoading = false
		})

		// [for 品峰] call GetMRSDrawInfo(in apis/mrs.js)
		
		// 把MRS圖的資料傳到前端
		GetMRSResult(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
			console.log("Call get MRS Result API successed!")
			let retv = res.data
			this.mrs_result = retv['mrs_result']
			this.mrs_result_show = true 
		}).catch((err)=>{
			console.log("Call get MRS Result API Failed!")
			console.log(err)
		})

		GetMRSDrawInfo(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
			console.log("Call get MRS DrawInfo API successed!")
			let retv = res.data
			this.set_backend_draw_param('MRS', retv)
			this.mrs_drawinfo_show = true
			this.update_mrs_send_btn()
		}).catch((err)=>{
			console.log("Call get MRS DrawInfo API Failed!")
			console.log(err)
		})
		
		GetMRSMetrics(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
			console.log("Call get MRS Metrics API successed!")
			let retv = res.data 
			this.set_backend_metrics('MRS', retv)
			this.mrs_metric_show = true
			this.update_mrs_send_btn()
		}).catch((err)=>{
			console.log("Call get MRS Metrics API Failed!")
			console.log(err)
		})

		GetHHResult(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
			console.log("Call get HH Result API successed!")
			let retv = res.data
			this.hh_result = retv['hh_result']
			this.rip_result = retv['rip_result']
			this.hh_result_show = true 
			this.rip_result_show = true
		}).catch((err)=>{
			console.log("Call get HH Result API Failed!")
			console.log(err)
		})

		// 把HH圖的資料傳到前端
		GetHHDrawInfo(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
            console.log("Call get HH DrawInfo API successed!")
			let retv = res.data
			this.set_backend_draw_param('HH', retv)
			this.hh_drawinfo_show = true
		}).catch((err)=>{
            console.log("Call get HH DrawInfo API Failed!")
			console.log(err)
		})
		GetHHMetrics(this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
            console.log("Call get HH Metrics API successed!")
			let retv = res.data
			this.set_backend_metrics('HH', retv)
			this.hh_metric_show = true
		}).catch((err)=>{
            console.log("Call get HH Metrics API Failed!")
			console.log(err)
		})
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
			else if(test_type == 'hh') {
				this.hh_confirm = true
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
				this.update_ws_10_send_btn()
			}
			else if(test_type == 'mrs') {
				this.update_mrs_send_btn()
			}
			else if(test_type == 'hh') {
				this.update_hh_send_btn()
			}
			else if(test_type == 'rip') {
				this.update_hh_send_btn()
			}
			
		},

		// update ws_10 send btn status
		update_ws_10_send_btn: function() {
			if(this.ws_10_table_send_disable == false && this.ws_10_result != '') {
				this.ws_10_send_disable = false
			}
			else {
				this.ws_10_send_disable = true
			}
		},

		// update mrs send btn status
		update_mrs_send_btn: function() {
			// for(var i=0; i<this.mrs_subtest_options.length; i++) {
			// 	if(this.MRS_draw_param['polys']['MRS'+(i+1).toString()].length < Object.keys(this.MRS_draw_param['disable_dict']['MRS1']).length) {
			// 		this.mrs_send_disable = true
			// 		return
			// 	}
			// }
			if(this.mrs_result=='') {
				this.mrs_send_disable = true
				return
			}

			this.mrs_send_disable = false
		},

		// update hh send btn status
		update_hh_send_btn: function() {
			if(this.HH_draw_param['polys']['landmark'].length < Object.keys(this.HH_draw_param['disable_dict']).length) {
				this.hh_send_disable = true
				return
			}

			if(this.hh_result=='' && this.rip_result=='') {
				this.hh_send_disable = false
				return
			}

			this.hh_send_disable = false
		},
		
		// get ws_10 table data
		get_ws_10_table_data: function(table) {
			this.ws_10_table_data = table
		},

		// 處理table的資料
		preprocess_ws_10_table_data: function(table_data) {
			// 這個只是要對add_table裡數據的順序而已
			var ws_10_object_col = ['vigors', 'patterns', 'swallow_types', 'irp4s', 'dcis', 'dls', 'breaks']
			var dic = {}
			
			for (var i = 0; i < table_data.length; i++) {
				var temp = Object.values(table_data[i])
				// 去除metrics
				temp.shift()
				dic[ws_10_object_col[i]] = temp
			}

			// ???這是啥???
			dic['pressure_max'] = 0
			dic['pressure_min'] = 0

			return dic
		},
		
		send_backend: function(test_type) {
			// call api here
			// ws_10_object is ready send to backend
			console.log(this.ws_10_table_data)
			if(test_type == 'ws_10') {
				this.ws_10_object = this.preprocess_ws_10_table_data(this.ws_10_table_data)
				this.ws_10_object['doctor_id'] = parseInt(this.$store.state.auth_app.login_name)
				this.ws_10_object['ws_result'] = this.ws_10_result
				this.ws_10_object['record_id'] = this.current_record_id

				UpdateWetSwallow(this.ws_10_object).then((res)=>{
					console.log("Call update WS API successed!")
					console.log(res)
					this.$message({message: '更新成功!',type: 'success'});
				}).catch((err)=>{
					console.log("Call update WS API successed!")
					console.log(err)
					this.$message.error('更新失敗!');
				})
			}
			else if(test_type == 'MRS') {
				// [for 品峰] call UpdateMRSDrawInfo(in apis/mrs.js)

				// 測試，用不到的話可刪
				// console.log(JSON.stringify(this.MRS_draw_param['polys'], null, 4))

				// 把MRS圖的資料傳到後端
				UpdateMRSDrawInfo(this.MRS_draw_param['polys'], this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
					console.log("Call update MRSDrawInfo API successed!")
					console.log(res)
					this.$message({message: '更新成功!',type: 'success'});
				}).catch((err)=>{
					console.log("Call update MRSDrawInfo API successed!")
					console.log(err)
					this.$message.error('更新失敗!');
				})

				// [for 品峰] call UpdateMRSMetrics(in apis/mrs.js)

				// 測試，用不到的話可刪
				// console.log(JSON.stringify(this.MRS_draw_param['metrics'], null, 4))

				// 把MRS的數值傳到後端
				UpdateMRSMetrics(this.MRS_draw_param['metrics'], this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
					console.log("Call update MRSMetrics API successed!")
					console.log(res)
					this.$message({message: '更新成功!',type: 'success'});
				}).catch((err)=>{
					console.log("Call update MRSMetrics API successed!")
					console.log(err)
					this.$message.error('更新失敗!');
				})

				// [for 品峰]
				// 把MRS的結果傳到後端
				var mrs_result_obj = {
					'mrs_result': this.mrs_result
				}
				UpdateMRSResult(mrs_result_obj, this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
					console.log("Call update MRS Result API successed!")
					console.log(res)
					this.$message({message: '更新成功!',type: 'success'});
				}).catch((err)=>{
					console.log("Call update MRS Result API successed!")
					console.log(err)
					this.$message.error('更新失敗!');
				})



			}
			else if(test_type == 'HH') {
				// [for 品峰] call UpdateHHDrawInfo(in apis/hh.js)

				// 測試，用不到的話可刪
				// console.log(JSON.stringify(this.HH_draw_param['polys'], null, 4))

				// 把HH圖的資料傳到後端
				UpdateHHDrawInfo(this.HH_draw_param['polys'], this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
					console.log("Call update HHDrawInfo API successed!")
					console.log(res)
					this.$message({message: '更新成功!',type: 'success'});
				}).catch((err)=>{
					console.log("Call update HHDrawInfo API successed!")
					console.log(err)
					this.$message.error('更新失敗!');
				})

				// [for 品峰] call UpdateHHMertics(in apis/hh.js)

				// 測試，用不到的話可刪
				// console.log(JSON.stringify(this.HH_draw_param['metrics'], null, 4))

				// 把HH的數值傳到後端
				UpdateHHMetrics(this.HH_draw_param['metrics'], this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
					console.log("Call update HHMetrics API successed!")
					console.log(res)
					this.$message({message: '更新成功!',type: 'success'});
				}).catch((err)=>{
					console.log("Call update HHMetrics API successed!")
					console.log(err)
					this.$message.error('更新失敗!');
				})

				var hh_result_obj = {
					'hh_result': this.hh_result,
					'rip_result': this.rip_result
				}
				UpdateHHResult(hh_result_obj, this.current_record_id, parseInt(this.$store.state.auth_app.login_name)).then((res)=>{
					console.log("Call update HH Result API successed!")
					console.log(res)
					this.$message({message: '更新成功!',type: 'success'});
				}).catch((err)=>{
					console.log("Call update HH Result API successed!")
					console.log(err)
					this.$message.error('更新失敗!');
				})
			}

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
					this.send_backend('MRS')
				}
			}
			if(type == 'hh'){
				this.hh_confirm = false
				if(confirm_result) {
					this.send_backend('HH')
				}
			}
		},


		// [TODO]
		// add json parse
		set_backend_draw_param(test, polys) {
			// get_backend_poly is deprecated
			// this.get_backend_polys(test, polys)

			if(test=='MRS') {
				this.MRS_draw_param['polys'] = polys
			}
			else if(test=='HH') {
				this.HH_draw_param['polys'] = polys
			}
			// update btn status
			// key=MRS1、MRS2、...
			var key=''
			for(var i=0; i<polys.length; i++) {
				key = Object.keys(polys)[i]
				if(test=="MRS") {
					for(var j=0; j<polys[key].length; j++) {
						this.MRS_draw_param['disable_dict'][key][polys[key][j]['flag']] = true
					}
					if(polys[key].length>0) {
						this.MRS_draw_param['ini'][key] = false
					}
				}
				else if(test=='HH') {
					for(j=0; j<polys[key].length; j++) {
						this.HH_draw_param['disable_dict'][polys[key][j]['flag']] = true
					}
				}
			}
			this.draw_btn_rerender += 1
			this.MRS_draw_rerender += 1
		},

		// [TODO]
		// set metrics
		set_backend_metrics(test, metrics) {
			if(test=="MRS") {
				this.MRS_draw_param['metrics'] = metrics

				// rerender draw table data 
				this.MRS_draw_data[0]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI1']
				this.MRS_draw_data[1]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI2']
				this.MRS_draw_data[2]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP1']
				this.MRS_draw_data[3]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP2']

				this.set_Max_DCI()
				this.set_Mean_DCI()
				this.set_DCI_ratio()

			}
			else if(test=='HH') {
				this.HH_draw_param['metrics'] = metrics

				// rerender draw table data 
				this.HH_draw_data[0]['value'] = this.HH_draw_param['metrics']['landmark']['LES-CD']
				this.HH_draw_data[1]['value'] = this.HH_draw_param['metrics']['landmark']['seperate'].toString()
			}
		},
		
		set_contour_data(test, obj_lst, idx) {
			if(test=='MRS') {
				this.MRS_draw_param['raw_data'] = JSON.parse(obj_lst)[idx]
				this.MRS_draw_param['x_size'] = this.MRS_draw_param['raw_data'][0].length
				this.MRS_draw_param['time_scale'] = [...Array(this.MRS_draw_param['x_size']).keys()].map(function(val){
					return val / 20
				})
			}
			else if(test=='HH') {
				// 先預設拿0來繪製(因為HH只有一張圖)
				this.HH_draw_param['raw_data'] = JSON.parse(obj_lst)[0]
				this.HH_draw_param['x_size'] = this.HH_draw_param['raw_data'][0].length
				this.HH_draw_param['time_scale'] = [...Array(this.HH_draw_param['x_size']).keys()].map(function(val){
					return val / 20
				})
			}
		},

		// get polys from draw.vue
		// set poly to draw_param
		get_polys(test, poly_lst) {
			if(test=='MRS') {
				this.MRS_draw_param['polys']['MRS'+this.mrs_subtest.toString()] = poly_lst
				this.update_mrs_send_btn()
			}
			else if(test=='HH') {
				this.HH_draw_param['polys']['landmark'] = poly_lst
				this.update_hh_send_btn()
				this.set_rip_result(poly_lst)
			}
		},

		mrs_subtest_selected_update() {
			this.set_contour_data('MRS', this.MRS_draw_param['draw_obj_lst'], this.mrs_subtest-1)
			this.MRS_draw_rerender += 1

			// rerender draw table data 
			this.MRS_draw_data[0]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI1']
			this.MRS_draw_data[1]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI2']
			this.MRS_draw_data[2]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP1']
			this.MRS_draw_data[3]['value'] = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP2']

			this.set_DI()
			this.set_DCI_ratio()
		},

		update_draw_btn(obj) {
			if(obj['flag'].includes('MRS')) {
				var current_subtest = "MRS"+this.mrs_subtest.toString()
				this.MRS_draw_param['disable_dict'][current_subtest][obj['flag']] = obj['status']
				if(Object.keys(this.MRS_draw_param['disable_dict'][current_subtest]).slice(0, 3).includes(obj['flag'])) {
					if(!Object.values(this.MRS_draw_param['disable_dict'][current_subtest]).slice(0, 3).includes(false) && !obj['rehorizontal']) {
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI1_left'] = false
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI1_right'] = false
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI2_left'] = false
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI2_right'] = false
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP1_left'] = false
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP1_right'] = false
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP2_left'] = false
						this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP2_right'] = false
					}
				}
			}
			else if(obj['flag'].includes('HH')) {
				this.HH_draw_param['disable_dict'][obj['flag']] = obj['status']
			}
			this.draw_btn_rerender += 1
		},
		draw_handler(test, idx) {
			var metrics = []
			var draw_type = ''
			if(test=='MRS') {
				this.MRS_draw_param['ini']["MRS"+this.mrs_subtest.toString()] = false
				var horizontal_lst = [0, 1, 2]
				var vertical_lst = [3, 4, 5, 6, 7, 8, 9, 10]
				

				if(horizontal_lst.includes(idx)) {
					draw_type = 'horizontal'
				}
				else if(vertical_lst.includes(idx)) {
					draw_type = 'vertical'
				}
				// 借用key而已
				metrics = Object.keys(this.MRS_draw_param['disable_dict']['MRS1'])[idx]
				this.$refs.MRS_draw.set_draw_data(draw_type, metrics)
			}
			else if(test=='HH') {
				// HH 都是水平線
				draw_type = 'horizontal'
				metrics = Object.keys(this.HH_draw_param['disable_dict'])[idx]
				this.$refs.HH_draw.set_draw_data(draw_type, metrics)
			}
		},
		delete_handler(test, idx) {
			var idx_lst = [idx]
			if(test=='MRS') {
				var current_subtest = "MRS"+this.mrs_subtest.toString()

				if(idx == 0 || idx == 1 || idx == 2){
					// force button update status
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI1_left'] = true
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI1_right'] = true
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI2_left'] = true
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_DCI2_right'] = true
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP1_left'] = true
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP1_right'] = true
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP2_left'] = true
					this.MRS_draw_param['disable_dict'][current_subtest]['MRS_IRP2_right'] = true


					//  delete TZ
					if(idx == 0) {
						idx_lst.push(3, 4, 5, 6)
					}
					// delete LES upper
					else if(idx == 1) {
						idx_lst.push(3, 4, 5, 6, 7, 8, 9, 10)
					}
					// delete LES lower
					else if (idx == 2) {
						idx_lst.push(7, 8, 9, 10)
					}
				}
				// 0, 1, 2 for hover lines
				idx_lst = idx_lst.map(function(val) {
					return val + 3
				})

				this.$refs.MRS_draw.clear_target(idx_lst)
				// 借用key而已
				this.$refs.MRS_draw.delete_line_title(Object.keys(this.MRS_draw_param['disable_dict']["MRS1"])[idx])
			
				this.set_Max_DCI()
				this.set_Mean_DCI()
			
			}
			else if(test=='HH') {
				// 0, 1, 2 for hover lines // 3 ~ 13 for MRS lines
				idx_lst = idx_lst.map(function(val) {
					return val + 14
				})
				this.$refs.HH_draw.clear_target(idx_lst)
				// 借用key而已
				this.$refs.HH_draw.delete_line_title(Object.keys(this.HH_draw_param['disable_dict'])[idx])

			}

		},
		draw_disable(test, idx) {
			if(test=='MRS') {
				return Object.values(this.MRS_draw_param['disable_dict']["MRS"+this.mrs_subtest.toString()])[idx]
			}
			else if(test=='HH') {
				return Object.values(this.HH_draw_param['disable_dict'])[idx]
			}
		},
		delete_disable(test, idx) {
			if(test=='MRS') {
				if(this.MRS_draw_param['ini']["MRS"+this.mrs_subtest.toString()]) {
					return true
				}
				else {
					//借用key而已
					var flags = Object.keys(this.MRS_draw_param['disable_dict']["MRS1"])
					
					var exist_lines = this.MRS_draw_param['polys']['MRS'+this.mrs_subtest.toString()].map(function(obj) {
						return obj['flag']
					})
					if(exist_lines.includes(flags[idx])) {
						return false
					}
					else {
						return true
					}
				}
			}
			else if(test=='HH') {
				return !Object.values(this.HH_draw_param['disable_dict'])[idx]
			}
			
		},
		get_DCI(obj) {
			if(obj['seq']==1) {
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI1'] = obj['DCI']
				// force table data change
				this.MRS_draw_data[0]['value'] = obj['DCI']
				
				this.set_DI()
			}
			else if(obj['seq']==2) {
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI2'] = obj['DCI']
				// force table data change
				this.MRS_draw_data[1]['value'] = obj['DCI']

				this.set_Max_DCI()
				this.set_Mean_DCI()
				this.set_DCI_ratio()
			}
		},

		get_IRP(obj) {
			if(obj['seq']==1) {
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP1'] = obj['IRP']
				// force table data change
				this.MRS_draw_data[2]['value'] = obj['IRP']
			}
			if(obj['seq']==2) {
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP2'] = obj['IRP']
				// force table data change
				this.MRS_draw_data[3]['value'] = obj['IRP']
			}

		},
		get_LES_CD(obj) {
			this.HH_draw_data[0]['value'] = obj['LES_CD']
			this.HH_draw_param['metrics']['landmark']['LES-CD'] = obj['LES_CD']

			// table 需要String才能顯示
			this.HH_draw_data[1]['value'] = obj['seperate'].toString()
			this.HH_draw_param['metrics']['landmark']['seperate'] = obj['seperate']
		},
		clear_all(test) {
			if(test == 'MRS') {
				this.$refs.MRS_draw.clear_all(test)
				this.MRS_draw_param['ini']["MRS"+this.mrs_subtest.toString()] = true

				// MRS DCI1
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI1'] = 0
				// force table data change
				this.MRS_draw_data[0]['value'] = 0
				
				// MRS DCI2
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI2'] = 0
				// force table data change
				this.MRS_draw_data[1]['value'] = 0
				
				// MRS IRP1
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP1'] = 0
				// force table data change
				this.MRS_draw_data[2]['value'] = 0

				// MRS IRP2
				this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_IRP2'] = 0
				// force table data change
				this.MRS_draw_data[3]['value'] = 0

				this.set_DI()
				this.set_Max_DCI()
				this.set_Mean_DCI()
				
			}
			else if(test=='HH') {
				this.$refs.HH_draw.clear_all(test)
				this.HH_draw_data[0]['value'] = 0
				this.HH_draw_data[1]['value'] = 0
			}
		},
		contour_size_change(test, val) {
			if(test=='MRS') {
				this.MRS_draw_data[8]['value'] = val
				this.$refs.MRS_draw.contour_size_change(val)
			}
			else if(test=='HH') {
				this.HH_draw_data[2]['value'] = val
				this.$refs.HH_draw.contour_size_change(val)
			}
		},
		init_mrs(mrs_subtest_num){
			for(var i=0; i<mrs_subtest_num; i++) {
				// for deep copy
				this.MRS_draw_param['disable_dict']['MRS'+(i+1).toString()] = {
					MRS_TZ: false,
					MRS_LES_upper: false,
					MRS_LES_lower: false,
					MRS_DCI1_left: true,
					MRS_DCI1_right: true,
					MRS_DCI2_left: true,
					MRS_DCI2_right: true,
					MRS_IRP1_left: true,
					MRS_IRP1_right: true,
					MRS_IRP2_left: true,
					MRS_IRP2_right: true,
				}
			}
		},
		init_hh(){
			this.HH_draw_param['metrics']['landmark'] = {
				'LES-CD': 0,
				'seperate': false
			}
			this.HH_draw_param['disable_dict'] = {
				'HH_UES_upper': false,
				'HH_UES_lower': false,
				'HH_LES_upper': false,
				'HH_LES_lower': false,
				'HH_RIP': false,
				'HH_CD': false,
			}
		},
		set_Max_DCI() {
			var DCI_lst = []

			for(var i=0; i<Object.keys(this.MRS_draw_param['metrics']).length; i++) {
				DCI_lst.push(this.MRS_draw_param['metrics']['MRS'+(i+1).toString()]['MRS_DCI2'])
			}
			if(DCI_lst.length>0) {
				this.MRS_draw_data[4]['value'] = Math.max(...DCI_lst)
			}
			else {
				this.MRS_draw_data[4]['value'] = 0
			}
		},
		set_Mean_DCI() {
			var DCI_lst = []

			for(var i=0; i<Object.keys(this.MRS_draw_param['metrics']).length; i++) {
				DCI_lst.push(this.MRS_draw_param['metrics']['MRS'+(i+1).toString()]['MRS_DCI2'])
			}
			const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
			if(DCI_lst.length>0) {
				this.MRS_draw_data[5]['value'] = average(DCI_lst)
			}
			else {
				this.MRS_draw_data[5]['value'] = 0
			}
			
		},

		set_DI() {
			if(this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI1']<100) {
				this.MRS_draw_data[7]['value'] = 'complete'
			}
			else {
				this.MRS_draw_data[7]['value'] = 'incomplete'
			}
		},
		set_DCI_ratio() {
			var lst = Object.values(this.table_data[4])
			var ws_10_DCI = 0
			for(var i=1; i<lst.length; i++) {
				ws_10_DCI+=parseFloat(lst[i])
			}
			
			var MRS_DCI = this.MRS_draw_param['metrics']['MRS'+this.mrs_subtest.toString()]['MRS_DCI2']
			if(MRS_DCI == 0) {
				this.MRS_draw_data[6]['value'] = 'undefine'
			}
			else {
				this.MRS_draw_data[6]['value'] = MRS_DCI / ws_10_DCI
			}
		},

		// show_loading() {
		// 	let loadingInstance = this.$loading(this.loading_options)
		// }
		set_rip_result(poly_lst) {
			var upper = -1
			var lower = -1
			var rip = -1

			for(var i=0; i<poly_lst.length;i++) {
				switch (poly_lst[i].flag) {
					case 'HH_LES_upper':
						upper = poly_lst[i].y0
						break
					case 'HH_LES_lower':
						lower = poly_lst[i].y0
						break
					case 'HH_RIP':
						rip = poly_lst[i].y0
						break
				}
			}

			if(upper >= 0 && rip >= 0 && rip < upper) {
				this.rip_result = 'proximal'
			}
			else if(lower >= 0 && rip >= 0 && rip > lower) {
				this.rip_result = 'distal'
			}
			else {
				this.rip_result = 'no_result'
			}
		},
		set_mean_break(test, val) {
			if(test == 'ws_10') {
				this.ws_10_mean_break = val
			}
			else if (test == 'ab') {
				this.ab_mean_break = val
			}
		},
		set_max_break(test, val) {
			if(test == 'ws_10') {
				this.ws_10_max_break = val
			}
			else if(test == 'ab') {
				this.ab_max_break = val
			}
		},
		set_SPR(val) {
			this.SPR = val
		},
		set_ER(val) {
			this.ER = val
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
::v-deep .el-table .cell {
	white-space: pre-line;
}


</style>
