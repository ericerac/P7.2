import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/views/HomePage.vue';
import post from '@/views/post.vue';


const routes =[
    {
        name:'HomePage',
        path:'/homepage',
        component: HomePage,
    },
    {
        name:'post',
        path:'/post',
        component: post,

    }
    
];

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;