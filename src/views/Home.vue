<template>
	<div class="home">
		<el-container style="margin:0%" >
			<el-main style="text-align: center;">
				<main_table/>	
			</el-main>
		</el-container>	
	</div>
</template>

<script>

import main_table from '../components/home_table.vue'

export default {
	name: 'Home',
	components: {
		main_table,
	}
}
</script>

<style>
#app {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
