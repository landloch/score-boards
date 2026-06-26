import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { clickAway } from './directives/vClickAway';
import { i18n } from './i18n.ts';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.directive('click-away', clickAway);
app.mount('#app');
