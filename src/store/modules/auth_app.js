const state = {
    login_status:false,
    login_name:"",
}

const mutations = {
    UPDATE_LOGIN_STATUS:function(state,){
        state.login_status = true
        
    },
    UPDATE_LOGIN_NAME:function(state, name){
        state.login_name = name
    }
}

const actions = {
    UpdateLoginStatus:function({commit}){
        commit("UPDATE_LOGIN_STATUS",)
    },
    UpdateLoginName:function({commit}, name){
        commit("UPDATE_LOGIN_NAME", name)
    }
}

export default {
    state, mutations, actions,
    namespaced: true
}