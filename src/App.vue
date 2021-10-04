<template>
	<div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welytftycome to Your Vue.js App"/>-->
    
		<el-container style="margin:0%">
			<el-header style="background: #606A78; height: 80px; padding:10px; margin:0%; ">
				<nav_bar proj_name="HRM_project"/>
			</el-header>
			<el-main style="text-align: center;">
				<main_table/>	
			</el-main>
			<el-footer>
				Footer
			</el-footer>
		</el-container>
    



	</div>
</template>

<script>
import nav_bar from './components/nav.vue'
import main_table from './components/home_table.vue'



export default {
	name: 'App',
	components: {
		nav_bar,
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
