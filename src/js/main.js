import Vue from 'vue/dist/vue.js';
import App from './../views/App.vue';

window.onload = function () {
	new Vue({
		el: '#app',
		components: { App },
		template: '<App></App>'
	});
}
