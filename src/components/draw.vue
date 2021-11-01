<template>
	<div>
		<div id='plt' @mouseleave="leave_handler">
			<VuePlotly id='plt2' ref="plotly"  :data="data" :layout="layout" :options='options' @click="click_handler"  @hover='hover_handler'/>
			<!--  @unhover="unhover_handler" -->
		</div>
		<div id="btn_container">
			<button style="width: 100px; height: 100px" @click="click_vertical" :disabled='vertical_count>=2'> vertical line </button>
			<button style="width: 100px; height: 100px" @click="click_horizontal" :disabled='horizontal_count>=2'> horizontal line </button>
			<button style="width: 100px; height: 100px" @click="click_box" :disabled='box_count>=2'> box </button>
			<button style="width: 100px; height: 100px" @click="clear_all_line" :disabled='vertical_count == 0 && horizontal_count == 0'> clear all </button>
			<button style="width: 100px; height: 100px" @click="clear_last_line" :disabled='vertical_count == 0 && horizontal_count == 0'> clear last </button>
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
			if_horizontal: false,
			if_vertical: false,
			if_box: false,
			vertical_count: 0,
			horizontal_count: 0,
			box_count: 0,
			data: [{
				z: this.raw_data,
				x: this.x_size,
				y: this.y_size,
				type: 'contour',
				line: {
					color: 'black',
				}
			}],
			layout: {
				title: 'Setting the X and Y Coordinates in a Contour Plot',
				shapes:[{
					// horizontal initial hover line
					type: 'line',
					x0: 0,
					y0: 0,
					x1: this.x_size,
					y1: 0,
					line: {
						color: 'rgba(50, 171, 96, 0.3)',
						width: 4,
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
						color: 'rgba(50, 171, 96, 0.3)',
						width: 4,
						dash: 'solid'
					},
					flag: 'vertical',
				},]
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

	},
	methods: {
		click_handler(args) {
			if(this.if_vertical === true) {
				this.draw_vertical(args)
			}
			if(this.if_horizontal === true) {
				this.draw_horizontal(args)
			}
			if(this.if_box === true) {
				this.draw_box(args)
			}
		},
		hover_handler(args) {
			if(this.if_vertical === true) {
				this.hover_vertical(args)
			}
			if(this.if_horizontal === true) {
				this.hover_horizontal(args)
			}
			if(this.if_box === true) {
				this.hover_box(args)
			}
		},
		update_chart() {
			window.layout = this.layout
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
			this.update_chart()
		},
		click_vertical() {
			this.if_vertical = true
			this.if_horizontal = false
			this.if_box = false
			this.update_chart()
		},
		click_box() {
			console.log('click box activate')
		},
		draw_horizontal(args) {
			var new_line = {
				type: 'line',
				x0: 0,
				y0: args['points'][0]['pointIndex'][0],
				x1: this.x_size,
				y1: args['points'][0]['pointIndex'][0],
				line: {
					color: 'rgba(50, 171, 96)',
					width: 4,
					dash: 'solid'
				},
				flag: 'horizontal',
			}
			this.layout.shapes.push(new_line)
			this.horizontal_count += 1
			if(this.horizontal_count == 2) {
				this.reset_click_set()
			}
			this.update_chart()
		},
		draw_vertical(args) {
			var new_line = {
				type: 'line',
				x0: args['points'][0]['pointIndex'][1] ,
				y0: 0,
				x1: args['points'][0]['pointIndex'][1] ,
				y1: this.y_size,
				line: {
					color: 'rgba(50, 171, 96)',
					width: 4,
					dash: 'solid'
				},
				flag: 'vertical',
			}
			this.layout.shapes.push(new_line)
			this.vertical_count += 1
			if(this.vertical_count == 2) {
				this.reset_click_set()
			}
			this.update_chart()
		},
		hover_horizontal(args) {
			this.layout.shapes[0].y0 = args['points'][0]['pointIndex'][0]
			this.layout.shapes[0].y1 = args['points'][0]['pointIndex'][0]
			this.update_chart()
		},
		hover_vertical(args) {
			this.layout.shapes[1].x0 = args['points'][0]['pointIndex'][1]
			this.layout.shapes[1].x1 = args['points'][0]['pointIndex'][1]
			this.update_chart()
		},
		leave_handler() {
			console.log('leave handler')
			this.layout.shapes[0].y0 = 0
			this.layout.shapes[0].y1 = 0
			this.layout.shapes[1].x0 = 0
			this.layout.shapes[1].x1 = 0
			this.update_chart()
		},
		clear_all_line() {
			this.layout.shapes.splice(2, this.layout.shapes.length-2)
			this.vertical_count = 0
			this.horizontal_count = 0
			this.update_chart()
		},
		clear_last_line() {
			var delete_line = this.layout.shapes.splice(-1, 1)[0]
			if(delete_line.flag == 'horizontal') {
				this.horizontal_count -= 1
			}
			else {
				this.vertical_count -= 1
			}
			console.log(this.horizontal_count, this.vertical_count)
			this.update_chart()
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