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
         name:'adminPage',
         path:'/user/admin',
         component: adminPage,
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
    
];

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;