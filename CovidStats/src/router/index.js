import {createRouter, createWebHashHistory} from "vue-router";
import {useCovidDataStore} from "../store/index.js";
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
router.beforeEach((to,from,next)=>{
    const store = useCovidDataStore()

    if(to.name==='OzetPage'||to.name==='DetailPage'||to.name==='VaccinePage'){
        if (store?.getLoaded.value){
            if (store?.getSelectedCountry.value){
                next()
            }else {
            alert('Lütfen Ülke Seçiniz')}
    }else {
            next({name: 'HomePage'})
        }
    }else {
        next()
    }


})
export default router