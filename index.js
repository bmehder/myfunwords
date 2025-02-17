export default class MyFunWords extends HTMLElement {
	constructor() {
		super()

		// Attach shadow DOM
		this.attachShadow({ mode: 'open' })

		// Define words
		this.words = [
			'Science',
			'Math',
			'English',
			'History',
			'Bible',
			'SocialScience',
			'ForeignLanguage',
			'Technology',
			'Art',
		]

		this.currentIndex = 0
		this.interval = this.getAttribute('interval') || 3000 // Allow customization

		this.shadowRoot.innerHTML = `
			<style>
					.container {
						display: inline-flex;
						align-items: center;
						font-size: 4rem;
						font-weight: bold;
					}
					.word-wrapper {
						width: 15ch;
						height: 1.2em;
						position: relative;
						overflow: hidden;
					}
					.word {
						position: absolute;
						left: 0;
						color: #307ad5;
						text-align: left;
						opacity: 0;
						transform: translateY(-150%);
						transition: transform 1s ease-in-out;
					}
					.word.active {
						opacity: 1;
						transform: translateY(0);
					}
					.word.out {
						opacity: 1;
						transform: translateY(300%);
					}
			</style>
			<div class="container">
					MyFun <span class="word-wrapper">
							<span class="word active">${this.words[0]}</span>
					</span>
			</div>
		`
	}

	connectedCallback() {
		this.startAnimation()
	}

	startAnimation() {
		this.timer = setInterval(() => this.swapWords(), this.interval)
	}

	swapWords() {
		const wrapper = this.shadowRoot.querySelector('.word-wrapper')
		const currentWord = this.shadowRoot.querySelector('.word.active')

		// Create new word element
		const newWord = document.createElement('span')
		newWord.classList.add('word')
		newWord.textContent = this.words[(this.currentIndex + 1) % this.words.length]
		wrapper.appendChild(newWord)

		// Apply CSS classes for animation
		setTimeout(() => {
			currentWord.classList.remove('active')
			currentWord.classList.add('out')
			newWord.classList.add('active')
		}, 50) // Small delay to allow DOM rendering

		// Remove old word after animation
		setTimeout(() => {
			currentWord.remove()
		}, 500)

		this.currentIndex = (this.currentIndex + 1) % this.words.length
	}

	disconnectedCallback() {
		clearInterval(this.timer)
	}
}

customElements.define('myfun-words', MyFunWords)
