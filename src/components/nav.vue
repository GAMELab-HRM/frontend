<template>
    <el-row>
        <el-col :xs="10" :sm="9" :md="8" :lg="6" :xl="5">
            <el-col :span="15">
                <img id="GAME_lab_logo" src=".././assets/Logo_GAME_Lab.png">
            </el-col>
            <el-col :span="9">
                <img id="HRM_logo" src=".././assets/HRM_logo.png">
            </el-col>
        </el-col>
        <el-col :xs="14" :sm="13" :md="16" :lg="18" :xl="19">
            <div id="dr_login_container">
                <el-dropdown @command="login">
                <el-button id="dr_login_btn" type="info" size='medium' icon="el-icon-s-custom" round=True v-bind:style="login_btn"> {{ login_status }} </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Dr. Ray" >Dr. Ray</el-dropdown-item>
                        <el-dropdown-item command="Dr. Liang">Dr. Liang</el-dropdown-item>
                        <el-dropdown-item command="Dr. Ray & Dr. Liang">Dr. Ray & Dr. Liang</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col> 
    </el-row>
    
    
    
</template>



<script>
export default {
    name: 'nav_bar',
    data() {
        return {
            login_status: "登入",
            login_btn: {
                borderColor: 'red',
                fontSize: '20px',
                borderWidth: '3px'
            },
        }
    },

    props: {
        proj_name: String
    },

    methods: {
        login: function(val, event) {
            console.log(event);
            this.login_status = val
            this.login_btn.borderColor = 'lightgreen'
        },
    }


}
</script>


<style scoped>

#GAME_lab_logo{
    width: 80%;
    margin-left: 0%,
}

#HRM_logo{
    width: 100%;
    padding-top: 10px;
}

#dr_login_container{
    text-align:right;
    margin-right: 30px;
    margin-top: 10px;
    font-family: "Helvetica Neue";
}




el-header{
    padding: 0%;
    margin: 0%;
    background: #606A78;
}


</style>