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
        },
        updategoodscount(state, goods) {
            state.cart.some(item => {
                if (item.id == goods.id) {
                    item.count = goods.count
                    return true
                }

            })
            localStorage.setItem('cart', window.JSON.stringify(state.cart))
        },
        delfromcart(state, id) {
            state.cart.some((item, i) => {
                if (item.id == id) {
                    state.cart.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('cart', window.JSON.stringify(state.cart))
        },
        changeselectstate(state, obj) {
            state.cart.some(item => {
                if (item.id == obj.id) {
                    item.selected = obj.selected
                    return true
                }
            })
            localStorage.setItem('cart', window.JSON.stringify(state.cart))
        }
    },
    getters: {
        totalcount(state) {
            let c = 0
            state.cart.forEach(item => c += item.count)
            return c
        },
        idstr(state) {
            let arr = []
            state.cart.forEach(item => arr.push(item.id))
            return arr.join(',')
        },
        countobj(state) {
            let o = {}
            state.cart.forEach(item => o[item.id] = item.count)
            return o
        },
        selectedobj(state) {
            let o = {}
            state.cart.forEach(item => o[item.id] = item.selected)
            return o
        },
        selectedcount(state) {
            let c = 0
            state.cart.forEach(item => {
                if (item.selected) {
                    c += item.count
                }
            })
            return c
        },
        amount(state) {
            let c = 0
            state.cart.forEach(item => {
                if (item.selected) {
                    c += item.count * item.price
                }
            })
            return c
        }
    }
})

export default store