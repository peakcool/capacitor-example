import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router/index';
import './assets/css/tailwind.css';

createApp(App).use(router).use(Quasar, quasarUserOptions).mount('#app')
