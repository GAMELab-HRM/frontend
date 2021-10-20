<template>
    <div id="painting">
        <h2>按shift multi selected box </h2>
        <el-button @click="draw">draw hrm</el-button>
        <!-- <el-button @click="force_update">add rect</el-button> -->
        <Plotly :key="componentKey" @deselect="deselected_box"   @selected="select_event" @click="click_event" :data="data" :layout="layout" :display-mode-bar="true" :scrollZoom="true" :modeBarButtons="btn_list"></Plotly>
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
            test_load:true,
            componentKey:0,
            btn_list:[['zoom2d'],['zoomIn2d'],['zoomOut2d'],['select2d'],['autoScale2d'],['pan2d'],['toggleSpikelines']],
            data:[
                {
                    z: [],
                    x: [],
                    y: [],
                    type:"contour",
                    contours:{
                        coloring:"heatmap"
                    },
                    line:{
                        
                        
                    },
                    colorbar:{
                        bgcolor:"rgba(155, 102, 102, 1)"
                    },
                    //colorscale:"Jet",
                    colorscale:"Jet",
                    autocontour:false ,
                    showlegend:false,
                    
                }
            ],
            layout:{
                title: "HRM contours",
                margin:{
                    l:30,
                    r:30,
                    b:30,
                    t:30
                },
                xaxis:{
                
                },
                yaxis:{
                    
                },
                deep:true,
                shapes:[
                    {
                        type:'rect',
                        x0:0,
                        y0:0,
                        x1:1000,
                        y1:10
                    }
                    
                    
                ]
            },
            
        }
    },
    computed:{
        get_x_size(){
            return this.x_size
        },
        get_y_size(){
            return this.y_size
        }
    },
    methods:{
        draw(){
            console.log(this.x_size)
            console.log(this.y_size)
            this.data[0]['x'] = []
            this.data[0]['y'] = []
            this.data[0]['z'] = []
            for(let i = 0;i<this.x_size;i++){
                this.data[0]['x'].push(i)
            }
            for(let i = 0;i<this.y_size;i++){
                this.data[0]['y'].push(i)
            }
            this.data[0]['z'] = this.raw_data
        },
        toogle(d){
            console.log(d)
        },
        select_event(data){
            console.log("select toogle")
            console.log(data)
        },
        click_event(data){
            console.log("click toogle")
            console.log(data['points'][0]['x'])
            console.log(data['points'][0]['y'])
            
        },
        force_update(){
            this.layout['shapes'][0]['y1']-=1
            this.layout['title'] = "HRM"
            this.componentKey+=1
        },
        deselected_box(d){
            console.log("deselected toogle!")
            console.log(d)
        },


    }
}
</script>