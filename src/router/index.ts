import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import Tool from '@/utils/tool'
// import * as Enum from '@/utils/enum'
// import LoginService from '@/service/login'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Front'
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/profile',
                name: 'Profile',
                meta: {
                    title: '個人資料'
                },
                component: () => import('../views/Front.vue')
            },
            {
                path: '/attraction',
                name: 'Attraction',
                meta: {
                    title: '地點探索'
                },
                component: () => import('../views/Front.vue')
            },
            {
                path: '/attractioncontent',
                name: 'AttractionContent',
                meta: {
                    title: '地點管理'
                },
                component: () => import('../views/Front.vue')
            },
            {
                path: '/paln',
                name: 'Paln',
                meta: {
                    title: '個人計劃'
                },
                component: () => import('../views/Front.vue')
            },
            {
                path: '/palncontent',
                name: 'PalnContent',
                meta: {
                    title: '計劃編輯'
                },
                component: () => import('../views/Front.vue')
            },
            {
                path: '/grouppaln',
                name: 'Grouppaln',
                meta: {
                    title: '群組計劃'
                },
                component: () => import('../views/Front.vue')
            },
            {
                path: '/group',
                name: 'Group',
                meta: {
                    title: '群組管理'
                },
                component: () => import('../views/Front.vue')
            },
            {
                path: '/Schedule',
                name: 'schedule',
                meta: {
                    title: '計劃行程'
                },
                component: () => import('../views/Front.vue'),
                props: (route) => route.query
            },
            {
                path: '/subscription',
                name: 'Subscription',
                meta: {
                    title: '訂閱管理'
                },
                component: () => import('../views/Front.vue')
            }, {
                path: '/discovery',
                name: 'Discovery',
                meta: {
                    title: '探索'
                },
                component: () => import('../views/Front.vue')
            }, {
                path: '/Front',
                name: 'Front',
                meta: {
                    title: '首頁'
                },
                component: () => import('../views/Front.vue')
            }, {
                path: '/communicate',
                name: 'Communicate',
                meta: {
                    title: '論壇'
                },
                component: () => import('../views/Front.vue')
            }, {
                path: '/communicatecontent',
                name: 'CommunicateContent',
                meta: {
                    title: '文章管理'
                },
                component: () => import('../views/Front.vue')
            }, {
                path: '/friendship',
                name: 'FriendShip',
                meta: {
                    title: '好友管理'
                },
                component: () => import('../views/Front.vue')
            }, {
                path: '/friendevent',
                name: 'FriendEvent',
                meta: {
                    title: '好友動態'
                },
                component: () => import('../views/Front.vue')
            }, {
                path: '/login',
                name: 'Login',
                meta: {
                    title: '登入'
                },
                component: () => import('../views/Login.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // const tool = new Tool()
    // const infoStore = useInfoStore()
    // const isCookie = await tool.checkCookie(Enum.COOKIE.TOKEN)
    // const info = infoStore.info.ID != ''
    // const login = isCookie || info
    // if (to.query.token != undefined) {
    //   const loginService = new LoginService()
    //   const token = to.query.token
    //   const response = await loginService.tokenLogin(token)
    //   if (response.data.resultCode == Enum.API_RESULT_CODE.SUCCESS) {
    //     infoStore.setBrowser(tool.checkBroswer)
    //     await tool.setCookie(Enum.COOKIE.TOKEN, response.data.result.token, 60 * 60 * 12);
    //     await infoStore.setInfo(response.data.result.token)
    //     next('/')
    //   } else {
    //     next('/login')
    //   }
    // }
    // else {
    //   if (!info && isCookie) {
    //     const cookie = tool.getCookie(Enum.COOKIE.TOKEN)
    //     if (cookie != '') {
    //       await infoStore.setInfo(cookie)
    //     }
    //   }
    // }
    // const login = infoStore.info.ID != ''
    // if (!login && to.path !== '/login') {
    //   next('/login')
    // } else if (to.meta.functionID && infoStore.searchAccess(to.meta.functionID)) {
    //   next('/403')
    // } else {
    //   next()
    // }
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router