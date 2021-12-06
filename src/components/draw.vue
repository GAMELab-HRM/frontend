<template>
	<div>
		<el-row>
			<el-col :span="15" :offset="5">
				<h1 style="font-size: 30px">x = {{mouse_x}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; y = {{mouse_y}}</h1>
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
	props:['raw_data', 'time_scale', 'catheter_scale', 'polys'],
	data() {
		return {
			mouse_x: 0,
			mouse_y: 0,
			if_horizontal: false,
			if_vertical: false,
			if_box: false,
			vertical_count: 0,
			horizontal_count: 0,
			box_count: 0,
			box_first_point: false,
			flag: '',
			draw_type:'',
			rehorizontal: false,
			DCI_computable: false,
			IRP_computable: false,
			plotly_style: '',
			MRS_mapping_flag: {
				'MRS_TZ': 3,
				'MRS_LES_upper': 4,
				'MRS_LES_lower': 5,
				"MRS_DCI_left": 6,
				'MRS_DCI_right': 7,
				'MRS_IRP_left': 8,
				'MRS_IRP_right': 9
			},
			data: [{
				z: this.raw_data,
				x: this.time_scale,
				y: this.catheter_scale, 
				type: 'contour',
				contours:{
                    coloring:"heatmap"
                },
				line: {
					color: 'black',
				},
				colorscale:"Jet",
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

					// for TZ
					initial_line,

					//for LES upper
					initial_line,

					//for Les lower
					initial_line,

					//for DCI left
					initial_line,

					//for DCI right
					initial_line,

					//for IRP left
					initial_line,

					//for IRP right
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
		for(var i=0; i<this.polys.length; i++) {
			this.$emit('update_draw_btn_status', {'flag': this.polys[i]['flag'], 'status': true})
		}
		for(i=0; i<this.polys.length; i++) {
			this.layout.shapes[this.MRS_mapping_flag[this.polys[i]['flag']]] = this.polys[i]
			if(this.polys[i]['draw_type'] == 'horizontal') {
				this.add_line_title(this.polys[i]['flag'], this.polys[i]['y0'])
			}
		}
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

			var new_line_title={
				x: [offset],
				y: [line_y-1],
				mode: 'text',
				text: [flag.slice(4, flag.length)],
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
		click_handler() {
			// for vertical line (DCI left、right, IRP left、right)
			for(var i=this.layout.shapes.length-1; i>5; i--) {
				if(this.mouse_x >= this.layout.shapes[i].x0 - 0.5 && this.mouse_x <= this.layout.shapes[i].x1 + 0.5 && this.mouse_y >= this.layout.shapes[i].y0 - 0.1 && this.mouse_y <= this.layout.shapes[i].y1 + 0.1) {
					this.flag = this.layout.shapes[i]['flag']
					this.draw_type = this.layout.shapes[i]['draw_type']
					this.clear_target([i])
					return
				}
			}

			// for horizontal line (TZ, LES upper、lower)
			for(i=5; i>2; i--) {
				if(this.mouse_x >= this.layout.shapes[i].x0 && this.mouse_x <= this.layout.shapes[i].x1 && this.mouse_y >= this.layout.shapes[i].y0-0.1 && this.mouse_y <= this.layout.shapes[i].y1+0.1) {
					this.flag = this.layout.shapes[i]['flag']
					this.draw_type = this.layout.shapes[i]['draw_type']
					this.delete_line_title(this.flag)
					this.clear_target([i])
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
			if(this.draw_type == 'box') {
				if(this.box_first_point) {
					this.draw_box_second()
				}
				else {
					this.draw_box_first()
				}
			}
		},
		hover_handler() {
			if(this.draw_type == 'vertical') {
				this.hover_vertical()
			}
			if(this.draw_type == 'horizontal') {
				this.hover_horizontal()
			}
			if(this.draw_type == 'box' && this.box_first_point) {
				this.hover_box()
			}
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
			this.layout.shapes[this.MRS_mapping_flag[this.flag]] = new_line

			if(this.rehorizontal) {
				if(this.flag == 'MRS_TZ') {
					this.layout.shapes[this.MRS_mapping_flag['MRS_DCI_left']].y0 = this.mouse_y
					this.layout.shapes[this.MRS_mapping_flag['MRS_DCI_right']].y0 = this.mouse_y
				}
				else if(this.flag == 'MRS_LES_upper') {
					this.layout.shapes[this.MRS_mapping_flag['MRS_DCI_left']].y1 = this.mouse_y
					this.layout.shapes[this.MRS_mapping_flag['MRS_DCI_right']].y1 = this.mouse_y
					this.layout.shapes[this.MRS_mapping_flag['MRS_IRP_left']].y0 = this.mouse_y
					this.layout.shapes[this.MRS_mapping_flag['MRS_IRP_right']].y0 = this.mouse_y
				}
				else if(this.flag == 'MRS_LES_lower') {
					this.layout.shapes[this.MRS_mapping_flag['MRS_IRP_left']].y1 = this.mouse_y
					this.layout.shapes[this.MRS_mapping_flag['MRS_IRP_right']].y1 = this.mouse_y
				}
			}

			this.$refs.plotly.relayout(this.layout)
			this.$emit('update_draw_btn_status', {'flag': this.flag, 'status': true, 'rehorizontal': this.rehorizontal})
			this.add_line_title(this.flag, this.mouse_y)
			this.get_current_polys()
			this.DCI_computable = this.check_metrics_computable('DCI', this.flag)
			if(this.DCI_computable) {
				this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
			}
			this.IRP_computable = this.check_metrics_computable('IRP', this.flag)
			if(this.IRP_computable) {
				this.$emit("get_IRP", {'flag': this.flag, 'IRP': this.compute_IRP()})
			}
			this.draw_type=''
			this.flag = ''
			this.rehorizontal = false
		},
		draw_vertical() {
			var new_y0 = 0
			var new_y1 = 0
			var color = ''

			if(this.flag.includes('DCI')) {
				// TZ
				new_y0 = this.layout.shapes[3].y0

				// LES upper
				new_y1 = this.layout.shapes[4].y0

				// set color
				color = 'rgb(255, 0, 0)'
			}
			else if(this.flag.includes('IRP')) {
				// LES lower
				new_y0 = this.layout.shapes[4].y0

				// LES upper
				new_y1 = this.layout.shapes[5].y0

				// set color
				color = 'rgb(136, 32, 240)'
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

			this.layout.shapes[this.MRS_mapping_flag[this.flag]] = new_line
			this.$refs.plotly.relayout(this.layout)
			this.$emit('update_draw_btn_status', {'flag': this.flag, 'status': true})
			this.get_current_polys()
			this.DCI_computable = this.check_metrics_computable('DCI', this.flag)
			if(this.DCI_computable) {
				this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
			}
			this.IRP_computable = this.check_metrics_computable('IRP', this.flag)
			if(this.IRP_computable) {
				this.$emit("get_IRP", {'flag': this.flag, 'IRP': this.compute_IRP()})
			}
			this.draw_type=''
			this.flag = ''
		},
		draw_box_first() {
			this.layout.shapes[2].x0 = this.mouse_x
			this.layout.shapes[2].y0 = this.mouse_y
			this.layout.shapes[2].x1 = this.mouse_x
			this.layout.shapes[2].y1 = this.mouse_y
			this.$refs.plotly.relayout(this.layout)
			this.box_first_point = true
		},
		draw_box_second() {
			this.layout.shapes[2].x1 = this.mouse_x
			this.layout.shapes[2].y1 = this.mouse_y
			this.box_first_point = false

			var new_box = {
				type: 'rect',
				x0: this.layout.shapes[2].x0,
				y0: this.layout.shapes[2].y0,
				x1: this.layout.shapes[2].x1,
				y1: this.layout.shapes[2].y1,
				line: {
					color: 'rgb(255, 255, 255)',
					width: 3,
					dash: 'solid'
				},
				flag: this.flag,
				draw_type: 'box',
				is_draw: true,
			}
			this.layout.shapes.push(new_box)
			this.$refs.plotly.relayout(this.layout)
			this.box_count += 1
			this.draw_type = ''
			if(this.flag.slice(4, 7) == 'DCI') {
				// console.log(this.layout.shapes)
				this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
			}
			this.IRP_computable = this.check_metrics_computable('IRP', this.flag)
			if(this.IRP_computable) {
				this.$emit("get_IRP", {'flag': this.flag, 'IRP': this.compute_IRP()})
			}
			this.$emit('update_draw_btn_status', {'flag': this.flag, 'status': true})
			this.get_current_polys()
		},
		hover_horizontal() {
			this.DCI_computable = this.check_metrics_computable('DCI', this.flag)
			if(this.DCI_computable) {
				this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
			}
			this.IRP_computable = this.check_metrics_computable('IRP', this.flag)
			if(this.IRP_computable) {
				this.$emit("get_IRP", {'flag': this.flag, 'IRP': this.compute_IRP()})
			}
			this.layout.shapes[0].y0 = this.mouse_y
			this.layout.shapes[0].y1 = this.mouse_y
		},
		hover_vertical() {
			var new_y0 = 0
			var new_y1 = 0

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
			this.DCI_computable = this.check_metrics_computable('DCI', this.flag)
			if(this.DCI_computable) {
				this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
			}
			this.IRP_computable = this.check_metrics_computable('IRP', this.flag)
			if(this.IRP_computable) {
				this.$emit("get_IRP", {'flag': this.flag, 'IRP': this.compute_IRP()})
			}
			this.layout.shapes[1].y0 = new_y0
			this.layout.shapes[1].y1 = new_y1
			this.layout.shapes[1].x0 = this.mouse_x
			this.layout.shapes[1].x1 = this.mouse_x
		},
		hover_box() {
			this.layout.shapes[2].x1 = this.mouse_x
			this.layout.shapes[2].y1 = this.mouse_y
			this.$refs.plotly.relayout(this.layout)
			if(this.flag.slice(4, 7) == 'DCI') {
				// console.log(this.layout.shapes)
				this.$emit("get_DCI", {'flag': this.flag, 'DCI': this.compute_DCI()})
			}
			
		},
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
				this.DCI_computable = this.check_metrics_computable('DCI', this.layout.shapes[idx_lst[i]]['flag'])
				if(!this.DCI_computable) {
					this.$emit("get_DCI", {'flag': this.flag, 'DCI': 0})
				}
				this.layout.shapes[idx_lst[i]] = initial_line
			}
			
			this.$refs.plotly.relayout(this.layout)
			this.get_current_polys()
			this.$emit('update_draw_btn_status', {'flag': flag, 'status': false})
		},
		clear_all() {
			var flags = Object.keys(this.MRS_mapping_flag)

			for(var i=0; i<flags.length; i++) {
				// horizontal line can draw but vertical line cant
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
			this.vertical_count = 0
			this.horizontal_count = 0
			this.box_count = 0
			this.get_current_polys()
		},
		clear_last() {
			var delete_line = this.layout.shapes.splice(-1, 1)[0]
			if(delete_line.draw_type == 'horizontal') {
				this.horizontal_count -= 1
			}
			else if(delete_line.draw_type == 'vertical'){
				this.vertical_count -= 1
			}
			else if(delete_line.draw_type == 'box') {
				this.box_count -= 1
				this.$emit('clear_last', delete_line.flag)
			}
			this.get_current_polys()
		},
		get_current_polys() {
			var polys = this.layout.shapes.slice(3, this.layout.shapes.length)
			polys = polys.filter(function(obj) {
				return obj['is_draw'] == true
			})
			this.$emit('get_polys', polys)
		},

		check_metrics_computable(metric, current_flag) {
			var DCI_line_idx = [3, 4, 6, 7]
			var IRP_line_idx = [4, 5, 8, 9]
			var current_line_idx = this.MRS_mapping_flag[current_flag]
			var metric_line_idx = []

			if(metric == 'DCI') {
				metric_line_idx = DCI_line_idx
			}
			else if(metric == 'IRP') {
				metric_line_idx = IRP_line_idx
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
		},

		compute_IRP() {
			var x_line_lst = ['MRS_IRP_left', 'MRS_IRP_right']
			var y_line_lst = ['MRS_LES_upper', 'MRS_LES_lower']

			var IRP_raw_data = this.get_raw_data(x_line_lst, y_line_lst)
			
			var x_lst = this.get_xy_lst(x_line_lst, y_line_lst)[0]
			
			var max_x = this.get_x_index(Math.max(...x_lst), 'max')
			var min_x = this.get_x_index(Math.min(...x_lst), 'min')

			// 1 for p2 sensor
			var gastric_pressure = this.raw_data[1].slice(min_x, max_x+1)

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
		
		compute_DCI() {
			var x_line_lst = ['MRS_DCI_left', 'MRS_DCI_right']
			var y_line_lst = ['MRS_TZ', 'MRS_LES_upper']

			var DCI_raw_data = this.get_raw_data(x_line_lst, y_line_lst)
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
			var y_lst = this.get_xy_lst(x_line_lst, y_line_lst)[1]
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

		get_raw_data(x_line_lst, y_line_lst) {
			// raw_data[0] 是從壓力圖下面開始， raw_data[length] 是 0 公分位置處

			var temp = this.get_xy_lst(x_line_lst, y_line_lst)
			var x_lst = temp[0]
			var y_lst = temp[1]

			// max_x、min_x、max_y、min_y 皆為catheter scale 的 index
			var max_x = this.get_x_index(Math.max(...x_lst), 'max')
			var min_x = this.get_x_index(Math.min(...x_lst), 'min')
			var max_y = this.get_y_index(Math.max(...y_lst), 'max')
			var min_y = this.get_y_index(Math.min(...y_lst), 'min')



			var return_raw_data = []
			
			// 從max開始，因為坐標軸有reversed過
			for(var i=max_y; i<=min_y; i++) {
				return_raw_data.push(this.raw_data[i].slice(min_x, max_x+1))
			}

			// console.log('DCI', DCI_data)
			return return_raw_data
		},

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

		get_xy_lst(x_line_lst, y_line_lst) {
			var x_lst = []
			var y_lst = []

			for(var i=0; i<x_line_lst.length; i++) {
				if(this.flag == x_line_lst[i]) {
					x_lst.push(this.mouse_x)
				}
				else {
					x_lst.push(this.layout.shapes[this.MRS_mapping_flag[x_line_lst[i]]].x0)
				}

				if(this.flag == y_line_lst[i]) {
					y_lst.push(this.mouse_y)
				}
				else {
					y_lst.push(this.layout.shapes[this.MRS_mapping_flag[y_line_lst[i]]].y0)
				}
			}

			return [x_lst, y_lst]
		},
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