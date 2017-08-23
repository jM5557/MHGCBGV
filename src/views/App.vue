<template lang="pug">
	div(id="app")
		section(id="main-container")
			InputSearch
</template>

<script>
import InputSearch from './InputSearch.vue';

export default {
	name: 'App',
	data () {
		return {
		}
	},
	components: {
		InputSearch
	}
}
</script>