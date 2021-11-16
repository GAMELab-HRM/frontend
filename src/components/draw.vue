<template>
	<div>
		<h2>x = {{mouse_x}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; y = {{mouse_y}}</h2>
		<div id='plt' @mouseleave="leave_handler" @mousemove="mousemove_handler">
			<VuePlotly id='plt2' ref="plotly"  :data="data" :layout="layout" :options='options' @click="click_handler"  @hover='hover_handler' />
		</div>
		<div id="btn_container">
			<button style="width: 100px; height: 100px" @click="click_vertical" :disabled='vertical_count>=2'> vertical line </button>
			<button style="width: 100px; height: 100px" @click="click_horizontal" :disabled='horizontal_count>=2'> horizontal line </button>
			<button style="width: 100px; height: 100px" @click="click_box" :disabled='box_count>=2'> box </button>
			<button style="width: 100px; height: 100px" @click="clear_all_line" :disabled='vertical_count == 0 && horizontal_count == 0 && box_count == 0'> clear all </button>
			<button style="width: 100px; height: 100px" @click="clear_last_line" :disabled='vertical_count == 0 && horizontal_count == 0 && box_count == 0'> clear last </button>
			<button style="width: 100px; height: 100px" @click="compute_4IRP">compute IRP*4</button>
			<button style="width: 100px; height: 100px" @click="compute_DCI">compute DCI</button>
			DCI : {{DCI}}
		</div>
	</div>
</template>

<script>

// import { Plotly } from 'vue-plotly'
import VuePlotly from "@statnett/vue-plotly";
// import Plotly2 from 'plotly.js'

window.VuePlotly = VuePlotly;

var vue_instance = {
	name: "draw",
	components: {
		VuePlotly,
	},
	props:['raw_data', 'time_scale', 'catheter_scale'],
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
			DCI: 0,
			data: [{
				z: this.raw_data,
				x: this.time_scale,
				y: this.catheter_scale, 
				// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ]
				// [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
				type: 'contour',
				contours:{
                    coloring:"heatmap"
                },
				line: {
					color: 'black',
				},
				colorscale:"Jet",
				// hoverinfo: 'none',
			}],
			layout: {
				title: 'Title',
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
				}]
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
			height: 750,
			width: 1100,
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
		console.log('created')

		this.$refs.plotly.relayout(update_layout)
	},
	methods: {
		mousemove_handler(evt){
			let bb = evt.target.getBoundingClientRect()
			this.mouse_x = this.$refs.plotly.$refs.container._fullLayout.xaxis.p2d(evt.clientX - bb.left)
			this.mouse_y = this.$refs.plotly.$refs.container._fullLayout.yaxis.p2d(evt.clientY - bb.top)
			this.mouse_x = this.mouse_x.toFixed(2)
			this.mouse_y = this.mouse_y.toFixed(2)
		},
		click_handler() {
			if(this.if_vertical === true) {
				this.draw_vertical()
			}
			if(this.if_horizontal === true) {
				this.draw_horizontal()
			}
			if(this.if_box === true) {
				if(this.box_first_point) {
					this.draw_box_second()
				}
				else {
					this.draw_box_first()
				}
			}
		},
		hover_handler() {
			if(this.if_vertical === true) {
				this.hover_vertical()
			}
			if(this.if_horizontal === true) {
				this.hover_horizontal()
			}
			if(this.if_box === true && this.box_first_point) {
				this.hover_box()
			}
		},
		reset_click_set() {
			this.if_vertical = false
			this.if_horizontal = false
			this.if_box = false
		},
		click_horizontal() {
			this.if_vertical = false
			this.if_horizontal = true
			this.if_box = false
		},
		click_vertical() {
			this.if_vertical = true
			this.if_horizontal = false
			this.if_box = false
		},
		click_box() {
			this.if_vertical = false
			this.if_horizontal = false
			this.if_box = true
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
				flag: 'horizontal',
			}
			this.layout.shapes.push(new_line)
			this.horizontal_count += 1
			if(this.horizontal_count == 2) {
				this.reset_click_set()
			}
		},
		draw_vertical() {
			var new_line = {
				type: 'line',
				x0: this.mouse_x,
				y0: 0,
				x1: this.mouse_x,
				y1: Math.max(...this.catheter_scale),
				line: {
					color: 'rgb(255, 255, 255)',
					width: 3,
					dash: 'solid'
				},
				flag: 'vertical',
			}
			this.layout.shapes.push(new_line)
			this.vertical_count += 1
			if(this.vertical_count == 2) {
				this.reset_click_set()
			}
		},
		draw_box_first(www) {
			this.layout.shapes[2].x0 = this.mouse_x
			this.layout.shapes[2].y0 = this.mouse_y
			this.layout.shapes[2].x1 = this.mouse_x
			this.layout.shapes[2].y1 = this.mouse_y
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
				flag: 'box',
			}

			this.DCI = this.compute_DCI()
			this.layout.shapes.push(new_box)
			this.box_count += 1
			if(this.box_count == 2) {
				this.reset_click_set()
			}

		},
		hover_horizontal() {
			this.layout.shapes[0].y0 = this.mouse_y
			this.layout.shapes[0].y1 = this.mouse_y
		},
		hover_vertical() {
			this.layout.shapes[1].x0 = this.mouse_x
			this.layout.shapes[1].x1 = this.mouse_x
		},
		hover_box() {
			this.layout.shapes[2].x1 = this.mouse_x
			this.layout.shapes[2].y1 = this.mouse_y
			this.DCI = this.compute_DCI()
		},
		leave_handler() {
			console.log('leave handler')
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
		clear_all_line() {
			this.layout.shapes.splice(3, this.layout.shapes.length-2)
			this.vertical_count = 0
			this.horizontal_count = 0
			this.box_count = 0
		},
		clear_last_line() {
			var delete_line = this.layout.shapes.splice(-1, 1)[0]
			if(delete_line.flag == 'horizontal') {
				this.horizontal_count -= 1
			}
			else if(delete_line.flag == 'vertical'){
				this.vertical_count -= 1
			}
			else{
				this.box_count -= 1
			}
		},
		compute_4IRP() {
			var IRP_raw_data = this.get_raw_data_4IRP()
			console.log(IRP_raw_data)
		},
		get_raw_data_4IRP() {
			var pic_lst = this.layout.shapes.slice(3, this.layout.shapes.length)
			var line_lst = [[], []]
			
			for(var i=0; i<pic_lst.length; i++) {
				if(pic_lst[i]['flag']=='horizontal') {
					line_lst[1].push(pic_lst[i]['y0'])
				}
				else if(pic_lst[i]['flag']=='vertical') {
					line_lst[0].push(pic_lst[i]['x0'])
				}
			}

			var max_x = Math.max(...line_lst[0])
			var min_x = Math.min(...line_lst[0])
			var max_y = Math.ceil(Math.max(...line_lst[1]))
			var min_y = Math.floor(Math.min(...line_lst[1]))

			max_y = this.get_y_index(max_y)
			min_y = this.get_y_index(min_y)

			var x_lst = []

			for(i=0; i<4; i++){
				x_lst.push(this.get_x_index(min_x + (max_x - min_x) * i * 0.25, 'min'))
			}
			x_lst.push(this.get_x_index(max_x, 'max'))

			var IRP_data = [[], [], [], []]

			// 從max開始，因為坐標軸有reversed過
			for(i=max_y; i<=min_y; i+=1) {
				for(var j=0, k=1; j<x_lst.length-1; j++, k++) {
					IRP_data[j].push(this.raw_data[i].slice(x_lst[j], x_lst[k]+1))
					
				}
			}

			return IRP_data
		},
		compute_DCI() {
			var DCI_raw_data = this.get_raw_data_DCI()
			var over20 = 0
			var ct = 0
			for(var i=0; i<DCI_raw_data.length; i++) {
				for(var j=0; j<DCI_raw_data[i].length; j++) {
					if(DCI_raw_data[i][j] >= 20) {
						over20 += DCI_raw_data[i][j]
						
					}
					ct+=1
				}
			}
			var DCI = Math.floor((over20 / ct) * DCI_raw_data.length * (DCI_raw_data[0].length / 20))
			console.log('Amplitude : ', (over20 / ct))
			console.log('length', DCI_raw_data.length)
			console.log('second', (DCI_raw_data[0].length / 20))
			
			return DCI
		},
		get_raw_data_DCI() {
			// var pic_lst = this.layout.shapes.slice(3, this.layout.shapes.length)
			// var box = pic_lst.filter(function(obj){
			// 	return obj['flag'] === 'box'
			// })
			// box = box[0]
			var box = this.layout.shapes[2]
			var max_x = this.get_x_index(parseInt(box['x1'], 10), 'max')
			var min_x = this.get_x_index(box['x0'], 'min')
			var min_y = this.get_y_index(box['y0'])
			var max_y = this.get_y_index(box['y1'])
			
			var DCI_data = []
			
			// 從max開始，因為坐標軸有reversed過
			for(var i=max_y; i<=min_y; i+=1) {
				DCI_data.push(this.raw_data[i].slice(min_x, max_x+1))
			}

			return DCI_data
		},

		get_y_index(y) {
			for(var i=0; i<this.catheter_scale.length; i++) {
				if(this.catheter_scale[i] <= y) {
					return i
				}
			}
		},

		get_x_index(x, type) {
			if(type == 'max') {
				x += 0.05
			}
			else if(type == 'min'){
				x -= 0.05
			}
			for(var i=0; i<this.time_scale.length; i++) {
				if(this.time_scale[i] >= x) {
					return i
				}
			}
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