<template>
    <div class="navWrapper">
        <div id="menu">
            <el-menu mode="horizontal" :router="true" background-color='#606A78' text-color='white' @select="nav_bar_active" :active-text-color='act_text_color'>
                <el-menu-item id="logo" index="/">
                    <logo></logo>
                </el-menu-item>
                <el-submenu index="1" :disabled="check_login">
                    <template slot="title">wet swallows 10、MRS、Hiatal hernia</template>
                    <el-menu-item :disabled="check_login" index="1-1" :route="{ name: 'basic_test' }" >所有資料</el-menu-item>
                    <el-menu-item :disabled="check_login" index="1-2" :route="{ name: 'basic_test_add' }" >新增資料</el-menu-item>
                </el-submenu>
                <el-submenu index="2" :disabled="check_login">
                    <template slot="title">RDC</template>
                    <el-menu-item :disabled="check_login" index="2-1" :route="{ name: 'RDC' }">所有資料</el-menu-item>
                    <el-menu-item :disabled="check_login" index="2-2" :route="{ name: 'RDC_add' }">新增資料</el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="3" :disabled="check_login">
                    <template slot="title">RDC</template>
                    <el-menu-item :disabled="check_login" index="3-1" :route="{ name: 'RDC' }">所有資料</el-menu-item>
                    <el-menu-item :disabled="check_login" index="3-2" :route="{ name: 'RDC_add' }">新增資料</el-menu-item>
                </el-submenu>
                <el-submenu index="4" :disabled="check_login">
                    <template slot="title">Hiatal hernia</template>
                    <el-menu-item :disabled="check_login" index="4-1" :route="{ name: 'Hiatal_hernia' }">所有資料</el-menu-item>
                    <el-menu-item :disabled="check_login" index="4-2" :route="{ name: 'Hiatal_hernia_add' }">新增資料</el-menu-item>
                </el-submenu> -->
                <el-menu-item style="float:right">
                    <div>
                        <el-dropdown @command="login">
                            <el-button id="dr_login_btn" type="info" size='medium' icon="el-icon-s-custom" round v-bind:style="login_btn"> {{ login_status }} </el-button>
                            <el-dropdown-menu slot="dropdown" style="background: #606A78">
                                <el-dropdown-item command="Dr. Ray">Dr. Ray</el-dropdown-item>
                                <el-dropdown-item command="Dr. Liang">Dr. Liang</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
                        <span><h2>切換身分為 : {{ login_status }}</h2></span>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">關閉</el-button>
                        </span>
                        </el-dialog>
                    </div>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import Logo from "@/components/Logo"

export default{
    components:{
        Logo,
    },
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
            doctor_login_style: 'font-size: 20px; color: white;'
        }
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
            console.log(name)
        },

        nav_bar_active(idx, event) {
            console.log(idx)
            console.log(event)
        },
        test(el) {
            console.log(123)
            console.log(el)
        },

    }
}

</script>
<style scoped>
#dr_login_container{
    text-align:right;
    margin-right: 30%;
    margin-top: 10px;
}

#nav_btn_container{
    margin-left: 30px;
}

#dr_login_btn {
    font-size: 20px;
}

el-header{
    padding: 0%;
    margin: 0%;
    background: #606A78;
}
::v-deep .el-submenu .el-submenu__title{
    font-size: 20px
}

.el-dropdown-menu .el-dropdown-menu__item{
    font-size: 20px;
    color: white;
}

.el-dropdown-menu .el-dropdown-menu__item:hover{
    background: '#4C585C';
    color: black;
}

</style>