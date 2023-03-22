import { createApp } from 'vue'
import pinia from '@/stores/index';
import './style.css'
import App from './App.vue'
import router from '@/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/theme/index.scss';

const app = createApp(App)
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.mount('#app')
