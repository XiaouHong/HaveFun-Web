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
            <div class="register">
                <el-form ref="registerFormRef" :model="registerForm" :rules="rules" class="registerForm">
                    <div class="registerItem">
                        <el-form-item label="姓名" prop="name" required>
                            <el-input v-model="registerForm.name" autocomplete="off" placeholder="請輸入姓名" />
                        </el-form-item>
                        <el-form-item label="暱稱" prop="nickName" required>
                            <el-input v-model="registerForm.nickName" autocomplete="off" placeholder="請輸入暱稱" />
                        </el-form-item>
                        <el-form-item label="郵件帳號" prop="mail" required>
                            <el-input v-model="registerForm.mail" autocomplete="off" placeholder="請輸入帳號" />
                        </el-form-item>
                        <el-form-item label="密碼" prop="password" required>
                            <el-input v-model="registerForm.password" autocomplete="off" placeholder="請輸入密碼" type="password"
                                show-password />
                        </el-form-item>
                        <el-form-item label="確認密碼" prop="confirmPassword" required>
                            <el-input v-model="registerForm.confirmPassword" autocomplete="off" placeholder="請確認密碼"
                                type="password" show-password />
                        </el-form-item>
                        <el-form-item label="自我介紹" prop="note">
                            <el-input v-model="registerForm.note" autocomplete="off" :rows="4" type="textarea"
                                placeholder="請輸入自我介紹" />
                        </el-form-item>
                    </div>
                    <div>
                        <el-button @click="submitForm(registerFormRef)">送出</el-button>
                        <el-button @click="resetForm(registerFormRef)">清除</el-button>
                    </div>
                </el-form>
            </div>
        </el-col>
    </el-row>
    <v-dialog v-model:visible="dialogVisible" :title="title">
        <template #content>
            {{ msg }}
        </template>
    </v-dialog>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { useInfoStore } from '../store/info'
import type { FormInstance, FormRules } from 'element-plus'
import * as Interface from '../utils/interface'
import MemberService from '../service/member'
import * as Enum from '../utils/enum'
import vDialog from '../components/Dialog.vue'

const dialogVisible = ref<Boolean>(false)
const msg = ref<string>('')
const title = ref<string>('')
const memberService = new MemberService()
const registerFormRef = ref<FormInstance>()
const infoStore = useInfoStore()
const registerForm = reactive<Interface.RegisterForm>({
    mail: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickName: '',
    note: ''
})
onMounted(() => {
    registerForm.mail = infoStore.info.email
    registerForm.name = infoStore.info.nickName
});

const validatePassword = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('請輸入密碼'))
    } else {
        const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$.\%\^\&\*\(\)])[0-9a-zA-Z!@#$.\%\^\&\*\(\)]{8,12}/;
        if (regex.test(value) == false) {
            callback(new Error('密碼長度為8~12碼，需包含英文字母、數字和一個特殊符號(!@#$.%^&*)'))
        }
        // if (registerForm.password !== '') {
        //     if (!registerFormRef.value) return
        //     registerFormRef.value.validateField('password')
        // }
        callback()
    }
}
const validateCofirmPassword = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('請再次輸入密碼'))
    } else if (value !== registerForm.password) {
        callback(new Error("與密碼不符"))
    } else {
        callback()
    }
}

const rules = reactive<FormRules<Interface.RegisterForm>>({
    mail: [
        { required: true, message: '請輸入郵件', trigger: 'blur' },
        { type: 'email', message: '請輸入正確格式', trigger: ['blur', 'change'] }
    ],
    password: [
        { validator: validatePassword, trigger: 'blur' },
    ],
    confirmPassword: [
        { validator: validateCofirmPassword, trigger: 'blur' },
    ],
    name: [
        { required: true, message: '請輸入名字', trigger: 'blur' },
    ],
    nickName: [
        { required: true, message: '請輸入暱稱', trigger: 'blur' },
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid, _fields) => {
        if (valid) {
            const param: Interface.Register = {
                mail: registerForm.mail,
                password: registerForm.password,
                name: registerForm.name,
                nickName: registerForm.nickName,
                note: registerForm.note
            };
            const response = await memberService.register(param);
            if (response.data.resultCode === Enum.api_result_code.success) {
                title.value = '成功提醒'
                msg.value = '操作成功'
                resetForm(registerFormRef.value)
            } else {
                title.value = '失敗提醒'
                msg.value = response.data.resultMessage
            }
            dialogVisible.value = true;
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const srcList = [{
    'img': '/src/assets/img/one.jpg'
}, {
    'img': '/src/assets/img/two.jpg'
}, {
    'img': '/src/assets/img/three.jpg'
}, {
    'img': '/src/assets/img/four.jpg'
}]
</script>

<style scoped>
.registerForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.register {
    display: flex;
    justify-content: center;
    height: 100%;
}

img {
    width: inherit;
}

.registerItem {
    width: 500px;
}
</style>