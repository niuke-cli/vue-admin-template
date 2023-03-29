import { createApp } from 'vue'
import pinia from '@/stores/index';
import App from './App.vue'
import router from '@/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/theme/index.scss';
import { setupNaiveDiscreteApi } from './plugins/naiveDiscreteApi';
// 挂载 naive-ui 脱离上下文的 Api
setupNaiveDiscreteApi();
const app = createApp(App)
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.mount('#app')
