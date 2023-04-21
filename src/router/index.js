import VueRouter from "vue-router"
import Login from "../views/login/Login.vue"
import Home from "../views/home/Home.vue"
import Vue from 'vue'
import NotFound from "../components/NotFound.vue"

Vue.use(VueRouter)

//创建路由配置关系对象，关联路由和组件
const routes =[

    {
        path: "/login",
        component: Login

    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/:paths(.*)*",
        component: NotFound
    }

]
//创建路由实例
const router = new VueRouter({
    routes,
    mode: "history"
}
)

export default router