// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './commen/stylus/index.styl'; // 引入全局stylus文件

Vue.use(VueRouter);
Vue.use(VueResource); // 全局注册VueResource

// /* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App, },
// });
const app = Vue.extend(App);

const router = new VueRouter({
  linkActiveClass: 'active', // 给被选中的item配置类名称
});

router.map({
  '/goods': {
    component: goods,
  },
  '/ratings': {
    component: ratings,
  },
  '/seller': {
    component: seller,
  },
});

router.start(app, '#app');

router.go('/goods');
