
const linkApp = `https://script.google.com/macros/s/AKfycbxkQkFFvlRylt4iu57ZYXqbvEr5oQVOdpLTh3OtEVSqOulGzyYOuVGexnduDaXK_-sB/exec`

const buttons = document.querySelectorAll('.btn')
const popup = document.querySelector('.popup')
const closed = document.querySelector('.closed')

buttons.forEach(btn => {
	btn. addEventListener('click', () => post(btn))
})

closed.addEventListener('click', () => {
	window.close()
})

function post(item) {
	const formData = new FormData()

	formData.append('id', item.getAttribute('id'))
			
	axios.post(linkApp, formData)

	setTimeout(() => {
		popup.style.display = 'flex'
	},1000)

}