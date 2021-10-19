<template>
	<div class="home">
		<el-container style="margin:0%" >
			<el-main style="text-align: center;">
				<home_table :key="rerender"/>	
			</el-main>
		</el-container>	
	</div>
</template>

<script>

import home_table from '../components/home_table.vue'

export default {
	name: 'WS_10',
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

<style>
#app {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微軟雅黑",Arial,sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
