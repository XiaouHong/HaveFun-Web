<template>
    <div class="register">
        <el-form ref="registerFormRef" :model="registerForm" :rules="rules" class="registerForm">
            <el-form-item label="姓名" required>
                <el-input v-model="registerForm.name" autocomplete="off" placeholder="請輸入姓名" />
            </el-form-item>
            <el-form-item label="暱稱" required>
                <el-input v-model="registerForm.nickName" autocomplete="off" placeholder="請輸入暱稱" />
            </el-form-item>
            <el-form-item label="帳號" required>
                <el-input v-model="registerForm.mail" autocomplete="off" placeholder="請輸入帳號" />
            </el-form-item>
            <el-form-item label="密碼" required>
                <el-input v-model="registerForm.password" autocomplete="off" placeholder="請輸入密碼" />
            </el-form-item>
            <el-form-item label="確認密碼" required>
                <el-input v-model="registerForm.corfirmPassword" autocomplete="off" placeholder="請確認密碼" />
            </el-form-item>
            <el-form-item label="自我介紹">
                <el-input v-model="registerForm.note" autocomplete="off" :rows="4" type="textarea" placeholder="請輸入自我介紹" />
            </el-form-item>
            <el-button @click="submitForm">送出</el-button>
            <el-button @click="resetForm">清除</el-button>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { useInfoStore } from '../store/info'
import type { FormInstance, FormRules } from 'element-plus'
import * as Interface from '../utils/interface'

const ruleFormRef = ref<FormInstance>()
const infoStore = useInfoStore()
const registerForm = reactive<Interface.RegisterForm>({
    mail: '',
    password: '',
    corfirmPassword: '',
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
        if (regex.test(registerForm.password) == false) {
            callback(new Error('格式錯誤，密碼長度為8~12碼、包含英文字母、包含數字和一個特殊符號(可為!@#$.%^&*)'))
        }
        if (registerForm.password !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('password')
        }
        callback()
    }
}
const validateComfirmPassword = (_rule: any, value: any, callback: any) => {
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
    corfirmPassword: [
        { validator: validateComfirmPassword, trigger: 'blur' },
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
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style>
.registerForm {
    max-width: 300px;
    box-shadow: 0px 0px 10px 10px rgba(148, 112, 221, 0.14);
    padding: 30px;
    margin-bottom: 30px;
}

.register {
    display: flex;
    justify-content: center
}
</style>