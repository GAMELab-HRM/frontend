<template>
	<div>
		<el-row>
			<el-col :md="{span: 10, offset:2}" :xl="{span: 5, offset: 12}">
				<h1 style="font-size: 30px">x = {{mouse_x}}</h1>
			</el-col>
			<el-col :md="{span: 10, offset: 2}" :xl="{span: 5, offset:2}">
				<h1 style="font-size: 30px">y = {{mouse_y}}</h1>
			</el-col>
		</el-row>
		<div id='plt' @mouseleave="leave_handler" @mousemove="mousemove_handler">
			<VuePlotly id='plt2' ref="plotly" :style="plotly_style" :data="data" :layout="layout" :options='options' @click="click_handler"  @hover='hover_handler' />
		</div>
	</div>
</template>

<script>


import VuePlotly from "@statnett/vue-plotly";
import {initial_line} from '@/utils/metrics_poly'

window.VuePlotly = VuePlotly;

var vue_instance = {
	name: "draw",
	components: {
		VuePlotly,
	},
	props:['raw_data', 'time_scale', 'catheter_scale', 'polys', 'plotType'],
	data() {
		return {
			drawing: false,
			mouse_x: 0,
			mouse_y: 0,
			// box_first_point: false,
			flag: '',
			draw_type:'',

			// 是否移動水平線(不是刪除)
			rehorizontal: false,
			
			DCI_computable: false,
			IRP_computable: false,
			LES_CD_computable: false,
			abdominal_baseline_computable: false,
			abdominal_SLR_computable: false,
			esophageal_baseline_computable: false,
			esophageal_SLR_computable: false,
			plotly_style: '',
			MRS_mapping_flag: {
				'MRS_TZ': 3,
				'MRS_LES_upper': 4,
				'MRS_LES_lower': 5,
				"MRS_DCI1_left": 6,
				'MRS_DCI1_right': 7,
				'MRS_DCI2_left': 8,
				'MRS_DCI2_right': 9,
				'MRS_IRP1_left': 10,
				'MRS_IRP1_right': 11,
				'MRS_IRP2_left': 12,
				'MRS_IRP2_right': 13
			},

			HH_mapping_flag: {
				'HH_UES_upper': 14,
				'HH_UES_lower': 15,
				'HH_LES_upper': 16,
				'HH_LES_lower': 17,
				'HH_RIP': 18,
				'HH_CD': 19,
			},

			SLR_mapping_flag: {
				'SLR_h_upper': 20,
				'SLR_h_middle': 21,
				'SLR_h_lower': 22,
				'SLR_v_left': 23,
				'SLR_v_middle': 24,
				'SLR_v_right': 25,
			},

			// plotly data
			data: [{
				z: this.raw_data,
				x: this.time_scale,
				y: this.catheter_scale, 
				type: 'contour',
				autocontour: false,
				showlegend: false,
				contours:{
                    coloring:"heatmap",
					start: -15,
					end: 150,
					// size can be changed by slider
					size: 20
                },
				line: {
					color: 'black',
					width: 0,
				},
				autocolorscale: false,
				colorscale:[
					[0, 'rgb(16, 10, 255)'], //-15
					[0.055, 'rgb(13, 68, 254)'],
					[0.11, 'rgb(7, 196, 253)'],

					[0.165, 'rgb(7, 252, 216)'],
					[0.22, 'rgb(14,253,94)'],
					[0.275, 'rgb(19,254,9)'],
					[0.33, 'rgb(89,249,3)'],
					[0.385, 'rgb(143,245,3))'],

					[0.44, 'rgb(214, 240, 3)'],
					[0.495, 'rgb(252, 220, 3)'],
					[0.55, 'rgb(253, 139, 2)'],
					[0.605, 'rgb(254, 76, 1)'],
					[0.66, 'rgb(253, 0, 1)'],

					[0.715, 'rgb(225, 1, 24)'],
					[0.77, 'rgb(182, 2, 59)'],
					[0.825, 'rgb(154,3,81)'],
					[0.88, 'rgb(130,4,102)'],
					[1, 'rgb(100,5,126)'], // 150
				],
				colorbar: {
					dtick: 30,
					tick0: -15,
				},
				hoverinfo: 'none',
				flag: 'contour',
			}, {
				z: this.raw_data,
				x: this.time_scale,
				y: this.catheter_scale, 
				type: 'contour',
				showlegend: false,
				contours:{
                    coloring:"heatmap",
					// start: -15,
					// end: 150,
					// // size can be changed by slider
					// size: 30
					type: 'constraint',
					value: 30,
					operation: '='
                },
				line: {
					color: 'black',
				},
				autocolorscale: false,
				hoverinfo: 'none',
				flag: 'contour',
			}, ],
			layout: {
				title: '',
				shapes:[{
					// horizontal initial hover line
					type: 'line',
					x0: 0,
					y0: 0,
					x1: Math.max(...this.time_scale),
					y1: 0,
					line: {
						color: 'rgba(255, 255, 255, 0.3)',
						width: 3,
						dash: 'solid'
					},
					flag: 'horizontal',
					draw_type: 'horizontal',
				}, {
					// vertical initial hover line
					type: 'line',
					x0: 0,
					y0: 0,
					x1: 0,
					y1: Math.max(...this.catheter_scale),
					line: {
						color: 'rgba(255, 255, 255, 0.3)',
						width: 3,
						dash: 'solid'
					},
					flag: 'vertical',
					draw_type: 'vertical',
				}, {
					type: 'rect',
					x0: 0,
					y0: 0,
					x1: 0,
					y1: 0,
					line: {
						color: 'rgba(255, 255, 255, 1)',
						width: 3,
						dash: 'solid'
					},
					flag: 'box',
					draw_type: 'box',
				}, 

					// 如果只是 '{}' 做初始化的話，plotly會自動補上黑色長方形的圖(WTF)
					// 改成dict更新資料會很麻煩(且噴一堆錯)所以先暫時這樣

					// for MRS TZ
					initial_line,

					//for MRS LES upper
					initial_line,

					//for MRS Les lower
					initial_line,

					//for MRS DCI1 left
					initial_line,

					//for MRS DCI1 right
					initial_line,

					//for MRS DCI2 left
					initial_line,

					//for MRS DCI2 right
					initial_line,

					//for MRS IRP1 left
					initial_line,

					//for MRS IRP1 right
					initial_line,

					//for MRS IRP2 left
					initial_line,

					//for MRS IRP2 right
					initial_line,

					//for HH UES upper
					initial_line,

					//for HH UES lower
					initial_line,

					//for HH LES upper
					initial_line,

					//for HH LES lower
					initial_line,

					//for HH RIP
					initial_line,

					//for HH CD
					initial_line,

					// for SLR v upper
					initial_line,

					// for SLR v middle
					initial_line,

					// for SLR v lower
					initial_line,

					// for SLR h left
					initial_line,

					// for SLR h middle
					initial_line,

					// for SLR h right
					initial_line,
				]
			},
			options: {
				modeBarButtonsToRemove: [
					'lasso2d',
					'zoomOut2d',
					'toImage',
					'resetScale2d',
					'hoverClosestCartesian',
					'hoverCompareCartesian',
					'toggleSpikelines',
					'zoomIn2d'
				],
				displayModeBar: true,
				scrollZoom: true,
				displaylogo: false,
			}
		}	
	},
	created() {
		if(this.plotType == 'HH') {
			let new_colorscale = [
				[0, 'rgb(16, 10, 255)'], //-15
				[0.055, 'rgb(13, 68, 254)'],
				[0.11, 'rgb(7, 196, 253)'],

				[0.165, 'rgb(7, 252, 216)'],
				[0.22, 'rgb(14,253,94)'],
				[0.275, 'rgb(19,254,9)'],
				[0.33, 'rgb(89,249,3)'],
				[0.385, 'rgb(143,245,3))'],

				[0.44, 'rgb(214, 240, 3)'],
				[0.495, 'rgb(252, 220, 3)'],
				[0.55, 'rgb(253, 139, 2)'],
				[0.605, 'rgb(254, 76, 1)'],
				[0.66, 'rgb(253, 0, 1)'],

				[0.715, 'rgb(225, 1, 24)'],
				[0.77, 'rgb(182, 2, 59)'],
				[0.825, 'rgb(154,3,81)'],
				[0.88, 'rgb(130,4,102)'],
				[1, 'rgb(100,5,126)'], // 150
			]
			this.data[0]['colorscale'] = new_colorscale
			// this.$refs.plotly.update_trace(this.data[0])
		}

		// initial update

		// 暫刪
		// window.layout = this.layout
	},
	mounted() {

		var update_layout = {
			width: window.innerWidth * 0.5,
			// 0.658
			height: window.innerHeight * 0.72,
			plot_bgcolor:"transparent",
			paper_bgcolor:"transparent",
			margin: {
				b: 70,
				t: 50,
				r: 0,
				l: 70,
			},
			font: {
				size: 20,
			},
			yaxis:{
				autorange: 'reversed',
				title: {
					text: 'length(cm)'
				}
			},
			xaxis:{
				title: {
					text: 'duration(sec)'
				}
			}
		}
		console.log(update_layout)
		for(var i=0; i<this.polys.length; i++) {
			this.$emit('update_draw_btn_status', {'flag': this.polys[i]['flag'], 'status': true})
		}
		for(i=0; i<this.polys.length; i++) {
			var f = this.polys[i]['flag']
			if(f.includes('MRS')) {
				this.layout.shapes[this.MRS_mapping_flag[this.polys[i]['flag']]] = this.polys[i]
			}
			else if(f.includes('HH')) {
				this.layout.shapes[this.HH_mapping_flag[this.polys[i]['flag']]] = this.polys[i]
			}
			else if(f.includes('SLR')) {
				this.layout.shapes[this.SLR_mapping_flag[this.polys[i]['flag']]] = this.polys[i]
			}
			
			if(this.polys[i]['draw_type'] == 'horizontal') {
				this.flag = this.polys[i]['flag']
				this.add_line_title(this.polys[i]['flag'], this.polys[i]['y0'])
			}
		}
		// reset flag
		this.flag = ''
		console.log('created')
		
		this.$refs.plotly.relayout(update_layout)
	},
	methods: {
		mousemove_handler(evt){
			
			let bb = evt.target.getBoundingClientRect()
			this.mouse_x = this.$refs.plotly.$refs.container._fullLayout.xaxis.p2d(evt.clientX - bb.left)
			this.mouse_y = this.$refs.plotly.$refs.container._fullLayout.yaxis.p2d(evt.clientY - bb.top)
			this.mouse_x = parseFloat(this.mouse_x.toFixed(2))
			this.mouse_y = parseFloat(this.mouse_y.toFixed(2))
		},
		set_draw_data(draw_type, flag) {
			this.draw_type = draw_type
			this.flag = flag
			this.drawing = true
		},
		add_line_title(flag, line_y) {
			var offset = 0
			var max_x = Math.max(...this.time_scale)
			if(max_x > 40) {
				if(flag.length > 6) {
					offset = max_x-6
				}
				else {
					offset = max_x-4
				}
			}
			else {
				if(flag.length > 6) {
					offset = max_x-3
				}
				else {
					offset = max_x-2
				}
			}
			var title_text=''
			if(this.flag.includes('MRS') || this.flag.includes('SLR')) {
				title_text=flag.slice(4, flag.length)
			}
			else if(this.flag.includes('HH')) {
				title_text=flag.slice(3, flag.length)
			}

			var new_line_title={
				x: [offset],
				y: [line_y-1],
				mode: 'text',
				text: [title_text],
				showlegend: false,
				hoverinfo: 'none',
				textfont: {
					color: "white",
					size: 20,
				},
				flag: flag,
			}
			this.$refs.plotly.addTraces(new_line_title)
		},
		delete_line_title(flag) {
			for(var i=0; i<this.data.length; i++) {
				if(this.data[i].flag == flag) {
					this.$refs.plotly.deleteTraces(i)
					return
				}
			}
		},

		contour_size_change(val) {
			this.data[1]['contours']['value'] = val
			// this.data[0]['colorbar']['dtick'] = val
			// this.$refs.plotly.redraw(this.data)
		},
		click_handler() {
			// for vertical line (DCI1 left、right, DCI2 left、right, IRP1 left、right, IRP2 left、right)
			var vertical_lst = [6, 7, 8, 9, 10, 11, 12, 13, 23, 24, 25]
			for(var i=0; i<vertical_lst.length; i++) {
				if(this.mouse_x >= this.layout.shapes[vertical_lst[i]].x0 - 0.5 && this.mouse_x <= this.layout.shapes[vertical_lst[i]].x1 + 0.5 && this.mouse_y >= this.layout.shapes[vertical_lst[i]].y0 - 0.1 && this.mouse_y <= this.layout.shapes[vertical_lst[i]].y1 + 0.1 && !this.drawing) {
					this.flag = this.layout.shapes[vertical_lst[i]]['flag']
					this.draw_type = this.layout.shapes[vertical_lst[i]]['draw_type']
					this.clear_target([vertical_lst[i]])
					return
				}
			}
			
			// for horizontal line (TZ, LES upper、lower)
			var horizontal_lst = [3, 4, 5, 14, 15, 16, 17, 18, 19, 20, 21, 22]
			for(i=0; i<horizontal_lst.length; i++) {
				if(this.mouse_x >= this.layout.shapes[horizontal_lst[i]].x0 && this.mouse_x <= this.layout.shapes[horizontal_lst[i]].x1 && this.mouse_y >= this.layout.shapes[horizontal_lst[i]].y0-0.2 && this.mouse_y <= this.layout.shapes[horizontal_lst[i]].y1+0.2 && !this.drawing) {
					this.flag = this.layout.shapes[horizontal_lst[i]]['flag']
					this.draw_type = this.layout.shapes[horizontal_lst[i]]['draw_type']
					this.delete_line_title(this.flag)
					this.clear_target([horizontal_lst[i]])
					this.rehorizontal = true
					
					return
				}
			}
			
			
			if(this.draw_type == 'vertical') {
				this.draw_vertical()
			}
			if(this.draw_type == 'horizontal') {
				this.draw_horizontal()
			}
			// if(this.draw_type == 'box') {
			// 	if(this.box_first_point) {
			// 		this.draw_box_second()
			// 	}
			// 	else {
			// 		this.draw_box_first()
			// 	}
			// }
		},
		hover_handler() {
			if(this.draw_type == 'vertical') {
				this.hover_vertical()
			}
			if(this.draw_type == 'horizontal') {
				this.hover_horizontal()
			}
			// if(this.draw_type == 'box' && this.box_first_point) {
			// 	this.hover_box()
			// }
		},
		draw_horizontal() {
			var new_line = {
				type: 'line',
				x0: 0,
				y0: this.mouse_y,
				x1: Math.max(...this.time_scale),
				y1: this.mouse_y,
				line: {
					color: 'rgb(255, 255, 255)',
					width: 3,
					dash: 'solid'
				},
				draw_type: 'horizontal',
				flag: this.flag,
				is_draw: true,
			}
			if(this.flag.includes('MRS')) {
				this.layout.shapes[this.MRS_mapping_flag[this.flag]] = new_line

				if(this.rehorizontal) {
					if(this.flag == 'MRS_TZ') {
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_right']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_right']].y0 = this.mouse_y
					}
					else if(this.flag == 'MRS_LES_upper') {
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_right']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_right']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_right']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_right']].y0 = this.mouse_y
					}
					else if(this.flag == 'MRS_LES_lower') {
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_right']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_right']].y1 = this.mouse_y
					}
				}
			}
			else if(this.flag.includes('HH')) {
				if(this.flag.includes('CD')) {
					new_line['line']['color'] = 'rgb(235, 82, 52)'
				}
				else if(this.flag.includes('RIP')) {
					new_line['line']['color'] = 'rgb(52, 95, 235)'
				}
				this.layout.shapes[this.HH_mapping_flag[this.flag]] = new_line
			}

			else if(this.flag.includes('SLR')) {
				this.layout.shapes[this.SLR_mapping_flag[this.flag]] = new_line

				if(this.rehorizontal && this.flag == 'SLR_h_upper') {
					this.layout.shapes[this.SLR_mapping_flag['SLR_v_left']].y1 = this.mouse_y
					this.layout.shapes[this.SLR_mapping_flag['SLR_v_middle']].y1 = this.mouse_y
					this.layout.shapes[this.SLR_mapping_flag['SLR_v_right']].y1 = this.mouse_y
				}
			}

			this.$refs.plotly.relayout(this.layout)
			this.$emit('update_draw_btn_status', {'flag': this.flag, 'status': true, 'rehorizontal': this.rehorizontal})
			console.log(this.flag)
			this.add_line_title(this.flag, this.mouse_y)
			this.drawing=false
			this.get_current_polys()
			var pressure_lst = []

			if(this.flag.includes('MRS')) {
				// line index [3, 4, 6, 7] for DCI1
				this.DCI_computable = this.check_metrics_computable([3, 4, 6, 7], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 1, 'DCI': this.compute_DCI([3, 4, 6, 7])})
				}

				// line index [3, 4, 8, 9] for DCI2
				this.DCI_computable = this.check_metrics_computable([3, 4, 8, 9], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 2, 'DCI': this.compute_DCI([3, 4, 8, 9])})
				}

				// line index [4, 5, 10, 11] for IRP1
				this.IRP_computable = this.check_metrics_computable([4, 5, 10, 11], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 1, 'IRP': this.compute_IRP([4, 5, 10, 11])})
				}

				// line index [4, 5, 12, 13] for IRP2
				this.IRP_computable = this.check_metrics_computable([4, 5, 12, 13], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 2, 'IRP': this.compute_IRP([4, 5, 12, 13])})
				}
			}
			else if(this.flag.includes('HH')) {
				this.LES_CD_computable = this.check_metrics_computable([16, 17, 19], this.flag)
				if(this.LES_CD_computable) {
					var lst = this.compute_LES_CD([16, 17, 19])
					this.$emit("get_LES_CD", {'LES_CD': lst[0], 'seperate': lst[1]})
				}
			}
			else if(this.flag.includes("SLR")) {
				this.abdominal_baseline_computable = this.check_metrics_computable([22, 23, 24], this.flag)
				if(this.abdominal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "abdominal_baseline", "value": pressure_lst})
				}

				this.abdominal_SLR_computable = this.check_metrics_computable([22, 24, 25], this.flag)
				if(this.abdominal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "abdominal_SLR", "value": pressure_lst})
				}

				this.esophageal_baseline_computable = this.check_metrics_computable([20, 21, 23, 24], this.flag)
				if(this.esophageal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "esophageal_baseline", "value": pressure_lst})
				}

				this.esophageal_SLR_computable = this.check_metrics_computable([20, 21, 24, 25], this.flag)
				if(this.esophageal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "esophageal_SLR", "value": pressure_lst})
				}
			}

			// reset
			this.draw_type=''
			this.flag = ''
			this.rehorizontal = false
		},
		draw_vertical() {
			var new_y0 = 0
			var new_y1 = 0
			var color = ''

			// 設定DCI與IRP的兩端點至水平線
			if(this.flag.includes('DCI')) {
				// TZ
				new_y0 = this.layout.shapes[3].y0

				// LES upper
				new_y1 = this.layout.shapes[4].y0

				// set color
				if(this.flag.includes('1')) {
					color = 'rgb(255, 0, 0)'
				}
				else if(this.flag.includes('2')) {
					color = 'rgb(245, 164, 66)'
				}
			}
			else if(this.flag.includes('IRP')) {
				// LES lower
				new_y0 = this.layout.shapes[4].y0

				// LES upper
				new_y1 = this.layout.shapes[5].y0

				// set color
				if(this.flag.includes('1')) {
					color = 'rgb(135, 66, 245)'
				}
				else if(this.flag.includes('2')) {
					color = 'rgb(245, 66, 239)'
				}
			}
			else if(this.flag.includes('SLR')) {
				// SLR_h_upper
				new_y0 = this.layout.shapes[20].y0

				new_y1 = Math.max(...this.catheter_scale)
			}
			
			var new_line = {
				type: 'line',
				x0: this.mouse_x,
				y0: new_y0,
				x1: this.mouse_x,
				y1: new_y1,
				line: {
					color: color,
					width: 3,
					dash: 'solid'
				},
				draw_type: 'vertical',
				flag: this.flag,
				is_draw: true,
			}
			if(this.flag.includes('MRS')) {
				this.layout.shapes[this.MRS_mapping_flag[this.flag]] = new_line
			}
			else if(this.flag.includes('SLR')) {
				this.layout.shapes[this.SLR_mapping_flag[this.flag]] = new_line
			}
			
			this.$refs.plotly.relayout(this.layout)
			this.$emit('update_draw_btn_status', {'flag': this.flag, 'status': true})
			this.get_current_polys()
			this.drawing=false

			if(this.flag.includes('MRS')) {
				// line index [3, 4, 6, 7] for DCI1
				this.DCI_computable = this.check_metrics_computable([3, 4, 6, 7], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 1, 'DCI': this.compute_DCI([3, 4, 6, 7])})
				}

				// line index [3, 4, 8, 9] for DCI2
				this.DCI_computable = this.check_metrics_computable([3, 4, 8, 9], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 2, 'DCI': this.compute_DCI([3, 4, 8, 9])})
				}

				// line index [4, 5, 10, 11] for IRP1
				this.IRP_computable = this.check_metrics_computable([4, 5, 10, 11], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 1, 'IRP': this.compute_IRP([4, 5, 10, 11])})
				}

				// line index [4, 5, 12, 13] for IRP2
				this.IRP_computable = this.check_metrics_computable([4, 5, 12, 13], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 2, 'IRP': this.compute_IRP([4, 5, 12, 13])})
				}
			}
			else if(this.flag.includes("SLR")) {
				var pressure_lst=[]
				this.abdominal_baseline_computable = this.check_metrics_computable([22, 23, 24], this.flag)
				if(this.abdominal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "abdominal_baseline", "value": pressure_lst})
				}

				this.abdominal_SLR_computable = this.check_metrics_computable([22, 24, 25], this.flag)
				if(this.abdominal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "abdominal_SLR", "value": pressure_lst})
				}

				this.esophageal_baseline_computable = this.check_metrics_computable([20, 21, 23, 24], this.flag)
				if(this.esophageal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "esophageal_baseline", "value": pressure_lst})
				}

				this.esophageal_SLR_computable = this.check_metrics_computable([20, 21, 24, 25], this.flag)
				if(this.esophageal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "esophageal_SLR", "value": pressure_lst})
				}
			}

			this.draw_type=''
			this.flag = ''
		},
		// draw_box_first() {
		// 	this.layout.shapes[2].x0 = this.mouse_x
		// 	this.layout.shapes[2].y0 = this.mouse_y
		// 	this.layout.shapes[2].x1 = this.mouse_x
		// 	this.layout.shapes[2].y1 = this.mouse_y
		// 	this.$refs.plotly.relayout(this.layout)
		// 	this.box_first_point = true
		// },
		// draw_box_second() {
		// 	this.layout.shapes[2].x1 = this.mouse_x
		// 	this.layout.shapes[2].y1 = this.mouse_y
		// 	this.box_first_point = false

		// 	var new_box = {
		// 		type: 'rect',
		// 		x0: this.layout.shapes[2].x0,
		// 		y0: this.layout.shapes[2].y0,
		// 		x1: this.layout.shapes[2].x1,
		// 		y1: this.layout.shapes[2].y1,
		// 		line: {
		// 			color: 'rgb(255, 255, 255)',
		// 			width: 3,
		// 			dash: 'solid'
		// 		},
		// 		flag: this.flag,
		// 		draw_type: 'box',
		// 		is_draw: true,
		// 	}
		// 	this.layout.shapes.push(new_box)
		// 	this.$refs.plotly.relayout(this.layout)
		// 	this.box_count += 1
		// 	this.draw_type = ''
		// 	if(this.flag.slice(4, 7) == 'DCI') {
		// 		// console.log(this.layout.shapes)
		// 		this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
		// 	}
		// 	this.IRP_computable = this.check_metrics_computable('IRP', this.flag)
		// 	if(this.IRP_computable) {
		// 		this.$emit("get_IRP", {'flag': this.flag, 'IRP': this.compute_IRP()})
		// 	}
		// 	this.$emit('update_draw_btn_status', {'flag': this.flag, 'status': true})
		// 	this.get_current_polys()
		// },
		hover_horizontal() {
			if(this.flag.includes('MRS')) {
				// 不確定要不要換成用來hover的線
				if(this.rehorizontal) {
					if(this.flag == 'MRS_TZ') {
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_right']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_right']].y0 = this.mouse_y
					}
					else if(this.flag == 'MRS_LES_upper') {
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI1_right']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_DCI2_right']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_right']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_left']].y0 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_right']].y0 = this.mouse_y
					}
					else if(this.flag == 'MRS_LES_lower') {
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP1_right']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_left']].y1 = this.mouse_y
						this.layout.shapes[this.MRS_mapping_flag['MRS_IRP2_right']].y1 = this.mouse_y
					}
				}

				// 不確定要不要加，等等試試看
				//this.$refs.plotly.relayout(this.layout)

				// line index [3, 4, 6, 7] for DCI1
				this.DCI_computable = this.check_metrics_computable([3, 4, 6, 7], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 1, 'DCI': this.compute_DCI([3, 4, 6, 7])})
				}

				// line index [3, 4, 8, 9] for DCI2
				this.DCI_computable = this.check_metrics_computable([3, 4, 8, 9], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 2, 'DCI': this.compute_DCI([3, 4, 8, 9])})
				}

				// line index [4, 5, 10, 11] for IRP1
				this.IRP_computable = this.check_metrics_computable([4, 5, 10, 11], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 1, 'IRP': this.compute_IRP([4, 5, 10, 11])})
				}

				// line index [4, 5, 12, 13] for IRP2
				this.IRP_computable = this.check_metrics_computable([4, 5, 12, 13], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 2, 'IRP': this.compute_IRP([4, 5, 12, 13])})
				}
			}
			else if(this.flag.includes('HH')) {
				this.LES_CD_computable = this.check_metrics_computable([16, 17, 19], this.flag)
				if(this.LES_CD_computable) {
					var lst = this.compute_LES_CD([16, 17, 19])
					this.$emit("get_LES_CD", {'LES_CD': lst[0], 'seperate': lst[1]})
				}
			}
			else if(this.flag.includes("SLR")) {
				var pressure_lst = []
				this.abdominal_baseline_computable = this.check_metrics_computable([22, 23, 24], this.flag)
				if(this.abdominal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "abdominal_baseline", "value": pressure_lst})
				}

				this.abdominal_SLR_computable = this.check_metrics_computable([22, 24, 25], this.flag)
				if(this.abdominal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "abdominal_SLR", "value": pressure_lst})
				}

				this.esophageal_baseline_computable = this.check_metrics_computable([20, 21, 23, 24], this.flag)
				if(this.esophageal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "esophageal_baseline", "value": pressure_lst})
				}

				this.esophageal_SLR_computable = this.check_metrics_computable([20, 21, 24, 25], this.flag)
				if(this.esophageal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "esophageal_SLR", "value": pressure_lst})
				}
			}

			this.layout.shapes[0].y0 = this.mouse_y
			this.layout.shapes[0].y1 = this.mouse_y
		},
		hover_vertical() {
			var new_y0 = 0
			var new_y1 = 0

			// 設定DCI與IRP的兩端點至水平線
			if(this.flag.includes('DCI')) {
				// TZ
				new_y0 = this.layout.shapes[3].y0

				// LES upper
				new_y1 = this.layout.shapes[4].y0
			}
			else if(this.flag.includes('IRP')) {
				// LES lower
				new_y0 = this.layout.shapes[4].y0

				// LES upper
				new_y1 = this.layout.shapes[5].y0
			}
			else if(this.flag.includes('SLR')) {
				// SLR_h_upper
				new_y0 = this.layout.shapes[20].y0

				new_y1 = Math.max(...this.catheter_scale)
			}
			
			if(this.flag.includes('MRS')) {
				// line index [3, 4, 6, 7] for DCI1
				this.DCI_computable = this.check_metrics_computable([3, 4, 6, 7], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 1, 'DCI': this.compute_DCI([3, 4, 6, 7])})
				}

				// line index [3, 4, 8, 9] for DCI2
				this.DCI_computable = this.check_metrics_computable([3, 4, 8, 9], this.flag)
				if(this.DCI_computable) {
					this.$emit("get_DCI", {'seq': 2, 'DCI': this.compute_DCI([3, 4, 8, 9])})
				}

				// line index [4, 5, 10, 11] for IRP1
				this.IRP_computable = this.check_metrics_computable([4, 5, 10, 11], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 1, 'IRP': this.compute_IRP([4, 5, 10, 11])})
				}

				// line index [4, 5, 12, 13] for IRP2
				this.IRP_computable = this.check_metrics_computable([4, 5, 12, 13], this.flag)
				if(this.IRP_computable) {
					this.$emit("get_IRP", {'seq': 2, 'IRP': this.compute_IRP([4, 5, 12, 13])})
				}
			}
			else if(this.flag.includes("SLR")) {
				var pressure_lst = []
				this.abdominal_baseline_computable = this.check_metrics_computable([22, 23, 24], this.flag)
				if(this.abdominal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "abdominal_baseline", "value": pressure_lst})
				}

				this.abdominal_SLR_computable = this.check_metrics_computable([22, 24, 25], this.flag)
				if(this.abdominal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("abdominal", [22, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "abdominal_SLR", "value": pressure_lst})
				}

				this.esophageal_baseline_computable = this.check_metrics_computable([20, 21, 23, 24], this.flag)
				if(this.esophageal_baseline_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 23, 24])
					this.$emit("get_SLR_metrics", {"type": "esophageal_baseline", "value": pressure_lst})
				}

				this.esophageal_SLR_computable = this.check_metrics_computable([20, 21, 24, 25], this.flag)
				if(this.esophageal_SLR_computable) {
					pressure_lst = this.compute_SLR_metrics("esophageal", [20, 21, 24, 25])
					this.$emit("get_SLR_metrics", {"type": "esophageal_SLR", "value": pressure_lst})
				}
			}
			
			this.layout.shapes[1].y0 = new_y0
			this.layout.shapes[1].y1 = new_y1
			this.layout.shapes[1].x0 = this.mouse_x
			this.layout.shapes[1].x1 = this.mouse_x
		},
		// hover_box() {
		// 	this.layout.shapes[2].x1 = this.mouse_x
		// 	this.layout.shapes[2].y1 = this.mouse_y
		// 	this.$refs.plotly.relayout(this.layout)
		// 	if(this.flag.slice(4, 7) == 'DCI') {
		// 		// console.log(this.layout.shapes)
		// 		this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
		// 	}
			
		// },
		leave_handler() {
			this.layout.shapes[0].y0 = 0
			this.layout.shapes[0].y1 = 0
			this.layout.shapes[1].x0 = 0
			this.layout.shapes[1].x1 = 0
			if(!this.box_first_point){
				this.layout.shapes[2].x0 = 0
				this.layout.shapes[2].y0 = 0
				this.layout.shapes[2].x1 = 0
				this.layout.shapes[2].y1 = 0
			}
		},

		clear_target(idx_lst) {
			var flag = this.layout.shapes[idx_lst[0]]['flag']
			for(var i=0; i<idx_lst.length; i++) {
				this.layout.shapes[idx_lst[i]] = initial_line
				if([3, 4, 6, 7].includes(idx_lst[i])) {
					this.$emit("get_DCI", {'seq': 1, 'DCI': 0})
				}
				if([3, 4, 8, 9].includes(idx_lst[i])) {
					this.$emit("get_DCI", {'seq': 2, 'DCI': 0})
				}
				if([4, 5, 10, 11].includes(idx_lst[i])) {
					this.$emit("get_IRP", {'seq': 1, 'IRP': 0})
				}
				if([4, 5, 12, 13].includes(idx_lst[i])) {
					this.$emit("get_IRP", {'seq': 2, 'IRP': 0})
				}
				if([16, 17, 19].includes(idx_lst[i])) {
					this.$emit('get_LES_CD', {'LES_CD': 0, 'seperate': false})
				}
				//123
				if([22, 23, 24].includes(idx_lst[i])) {
					this.$emit('get_SLR_metrics', {'type': 'abdominal_baseline', 'value': [0, 0]})
				}
				if([22, 24, 25].includes(idx_lst[i])) {
					this.$emit('get_SLR_metrics', {'type': 'abdominal_SLR', 'value': [0, 0]})
				}
				if([20, 21, 23, 24].includes(idx_lst[i])) {
					this.$emit('get_SLR_metrics', {'type': 'esophageal_baseline', 'value': [0, 0]})
				}
				if([20, 21, 24, 25].includes(idx_lst[i])) {
					this.$emit('get_SLR_metrics', {'type': 'esophageal_SLR', 'value': [0, 0]})
				}
			}
			
			this.$refs.plotly.relayout(this.layout)
			this.get_current_polys()
			this.$emit('update_draw_btn_status', {'flag': flag, 'status': false})
		},
		clear_all(test) {
			var flags = []
			if(test=='MRS') {
				flags = Object.keys(this.MRS_mapping_flag)

				for(var i=0; i<flags.length; i++) {
					// set horizontal line can draw but vertical line cant
					if(i<3) {
						this.$emit('update_draw_btn_status', {'flag': flags[i], 'status': false})
					}
					else {
						this.$emit('update_draw_btn_status', {'flag': flags[i], 'status': true})
					}
					
					// 0 1 2 for hover line
					this.layout.shapes[i+3] = initial_line
				}
				// this.$refs.plotly.relayout(this.layout)
				this.get_current_polys()
			}
			else if(test=='HH') {
				flags = Object.keys(this.HH_mapping_flag)
				for(i=0; i<flags.length; i++) {
					this.$emit('update_draw_btn_status', {'flag': flags[i], 'status': false})

					// 0 1 2 for hover line 3~13 for MRS lines
					this.layout.shapes[i+14] = initial_line
				}
			}
			else if(test=='SLR') {
				flags = Object.keys(this.SLR_mapping_flag)

				for(i=0; i<flags.length; i++) {
					// set horizontal line can draw but vertical line cant
					if(i<2) {
						this.$emit('update_draw_btn_status', {'flag': flags[i], 'status': false})
					}
					else {
						this.$emit('update_draw_btn_status', {'flag': flags[i], 'status': true})
					}
					
					// 0 1 2 for hover line
					this.layout.shapes[i+3] = initial_line
				}
				// this.$refs.plotly.relayout(this.layout)
				this.get_current_polys()
			}
		},
		get_current_polys() {
			var polys = this.layout.shapes.slice(3, this.layout.shapes.length)
			polys = polys.filter(function(obj) {
				return obj['is_draw'] == true
			})
			this.$emit('get_polys', polys)
		},

		check_metrics_computable(metric_line_idx, current_flag) {
			var current_line_idx = 0
			
			if(current_flag.includes('MRS')) {
				current_line_idx = this.MRS_mapping_flag[current_flag]
			}
			else if(current_flag.includes('HH')) {
				current_line_idx = this.HH_mapping_flag[current_flag]
			}
			else if(current_flag.includes('SLR')) {
				current_line_idx = this.SLR_mapping_flag[current_flag]
			}

			if(metric_line_idx.includes(current_line_idx)) {
				var temp = []
				for(var i=0; i<metric_line_idx.length; i++) {
					if(metric_line_idx[i] != current_line_idx) {
						temp.push(this.layout.shapes[metric_line_idx[i]]['is_draw'])
					}
				}

				temp = temp.filter(function(val) {
					return val == false
				})
				if(temp.length == 0) {
					return true
				}
				return false
			}
			return false

		},
		compute_LES_CD(line_idx) {
			var param_lst = []
			for(var i=0; i<line_idx.length; i++) {
				if(this.HH_mapping_flag[this.flag] == line_idx[i]) {
					param_lst.push(this.mouse_y)
				}
				else {
					param_lst.push(this.layout.shapes[line_idx[i]].y0)
				}
			}

			var les_upper = param_lst[0]
			var les_lower = param_lst[1]
			var cd = param_lst[2]

			// *10 /10 for 取到小數點第一位
			var val = Math.abs(Math.round((cd - (les_upper + les_lower)/2) * 10) / 10)
			var seperate = true

			if(val>1) {
				seperate = true
			}
			else {
				seperate = false
			}

			return [val, seperate]
		},

		compute_IRP(line_idx) {
			var flags = Object.keys(this.MRS_mapping_flag)

			// -3 : keys的index從0開始，但傳進來的line_idx的前3個是用來hover的線，所以要-3
			// 前兩個是水平線，後兩個是垂直線
			var x_line_lst = [flags[line_idx[2]-3], flags[line_idx[3]-3]]
			var y_line_lst = [flags[line_idx[0]-3], flags[line_idx[1]-3]]

			var IRP_raw_data = this.get_raw_data("IRP", x_line_lst, y_line_lst)
			
			var x_lst = this.get_xy_lst("MRS", x_line_lst, y_line_lst)[0]
			
			var max_x = this.get_x_index(Math.max(...x_lst), 'max')
			var min_x = this.get_x_index(Math.min(...x_lst), 'min')

			// 1 for p2 sensor
			var gastric_pressure = this.raw_data[0].slice(min_x, max_x+1)

			for(var i=0; i<IRP_raw_data.length; i++) {
				for(var j=0; j<IRP_raw_data[0].length; j++) {
					IRP_raw_data[i][j] -= gastric_pressure[j]
				}
			}

			var IRP = 0
			
			var transpose = IRP_raw_data => IRP_raw_data[0].map((x,i) => IRP_raw_data.map(x => x[i]))
		
			IRP_raw_data = transpose(IRP_raw_data)
			IRP_raw_data = IRP_raw_data.sort(function(a, b) { 
				return Math.max(...a) - Math.max(...b)
			});

			// 4(sec) * 20(sample rate) = 80(samples)
			for(i=0; i<80; i++) {
				// for(var j=0; j<IRP_raw_data[i].length; j++) {
				// 	IRP += IRP_raw_data[i][j]
				// }
				
				IRP += Math.max(...IRP_raw_data[i])
			}
			console.log(Math.max(...IRP_raw_data[79]))
			console.log('sum of IRP : ', IRP)
			var denominator = 80 
			//  * IRP_raw_data[0].length
			IRP /= denominator

			return IRP
		},
		
		compute_DCI(line_idx) {
			var flags = Object.keys(this.MRS_mapping_flag)
			// -3 : keys的index從0開始，但傳進來的line_idx的前3個是用來hover的線，所以要-3
			// 前兩個是水平線，後兩個是垂直線
			var x_line_lst = [flags[line_idx[2]-3], flags[line_idx[3]-3]]
			var y_line_lst = [flags[line_idx[0]-3], flags[line_idx[1]-3]]


			var DCI_raw_data = this.get_raw_data("DCI", x_line_lst, y_line_lst)
			console.log(DCI_raw_data)
			var over20 = 0
			var ct = 0
			var ct2 = 0
			var duration = 0
			var DCI = 0


			// for(var i=0; i<DCI_raw_data.length; i++) {
			// 	for(var j=0; j<DCI_raw_data[i].length; j++) {
			// 		if(DCI_raw_data[i][j] > 40) {
			// 			over20 += DCI_raw_data[i][j]
			// 		}
			// 		ct+=1
			// 	}
			// }

			// var temp = this.get_xy_lst(x_line_lst, y_line_lst)
			// var x_lst = temp[0]
			// var y_lst = temp[1]
			// duration = Math.abs(x_lst[0] - x_lst[1])
			// var length = Math.abs(y_lst[0] - y_lst[1])
			// DCI = (over20 / ct) * length * duration

			var DCI_old=0
			// new DCI
			duration = 0.05
			var length_lst = []
			var y_lst = this.get_xy_lst("MRS", x_line_lst, y_line_lst)[1]
			var max_y = this.get_y_index(Math.max(...y_lst), 'max')
			var min_y = this.get_y_index(Math.min(...y_lst), 'min')

			for(var i=max_y-1; i<=min_y; i++) {
				length_lst.push((this.catheter_scale[i] - this.catheter_scale[i+1]) * 0.5)
			}
			console.log(length_lst)
			for(i=0; i<DCI_raw_data.length; i++) {
				console.log(DCI_raw_data[i].length)
				var len = length_lst[i] + length_lst[i+1]
				for(var j=0; j<DCI_raw_data[i].length-1; j++) {
					if(DCI_raw_data[i][j] > 20) {
						over20 = DCI_raw_data[i][j]
						over20 -= 20
						DCI_old += over20 * duration * len
						ct+=1
					}
					if(DCI_raw_data[i][j] > 20 && DCI_raw_data[i][j+1] > 20) {
						var mean_p = (DCI_raw_data[i][j] + DCI_raw_data[i][j+1]) / 2
						mean_p -= 20
						DCI += mean_p * duration * len
						ct2+=1
					}
				}

			}


			// console.log('s_len : ', DCI_raw_data[0].length)
			// console.log('s_dur : ', DCI_raw_data.length)
			// console.log("Amplitude : ", over20 / ct)
			console.log('ct : ', ct)
			console.log('ct2 : ', ct2)
			console.log('old_DCI: ', DCI_old)

			// var temp = this.get_xy_lst(x_line_lst, y_line_lst)
			// var x_lst = temp[0]
			// var y_lst = temp[1]

			// var duration = Math.abs(x_lst[0] - x_lst[1])
			// var length = Math.abs(y_lst[0] - y_lst[1])

			// var DCI = Math.floor((over20 / ct) * length * duration)
			// console.log('x0 : ', x_lst[0], 'x1 : ', x_lst[1])
			// console.log('y0 : ', y_lst[0], 'y1 : ', y_lst[1])
			// console.log('new length : ', length)
			// console.log('new duration : ', duration)
			
			DCI = Math.floor(DCI)

			return DCI
		},

		get_raw_data(test, x_line_lst, y_line_lst) {
			// raw_data[0] 是從壓力圖下面開始， raw_data[length] 是 0 公分位置處
			var temp = []
			if(test == "abdominal" || test=="esophageal") {
				temp = this.get_xy_lst("SLR", x_line_lst, y_line_lst)
			} else {
				temp = this.get_xy_lst("MRS", x_line_lst, y_line_lst)
			}
			
			var x_lst = temp[0]
			var y_lst = temp[1]

			// max_x、min_x、max_y、min_y 皆為catheter scale 的 index
			var max_x = this.get_x_index(Math.max(...x_lst), 'max')
			var min_x = this.get_x_index(Math.min(...x_lst), 'min')
			var min_y = 0
			var max_y = 0

			if(test == "abdominal") {
				min_y = this.get_y_index(y_lst[0], 'min')
				max_y = 0 // abodminal的下界是壓力圖的最下面

			} else {
				min_y = this.get_y_index(Math.min(...y_lst), 'min') // 最上面，index較大
				max_y = this.get_y_index(Math.max(...y_lst), 'max') // 最下面，index較小
			}

			var return_raw_data = []
				
			// 從max開始，因為坐標軸有reversed過
			for(var i=max_y; i<=min_y; i++) {
				return_raw_data.push(this.raw_data[i].slice(min_x, max_x+1))
			}

			// console.log('DCI', DCI_data)
			return return_raw_data
			
		},

		// 將mouse位置映射到資料點的index
		get_y_index(y, type) {
			for(var i=0; i<this.catheter_scale.length; i++) {
				if(this.catheter_scale[i] <= y) {
					if(type == 'max') {
						return i
					}
					else {
						return i-1
					}
				}
			}
		},

		// 將mouse位置映射到資料點的index
		get_x_index(x, type) {
			for(var i=0; i<this.time_scale.length; i++) {
				if(this.time_scale[i] >= x) {
					if(type == 'max') {
						return i-1
					}
					else {
						return i
					}
				}
			}
		},

		// 取得4個邊界確切的位置
		get_xy_lst(test, x_line_lst, y_line_lst) {
			var x_lst = []
			var y_lst = []

			for(var i=0; i<x_line_lst.length; i++) {
				if(this.flag == x_line_lst[i]) {
					x_lst.push(this.mouse_x)
				}
				else {
					if(test == "MRS") {
						x_lst.push(this.layout.shapes[this.MRS_mapping_flag[x_line_lst[i]]].x0)
					} else if(test == "SLR") {
						x_lst.push(this.layout.shapes[this.SLR_mapping_flag[x_line_lst[i]]].x0)
					}
					
				}
			}
			for(i=0; i<y_line_lst.length; i++) {
				if(this.flag == y_line_lst[i]) {
					y_lst.push(this.mouse_y)
				}
				else {
					if(test=="MRS") {
						y_lst.push(this.layout.shapes[this.MRS_mapping_flag[y_line_lst[i]]].y0)
					} else if(test == "SLR") {
						y_lst.push(this.layout.shapes[this.SLR_mapping_flag[y_line_lst[i]]].y0)
					}
				}
			}

			console.log(x_lst)
			console.log(y_lst)

			return [x_lst, y_lst]
		},

		// get 2d array max
		getMax(a){
			return Math.max(...a.map(e => Array.isArray(e) ? this.getMax(e) : e));
		},

		// get 2d array mean
		getMean(a) {
			var s = 0;
			for(var i=0; i<a.length; i++) {
				for(var j=0;j<a[i].length; j++) {
					s+=a[i][j]
				}
			}

			return s/(a.length * a[0].length)
		},

		compute_SLR_metrics(type, line_idx) {
			var flags = Object.keys(this.SLR_mapping_flag)
			var x_line_lst = []
			var y_line_lst = []
			if(type == "abdominal") {
				// -20 : keys的index從0開始，但傳進來的line_idx的前20個是用來hover的線以及其他test的線，所以要-20
				x_line_lst = [flags[line_idx[1]-20], flags[line_idx[2]-20]]
				y_line_lst = [flags[line_idx[0]-20]]
			} else {
				x_line_lst = [flags[line_idx[2]-20], flags[line_idx[3]-20]]
				y_line_lst = [flags[line_idx[0]-20], flags[line_idx[1]-20]]
			}
			var SLR_raw_data = this.get_raw_data(type, x_line_lst, y_line_lst)
			var max_pressure = this.getMax(SLR_raw_data)
			var mean_pressure = parseFloat(this.getMean(SLR_raw_data).toFixed(2))

			return [max_pressure, mean_pressure]
		}
	}
}


window.vue_instance = vue_instance
export default vue_instance

</script>

<style scoped>
.chart {
	height: 400px;
}

#btn_container {
	display: block
}


</style>