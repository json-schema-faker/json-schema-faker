import App from './_views/App.vue';
import Core from './_core';

/* global Vue */
/* eslint-disable no-new */

const vm = new Vue({
  el: '#app',
  render(h) {
    return h(App, {
      ref: 'UI',
    });
  },
});

Core.init(vm.$refs.UI);
