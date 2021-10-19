<template>
    <div>
		<el-container style="margin:0%" >
			<el-main style="text-align: center;">
				<home_table :key="rerender"/>	
			</el-main>
		</el-container>	
	</div>
</template>

<script>
import home_table from '.././components/MRS_home_table'


export default {
    name: 'RDC',
    components: {
        home_table,
    },
    data() {
		return {
			rerender:0
		}
	},
	watch: {
        '$store.state.auth_app.login_name': function() {
			this.rerender+=1
        }
        
    }
}
</script>

<style scoped>

</style>