<template>
    <el-row>
        <el-col :span="12">
            <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :span="12">
            <form>
                <el-form-item label="信箱">
                    <el-input v-model="login.mail" />
                </el-form-item>
                <el-form-item label="密碼">
                    <el-input v-model="login.password" />
                </el-form-item>
            </form>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const login = reactive({
  mail: '',
  password: ''
})
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}
</style>