<template lang = "pug">
	div
		div(id="overlay" @click="toggleModal")
		button(id="close-modal-button", @click="toggleModal") &times;
		div(id="modal-container")
			h2 {{ background.name }}
			img(v-bind:alt="background.name", v-bind:src="'assets/images/gc_bg/gc_bg_' + background.id + '.png'")
</template>

<script>
export default {
	name: 'Modal',
	props: ['background', 'toggleModal']
}
</script>