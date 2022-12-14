'use strict';

const app = Vue.createApp({
  template: '<app-component />'
});

require('./async-button/async-button')(app);
require('./modal/modal')(app);
require('./models/models')(app);
require('./navbar/navbar')(app);

app.component('app-component', {
  template: `
  <div>
    <navbar />
    <div class="view">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
  `
});

const routes = require('./routes');
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes.map(route => ({
    ...route,
    component: app.component(route.component),
    props: (route) => route.params
  }))
});

app.use(router);

app.mount('#content');