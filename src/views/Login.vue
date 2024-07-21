<template>
    <el-row>
        <el-col :md="12" :sm="24" :xs="24">
            <el-carousel height="500px">
                <el-carousel-item class="carousel" v-for="item in srcList" :key="item">
                    <img :src="item.img">
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
            <div id="login">
                <div id="login_type">
                    <p class="text"> — 請選擇登入方式 — </p>
                    <br>
                    <el-button :size="'large'" round @click="authorize">
                        <span><img style="height:24px;"
                                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"></span>
                        <span>以Google登入</span>
                    </el-button>
                    <br>
                    <p class="text"> — 或者 — </p>
                    <br>
                </div>
                <div id="login_form">
                    <el-form :label-position="'top'">
                        <el-form-item label="信箱" style="width: 300px">
                            <el-input v-model="login.mail" />
                        </el-form-item>
                        <el-form-item label="密碼" style="width: 300px">
                            <el-input v-model="login.password" show-password />
                        </el-form-item>
                    </el-form>
                    <el-button>登入</el-button>
                    <br>
                    <p class="text"> — 還不是會員？ — </p>
                    <br>
                    <el-button @click="router.push('/Register')">註冊</el-button>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import LoginService from '../service/login'
import * as Enum from '../utils/enum'
import { useRouter } from 'vue-router'

// =======================
// 類別實例
// =======================
const loginService = new LoginService()
const router = useRouter()

const login = reactive({
    mail: '',
    password: ''
})
const srcList = [{
    'img': '/src/assets/img/one.jpg'
}, {
    'img': '/src/assets/img/two.jpg'
}, {
    'img': '/src/assets/img/three.jpg'
}, {
    'img': '/src/assets/img/four.jpg'
}]
const authorize = async () => {
    const response = await loginService.googleAuthorize();
    if (response.data.resultCode === Enum.api_result_code.success) {
        window.location.href = response.data.result
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

#login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

#login_type {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text {
    color: #0000005a;
}

#login {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center
}

img {
    width: inherit;
}
</style>