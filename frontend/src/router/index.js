import { createRouter, createWebHistory } from "vue-router";


import Login from '../components/Login.vue';

import profil from '@/views/Profil.vue';


const routes =[
     
    
    
    {
        name:'postPage',
        path:'/postPage',
        component: () => import("@/views/PostPage.vue"),
    },
     

     {
         name:'login',
         path:'/',
         component: Login,
        //  component: () => import("../components/Login.vue"),
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