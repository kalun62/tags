
const linkApp = `https://script.google.com/macros/s/AKfycbxkQkFFvlRylt4iu57ZYXqbvEr5oQVOdpLTh3OtEVSqOulGzyYOuVGexnduDaXK_-sB/exec`

const buttons = document.querySelectorAll('.btn')
const popup = document.querySelector('.popup')
const closed = document.querySelector('.closed')

buttons.forEach(btn => {
	btn.addEventListener('click', () => post(btn))
})

closed.addEventListener('click', () => {
	window.location = `https://xn--d1acibfeglkhnjilxn5k.xn--p1ai/`
})

function post(item) {
	const formData = new FormData()
	if(!item.classList.contains('submit')){
		formData.append('name', item.innerText.toLowerCase())
	}else{
		formData.append('name', item.previousElementSibling.value.toLowerCase())
	}
			
	axios.post(linkApp, formData)

	setTimeout(() => {
		popup.style.display = 'flex'
	},1000)

}



