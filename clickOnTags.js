
const linkApp = `https://script.google.com/macros/s/AKfycbxkQkFFvlRylt4iu57ZYXqbvEr5oQVOdpLTh3OtEVSqOulGzyYOuVGexnduDaXK_-sB/exec`

const buttons = document.querySelectorAll('.btn')

buttons.forEach(btn => {
	btn. addEventListener('click', () => post(btn))
})



function post(item) {
	const formData = new FormData()

	formData.append('id', item.getAttribute('id'))
			
	axios.post(linkApp, formData)

}