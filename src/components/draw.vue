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
			<button style="width: 100px; height: 100px" @click="show_pic"> complete </button>
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
	props:['raw_data', 'x_size', 'y_size'],
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
			data: [{
				z: this.raw_data,
				x: this.x_size,
				y: [40, 35, 34, 33, 32, 31, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0], 
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
					x1: this.x_size,
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
					x0: 0 ,
					y0: 0,
					x1: 0 ,
					y1: this.y_size,
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
			height: 900,
			width: 1300,
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
					text: 'cm'
				}
			},
			xaxis:{
				title: {
					text: 'second'
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
			this.mouse_x = this.mouse_x.toFixed(1)
			this.mouse_y = this.mouse_y.toFixed(1)
		},
		click_handler(args) {
			if(this.if_vertical === true) {
				this.draw_vertical(args)
			}
			if(this.if_horizontal === true) {
				this.draw_horizontal(args)
			}
			if(this.if_box === true) {
				if(this.box_first_point) {
					this.draw_box_second(args)
				}
				else {
					this.draw_box_first(args)
				}
			}
		},
		hover_handler(args) {
			if(this.if_vertical === true) {
				this.hover_vertical(args)
			}
			if(this.if_horizontal === true) {
				this.hover_horizontal(args)
			}
			if(this.if_box === true && this.box_first_point) {
				this.hover_box(args)
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
				x1: this.x_size,
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
				y1: this.y_size,
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
		draw_box_first() {
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
		show_pic() {
			var pic_lst = this.layout.shapes.slice(3, this.layout.shapes.length)
			console.log(pic_lst)
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