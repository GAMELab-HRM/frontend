<template>
	<div id="app">
		<!-- nva bat寫一次就好 -->
		<el-container style="margin:0%">
			<el-header style="background: #606A78; height: 80px; padding:10px; margin:0%; ">
				<nav_bar proj_name="HRM_project" :select_index="1"/>
			</el-header>
		</el-container>	

		<!-- router view -->
		<router-view/>
	</div>
</template>

<script>
import nav_bar from './components/nav.vue'
export default {
	name: 'App',
	components: {
		nav_bar,
		
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
