console.log('/m/example_vue/entry.vue.js');

import Vue from 'vue';
import app from './index.vue';

new Vue({
	el:'#app',
	template:'<app/>',
	components: { app }
})