import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Tool from '../utils/tool'
import * as Enum from '../utils/enum'
import LoginService from '../service/login'
import { useInfoStore } from '../store/info'

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
                path: '/schedule',
                name: 'Schedule',
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
                component: () => import('../views/Front.vue'),
                beforeEnter: async (to, _from, next) => {
                    if (to.query.code != undefined && to.query.state != undefined) {
                        const tool = new Tool()
                        const infoStore = useInfoStore()
                        const loginService = new LoginService()
                        const response = await loginService.callback(to.query.code, to.query.state)
                        if (response.data.resultCode == Enum.api_result_code.success) {
                            if (response.data.result.isMember) {
                                await tool.setCookie(Enum.COOKIE.TOKEN, response.data.result.token, 60 * 60 * 12);
                                await infoStore.setInfo(response.data.result.token)
                            } else {
                                infoStore.info.nickName = response.data.result.name
                                infoStore.info.email = response.data.result.mail
                                next('/register')
                            }
                        }
                    }else {
                        next()
                    }
                }
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
            }, {
                path: '/register',
                name: 'Register',
                meta: {
                    title: '登入'
                },
                component: () => import('../views/Register.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (_to, _from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router