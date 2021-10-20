<template>
    <div>
		<el-container style="margin:0%" >
			<el-main style="text-align: center;">
				<home_table :key="rerender" :main_table_data="mrs_main_table_data" />	
			</el-main>
		</el-container>	
	</div>
</template>

<script>
import home_table from '.././components/MRS_home_table'
import {mrs_main_table_data} from "@/utils/fakedata.js"
export default {
    name: 'RDC',
    components: {
        home_table,
    },
    data() {
		return {
			rerender:0,
			mrs_main_table_data:0
		}
	},
	watch: {
        '$store.state.auth_app.login_name': function() {
			this.rerender+=1
        }
        
    },
	created(){
		// load mrs fakedata 
		this.mrs_main_table_data = mrs_main_table_data
	}
}
</script>

<style scoped>

</style>