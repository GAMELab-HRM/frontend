<template>
    <el-row>
        <el-col :xs="9" :sm="8" :md="7" :lg="6" :xl="5">
            <el-col :span="15">
                <img id="GAME_lab_logo" src=".././assets/Logo_GAME_Lab.png">
            </el-col>
            <el-col :span="9">
                <img id="HRM_logo" src=".././assets/HRM_logo.png">
            </el-col>
        </el-col>
        <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
            <div id=nav_btn_container>
                <el-menu class="el-menu-demo" mode="horizontal"  :active-text-color='act_text_color' @select="nav_bar_active" v-bind:style="nav_btn_lst" :default-active="activeIndex" background-color='#606A78' text-color='white'>
                    <el-submenu index="1" :disabled="check_login">
                        <template slot="title">Wet swallow 10</template>
                        <el-menu-item index="1-1" v-bind:style="nav_btn" @click="$router.push('/')" :disabled="check_login">Table</el-menu-item>
                        <el-menu-item index="1-2" v-bind:style="nav_btn" @click="$router.push('add')" :disabled="check_login">Add</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" :disabled="check_login">
                        <template slot="title">MRS</template>
                        <el-menu-item index="2-1" v-bind:style="nav_btn" @click="$router.push('/')" :disabled="check_login">Table</el-menu-item>
                        <el-menu-item index="2-2" v-bind:style="nav_btn" @click="$router.push('add')" :disabled="check_login">Add</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3" :disabled="check_login">
                        <template slot="title">RDC</template>
                        <el-menu-item index="3-1" v-bind:style="nav_btn" @click="$router.push('/')" :disabled="check_login">Table</el-menu-item>
                        <el-menu-item index="3-2" v-bind:style="nav_btn" @click="$router.push('add')" :disabled="check_login">Add</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4" :disabled="check_login">
                        <template slot="title">hiatal hernia</template>
                        <el-menu-item index="4-1" v-bind:style="nav_btn" @click="$router.push('/')" :disabled="check_login">Table</el-menu-item>
                        <el-menu-item index="4-2" v-bind:style="nav_btn" @click="$router.push('add')" :disabled="check_login">Add</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </el-col>
        <el-col :xs="9" :sm="8" :md="7" :lg="6" :xl="5">
            <div id="dr_login_container">
                <el-dropdown @command="login">
                <el-button id="dr_login_btn" type="info" size='medium' icon="el-icon-s-custom" round v-bind:style="login_btn"> {{ login_status }} </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Dr. Ray" >Dr. Ray</el-dropdown-item>
                        <el-dropdown-item command="Dr. Liang">Dr. Liang</el-dropdown-item>
                        <el-dropdown-item command="Dr. Ray & Dr. Liang">Dr. Ray & Dr. Liang</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
                <span><h2>切換身分為 : {{ login_status }}</h2></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">關閉</el-button>
                </span>
                </el-dialog>
            </div>
        </el-col> 
    </el-row>
    
    
    
</template>



<script>
export default {
    name: 'nav_bar',
    data() {
        return {
            login_map:{
                "Dr. Ray":"0",
                "Dr. Liang":"1"
            },
            login_status: "登入",
            login_btn: {
                borderColor: 'red',
                fontSize: '20px',
                borderWidth: '3px'
            },
            nav_btn_lst: {
                backgroundColor: "#606A78",
                borderColor: '#606A78',
            },
            nav_btn: {
                fontSize: '20px',
                backgroundColor: '#606A78',
                // marginRight: '30px',
            },
            nav_menu_style: {
                fontSize: '20px',
            },
            activeIndex: '1-1',
            act_text_color: 'red',
            dialogVisible: false,
        }
    },

    props: {
        select_index: Number
    },
    computed:{
        check_login:function(){
            return !(this.$store.state.auth_app.login_status)
        }
    },
    methods: {
        login: function(name) {
            
            this.$store.dispatch("auth_app/UpdateLoginStatus")
            this.$store.dispatch("auth_app/UpdateLoginName", this.login_map[name])
            this.login_status = name
            this.dialogVisible = true
            this.login_btn.borderColor = 'lightgreen'
        },

        nav_bar_active(idx, event) {
            console.log(idx)
            console.log(event)
        },
        nav_bar_submenu_hover() {
            console.log(123)
        }

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
    margin-right: 30%;
    margin-top: 10px;
}

#nav_btn_container{
    margin-left: 30px;
}


el-header{
    padding: 0%;
    margin: 0%;
    background: #606A78;
}
::v-deep .el-submenu .el-submenu__title{
    font-size: 20px
}

</style>