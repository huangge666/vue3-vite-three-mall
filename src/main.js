import { createApp } from 'vue'
import App from './App.vue'

import router from "./router/index";
import store from "./store/index";

import 'ant-design-vue/lib/message/style/css';
import { message } from 'ant-design-vue';

const app = createApp(App);
app.use(router).use(store);
app.mount('#app')

app.config.globalProperties.$message = message;
