import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
    state(){
        return {
            token: localStorage.getItem("microserviceDemoLoginToken"),
            loginUserId: localStorage.getItem("microserviceDemoLoginUserId"),
            loginUserName: localStorage.getItem("microserviceDemoLoginUserName")
        }
    },
    //mutations中的方法只能是同步
    mutations:{
        setLoginInfo: function(state,data){
            state.token = data.token
            state.loginUserId = data.loginUserId
            state.loginUserName = data.loginUserName

            //同步更新缓存
            localStorage.setItem("microserviceDemoLoginToken",data.token)
            localStorage.setItem("microserviceDemoLoginUserId",data.loginUserId)
            localStorage.setItem("microserviceDemoLoginUserName",data.loginUserName)
        }
    },
    //在组件中通过：$store.getters.getter1 来访问
    getters:{
        getter1: function(){
            return "getter1 value"
        }
    },
    //actions中可以执行异步调用
    //在组件中通过this.$store.dispatch('actions的名字', 参数)来调用action
    actions:{
        action1: function(context, params){
            //可以进行异步调用，获取data

            //通过mutations更新state
            //context.commit('mutations名字',data)
        }
    },
    modules:{}
})

export default store;