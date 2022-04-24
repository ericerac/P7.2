import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/views/HomePage.vue';
import post from '@/views/post.vue';
import MyHome from '../components/MyHome.vue';


const routes =[
    {
        name:'HomePage',
        path:'/homepage',
        component: HomePage,
    },
    {
        name:'MyHome',
        path:'/myhome',
        component: MyHome,
    },
    {
        name:'post',
        path:'/post',
        component: post,
    },
    
];

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;