import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { clickAway } from './directives/vClickAway';
import { i18n, loadLocale } from './i18n.ts';
import './main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

const savedLocale = localStorage.getItem('locale') ?? 'en';
await loadLocale(savedLocale);
app.directive('click-away', clickAway);
app.mount('#app');
