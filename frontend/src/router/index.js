import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/views/HomePage.vue';
import post from '@/views/post.vue';
import MyHome from '../components/MyHome.vue';
import Login from '../components/Login.vue';
import adminPage from '@/views/AdminPage.vue';
import profil from '@/views/Profil.vue';


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
    {
        name:'postPage',
        path:'/postPage',
        component: () => import("@/views/PostPage.vue"),
    },
     {
         name:'adminPage',
         path:'/user/admin',
         component: () => import("@/views/AdminPage.vue"),
     },
     {
         name:'admin',
         path:'/admin',
         component: () => import("@/views/admin.vue"),
     },
    
     {
         name:'login',
         path:'/',
         component: Login,
     },
     {
         name:'profil',
         path:'/profil',
         component: profil,
     },
     {
         name:'updateProfil',
         path:'/updateProfil',
         component: () => import("@/views/updateProfil.vue"),
     },
     {
         name:'UserList',
         path:'/UserList',
         component: () => import("../components/UserList.vue"),
     },
    
];

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;