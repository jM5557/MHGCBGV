<template lang = "pug">
	div
		label
			h2 Search By Name
			
			input(type="text", id = "search-bar", v-model="searchText", @input="searchForBackground")

			button(v-if="isValidInputString(searchText)", @click = "clearSearch", aria-label="clear search") &times;
		
		ul
			<li v-for="background in Backgrounds" v-if="background.name !== 'DUMMY'" v-bind:style="{background:'url(\'assets/images/gc_bg/gc_bg_' + background.id + '.png\') no-repeat center center'}" v-bind:class="[{'bg-list-item': 'bg-list-item', 'hide': Hide ? 'hide' : ''}]" @click = "toggleModal(background)"> <span>{{ background.name }}</span></li>

			footer
				img(alt="footer felyne symbol", src="assets/images/felyne-art.png")
				
				a(href="https://jm5557.github.io/MHQuestJournal") MH Quest Journal
				a(href="https://jm5557.github.io/MonsterHunterTrailer") Monster Hunter Trailer Viewer
				a(href="https://github.com/jm5557/MHGCBGV")
					img(alt="github icon", src = "assets/images/github-icon.png")
		
		Modal(:background="selectedBackground", :toggleModal="toggleModal" v-if="displayModal")

</template>

<script>
import Modal from './Modal.vue';
import Backgrounds from './../js/data/backgrounds';

export default {
	name: 'InputSearch',
	components: {
		Modal
	},
	data () {
		return {
			AllBackgrounds: Backgrounds.backgrounds.filter(function (b) { return b.name !== 'DUMMY'}),
			Backgrounds: Backgrounds.backgrounds.filter(function (b) { return b.name !== 'DUMMY'}),
			Hide: false,
			searchCleared: false,
			searchText: '',
			prevText: '',
			selectedBackground: Backgrounds.backgrounds[0],
			displayModal: false
		}
	},
	methods: {
		toggleModal () {
			/* 
				Optional argument at index 0 is a background object
				set as the `selectedBackground` to be used when displaying
				modal if a background thumbnail is clicked.
			*/
			if (arguments.length > 0) {
				this.selectedBackground = arguments[0];
			}
			
			// Toggles modal display (on\off)
			this.displayModal = !this.displayModal;
		},
		isValidInputString (str) {
			return (str.length >= 3);
		},
		searchForBackground () {
			/*
				Prevents search from going through if it is not
				validated or if the search field is cleared
			*/
			if (!this.isValidInputString(this.searchText) || this.searchCleared) {
				this.Backgrounds = this.AllBackgrounds;

				if (this.searchCleared) {
					this.searchText = '';
					this.searchCleared = false;
				}

				return;
			}

			let temp = [];
			let foundSomething = false;

			for(var i=0; i< this.AllBackgrounds.length; i++) {
				if ((this.AllBackgrounds[i].name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)) {
					temp.push(this.AllBackgrounds[i]);
					foundSomething = true;
				}
			}

			// If no search results were found, simply display the whole
			// list of backgrounds
			if (!foundSomething) {
				this.Backgrounds = this.AllBackgrounds;
				return;
			} else if (this.Backgrounds.length === temp.length) {
				// Do nothing if the search retrieves the same search result.
				// This prevents the same item from being rerendered onto the
				// `Backgrounds` array after typing/deleting one more letter of its
				// name in the input field (ex. 'Ance' -> 'Ances' for 'Ancestral Steppe')
				return;
			}


			this.Hide = true;
			this.Backgrounds = temp;

			let _this = this;
			setTimeout(function () { _this.Hide = false; }, 350);
		},
		clearSearch () {
			this.searchCleared = true;
			this.searchForBackground();
		}
	}
}
</script>