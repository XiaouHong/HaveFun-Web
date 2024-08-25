<template>
    <el-menu :default-active="onRoutes" router mode="horizontal" style="justify-content: space-between;">
        <div>
            <el-menu-item :index="'/'">
                <img class="header-logo" src="../../assets//logo.png">
            </el-menu-item>
        </div>
        <div style="display: flex;">
            <template v-for="item in pages">
                <div v-if="item.subs?.find(sub => sub.available) != undefined">
                    <template v-if="item.subs">
                        <el-sub-menu :index="item.index" :key="item.index">
                            <template #title>
                                <span class="title">{{ item.title }}</span>
                            </template>
                            <template v-for="subItem in item.subs" :key="subItem.index">
                                <el-menu-item :index="subItem.index" v-if="subItem.available">
                                    {{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index" v-if="item.available">
                            <span class="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </div>
            </template>
            <el-menu-item @click="dialogVisible = true" v-if="infoStore.info.login">登出</el-menu-item>
            <el-menu-item :index="'/login'" v-else>登入</el-menu-item>
        </div>
    </el-menu>
    <v-dialog v-model:visible="dialogVisible" :title="'提醒'">
        <template #content>
            確定要登出嗎？
        </template>
        <template #footercontent>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button @click="logout" type="primary">確認</el-button>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useInfoStore } from '../../store/info'
import Tool from '../../utils/tool'
import * as Enum from '../../utils/enum'
import { useRouter } from 'vue-router'
import vDialog from '../../components/Dialog.vue'

// =======================
// 類別實例
// =======================
const router = useRouter()
const tool = new Tool()
const infoStore = useInfoStore()
const route = useRoute()
const onRoutes = computed(() => {
    return route.path
})
// =======================
// 參數
// =======================
const dialogVisible = ref<Boolean>(false)
const pages = reactive([
    {
        SystemID: 'Discovery',
        title: '探索',
        available: false,
        index: '/discovery',
        functionID: 'D01'
    },
    {
        SystemID: 'Member',
        title: '會員',
        available: false,
        index: '1',
        subs: [
            {
                index: '/Profile',
                title: '個人資料',
                available: false,
                functionID: 'M01'
            }
        ]
    },
    {
        SystemID: 'Attraction',
        title: '地點',
        available: false,
        index: '2',
        subs: [
            {
                index: '/attraction',
                title: '地點列表',
                available: false,
                functionID: 'A01'
            },
            {
                index: '/attractioncontent',
                title: '地點管理',
                available: false,
                functionID: 'A02'
            }
        ]
    },
    {
        SystemID: 'Planning',
        title: '計劃',
        available: false,
        index: '3',
        subs: [
            {
                index: '/paln',
                title: '計劃列表',
                available: false,
                functionID: 'P01'
            },
            {
                index: '/schedule',
                title: '計劃編輯',
                available: false,
                functionID: 'P02'
            },
            {
                index: '/DayoffRecord',
                title: '計劃管理',
                available: false,
                functionID: 'P03'
            },
            {
                index: '/group',
                title: '群組管理',
                available: false,
                functionID: 'P04'
            },
            {
                index: '/grouppaln',
                title: '群組計劃',
                available: false,
                functionID: 'P05'
            }
        ]
    },
    {
        SystemID: 'Subscription',
        title: '訂閱管理',
        index: '/subscription',
        available: false,
        functionID: 'S01'
    },
    {
        SystemID: 'FriendShip',
        title: '好友',
        available: false,
        index: '4',
        subs: [
            {
                index: '/friendevent',
                title: '好友動態',
                available: false,
                functionID: 'F01'
            },
            {
                index: '/friendship',
                title: '好友管理',
                available: false,
                functionID: 'F02'
            }
        ]
    },
    {
        SystemID: 'Communicate',
        title: '論壇',
        available: false,
        index: '5',
        subs: [
            {
                index: '/communicate',
                title: '文章列表',
                available: false,
                functionID: 'C01'
            },
            {
                index: '/communicatecontent',
                title: '文章管理',
                available: false,
                functionID: 'C02'
            }
        ]
    }
])
// =======================
// 組件載入
// =======================
onMounted(async () => {
    await pages.forEach(x => {
        if (x.subs) {
            x.subs.forEach(el => {
                infoStore.searchAccess(el.functionID) ? el.available = true : el.available = false;
            });
        } else {
            infoStore.searchAccess(x.functionID) ? x.available = true : x.available = false
        }
    })
})

// =======================
// 選單動作
// =======================
const logout = async () => {
    dialogVisible.value = false
    await tool.clearCookie(Enum.COOKIE.TOKEN)
    await infoStore.logout
    router.go(0)
}

</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}

.header-logo {
    object-fit: contain;
    height: 50%;
}
</style>