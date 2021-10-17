<template>
    <div>
        <el-button @click="draw">draw hrm</el-button>
        <Plotly :data="data" :layout="layout" :display-mode-bar="true"></Plotly>
    </div>
</template>

<script>
import {Plotly} from 'vue-plotly'
export default {
    name:"paint",
    components:{
        Plotly,
    },
    props:["x_size", "y_size", "raw_data"],
    data(){
        return {
            data:[{
                z: [],
                x: [],
                y: [],
                type:"contour",
                contours:{
                    coloring:"heatmap"
                }
            }],
            layout:{
                title: "this is paint"
            }
        }
    },
    methods:{
        draw(){
            console.log(this.x_size)
            console.log(this.y_size)
            let x_list = []
            let y_list = []
            for(let i = 0;i<this.x_size;i++){
                x_list.push(i)
            }
            for(let i = 0;i<this.y_size;i++){
                y_list.push(i+1)
            }
            this.data[0]['x'] = x_list
            this.data[0]['y'] = y_list
            this.data[0]['z'] = this.raw_data
        }
    }
}
</script>