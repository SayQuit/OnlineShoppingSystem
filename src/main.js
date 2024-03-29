import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import "./assets/icon/iconfont.css"

const app = createApp(App)
app.use(router);
app.use(ElementPlus)
app.use(store)
app.mount('#app')

