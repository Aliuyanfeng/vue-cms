import VueRouter from 'vue-router'

import Home from './components/tabs/home.vue'
import Member from './components/tabs/member.vue'
import Shopcar from './components/tabs/shopcar.vue'
import Search from './components/tabs/search.vue'
import Newslist from './components/news/newslist.vue'
import Newsinfo from './components/news/newsinfo.vue'
import Photolist from './components/photos/photolist.vue'

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
        }, {
            path: '/home/newslist',
            component: Newslist
        }, {
            path: '/home/newsinfo/:id',
            component: Newsinfo,
            props: true
        }, {
            path: '/home/photolist',
            component: Photolist
        }

    ],
    linkActiveClass: 'mui-active'
})


export default router