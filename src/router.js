import VueRouter from 'vue-router'

import Home from './components/tabs/home.vue'
import Member from './components/tabs/member.vue'
import Shopcar from './components/tabs/shopcar.vue'
import Search from './components/tabs/search.vue'



const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/home'
        }, {
            path: '/home',
            component: Home
        },
        {
            path: '/member',
            component: Member
        },

        {
            path: '/shopcar',
            component: Shopcar
        },
        {
            path: '/search',
            component: Search
        },

    ],
    linkActiveClass: 'mui-active'
})


export default router