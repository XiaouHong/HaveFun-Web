import { createApp } from 'vue'
import { createPinia } from 'pinia'

// ElementUI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
   .use(router)
   .use(ElementPlus)
   .use(VueAxios, axios)

app.mount('#app')
