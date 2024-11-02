
const linkApp = `https://script.google.com/macros/s/AKfycbx4_KoU_xcZtmMpJNMlMYXQypkc24iFI-xSGDoQk7jPEYUUblxNMCquilKfyrHtBsX2/exec`

const buttons = document.querySelectorAll('.btn')
const popup = document.querySelector('.popup')
const closed = document.querySelector('.closed')

buttons.forEach(btn => {
	btn.addEventListener('click', () => post(btn))
})

closed.addEventListener('click', () => {
	window.location = `https://orlyatarussia.ru/forum-uchiteley-orlyat-rossii/`
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



