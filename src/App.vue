<template>
	<div id="app">
		<!-- nva bar寫一次就好 -->
		<el-container style="margin:0%">
			<el-header style="background: #606A78; height: 80px; padding:10px; margin:0%; ">
				<nav_bar :select_index="1"/>
			</el-header>
		</el-container>	
		<!-- router view -->
		<router-view/>
		<!-- <WS_10></WS_10> -->
	</div>
</template>

<script>
import nav_bar from './components/nav.vue'
// import WS_10 from './views/WS_10.vue'

export default {
	name: 'App',
	components: {
		nav_bar,
		// WS_10
	},
	methods:{
		
	},
	emit: []
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
