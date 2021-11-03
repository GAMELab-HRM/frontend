<template>
	<div class="home">
		<el-container style="margin:0%" >
			<el-main style="text-align: center;">
				<basic_table :key="rerender" :main_table_data="main_table_data"/>	
			</el-main>
		</el-container>	
	</div>
</template>


<script>
import basic_table from '../components/basic_test_table.vue'
//import {main_table_data} from "@/utils/fakedata.js"
import {GetBasicTable} from "@/apis/table.js"
export default {
	name: 'basic_test',
	components: {
		basic_table,
	},
	data() {
		return {
			rerender:0,
			main_table_data:[]
		}
	},
	watch: {
        '$store.state.auth_app.login_name': function() {
			this.rerender+=1
        }
        
    },
	methods:{
		doctor_map: function(data){
			// mapping doctor name
			// 0 -> Dr. Lei
			// 1 -> Dr. Liang
			for(var i=0; i < data.length; i++) {
				if(data[i]['doctor_id'] == 0) {
					data[i]['doctor_id'] = 'Dr. Lei'
				}
				else {
					data[i]['doctor_id'] = 'Dr.Liang'
				}
			}
			return data
		},
	},
	created(){
		GetBasicTable().then((res)=>{
			let retv = res.data 
			console.log("call api [所有資料的table] successed!")
			console.log(retv)
			retv = this.doctor_map(retv)
			this.main_table_data = retv
		}).catch((err)=>{
			console.log("call api [所有資料的table] failed!")
			console.log(err)
		})

	}
}
</script>

<style>
#app {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微軟雅黑",Arial,sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
