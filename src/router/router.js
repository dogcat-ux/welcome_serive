import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入组件
const home = () => import('../views/Home.vue')
const main = () => import('../views/Main.vue')
const other = () => import('../views/Other.vue')
const search = () => import('../views/Search.vue')
const second = () => import('../views/SecondMain.vue')
const details = () => import('../views/Details.vue')
const members = () => import('../views/Members.vue')
// eslint-disable-next-line no-unused-vars
const CommonFrame = () => import('../components/CommonFrame.vue')

const router = new VueRouter({
    base: '',
    routes: [
        {
            path: '/',
            component: home,
            name: 'home',
            meta: {
                level: 1,
                keepAlive: true
            }
        },
        {
            path: '/main',
            component: main,
            name: 'main',
            meta: {
                level: 2,
                keepAlive: false
            }
        },
        {
            path: '/other',
            component: other,
            name: 'other',
            meta: {
                level: 2,
                keepAlive: true
            }
        },
        {
            path: '/second/:id/:name',
            component: second,
            name: 'second',
            meta: {
                level: 3,
                keepAlive: false
            }
        },
        {
            path: '/search/:from/:id',
            // path: '/search/:from',
            component: search,
            name: 'search',
            meta: {
                level: 100,
                keepAlive: false
            }
        },
        {
            path: '/next/:collegeId/:id/:name',
            component: main,
            name: 'next',
            meta: {
                level: 4,
                keepAlive: false
            }
        },
        {
            path: '/details/:id/:name',
            component: details,
            name: 'details',
            meta: {
                level: 5,
                keepAlive: false
            }
        },
        {
            path: '/members/:id/:name',
            component: members,
            name: 'members',
            meta: {
                level: 6,
                keepAlive: false
            }
        },
        {
            path: '/CommonFrame',
            component: CommonFrame,
            name: 'CommonFrame',
            meta: {
                level: 6,
                keepAlive: false
            }
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     from.meta.keepAlive = true;
//     to.meta.keepAlive = true;
//     if (to.name == "search") {
//         from.meta.keepAlive = true;
//     }
//     else if (from.name == "search") {
//         from.meta.keepAlive = false;
//     }
//     next();
// })

export default router
