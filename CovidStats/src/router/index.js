import {createRouter, createWebHashHistory} from "vue-router";

const routes=[
    {
        name:'HomePage',
        component:()=>import('../views/HomePage.vue'),
        path:'/'
    },
    {
        name:'OzetPage',
        component:()=>import('../views/OzetGtafikPage.vue'),
        path:'/ozetgrafik'
    },
    {
        name:'DetailPage',
        component:()=>import('../views/DetayPage.vue'),
        path:'/detay'
    },
    {
        name:'VaccinePage',
        component:()=>import('../views/VaccineData.vue'),
        path:'/asi'
    },

]

const router = createRouter({
    history:createWebHashHistory(),
    routes,
})

export default router