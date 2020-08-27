//vuex 
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//每当初始化项目的时候，就先从loaclstorage中取一下数据

let car = window.JSON.parse(localStorage.getItem('cart' || '[]'))


const store = new Vuex.Store({
    state: {
        cart: car
    },
    mutations: {
        addtocart(state, goods) {
            //将商品添加至购物车
            let flag = false
            state.cart.some(item => {
                if (item.id == goods.id) {
                    item.count += goods.count
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.cart.push(goods)
            }

            //持久化存储购物车数据  序列化 
            localStorage.setItem('cart', window.JSON.stringify(state.cart))
        }
    },
    getters: {
        totalcount(state) {
            let c = 0
            state.cart.forEach(item => c += item.count)
            return c
        }
    }
})

export default store