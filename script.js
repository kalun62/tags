const appLink = 'https://script.google.com/macros/s/AKfycbxkQkFFvlRylt4iu57ZYXqbvEr5oQVOdpLTh3OtEVSqOulGzyYOuVGexnduDaXK_-sB/exec'
const btn = document.getElementById('click')

let firstRender = true
let arrTags = [
	["Классно", 1, 1],
	["Весело", 1, 1],
	["Здорово", 1, 1],
	["Чудесно", 1, 1],
	["Замечательно", 1, 1],
	["Круто", 1, 1],
	["Пойдет", 1, 1],
	["Нормас", 1, 1],
	["Можно и лучше", 1, 1],
	["И так сойдет", 1, 1]
];


btn.addEventListener('click', () => {
	clearInterval(int)
})
const getAllCourses = async () => {
	try {
		const response = await axios.get(appLink)
		arrTags = response.data
		animate()
	} catch (err) {
		console.error(err)
	}
}

function render() {
	const tagCont = document.getElementById("tagContainer");

	// tagCont.innerHTML = ``
	function sum(el) {
		return el[1] + el[2]
	}
	var obj = arrTags.reduce(function (a, b) {
		b = sum(b);
		if (a.min > b) a.min = b;
		if (a.max < b) a.max = b;
		return a
	}, {
		max: sum(arrTags[0]),
		min: sum(arrTags[0])
	});


	for (var i = 0; i < arrTags.length; i++) {

		var eSpan = document.createElement("span");
		eSpan.className = "tag";
		var font = 12 + 52 * (arrTags[i][1] - obj.min) / (obj.max - obj.min);
		var x = Math.floor(Math.random() * 800);
		var y = Math.floor(Math.random() * 300);
		eSpan.style.fontSize = font + "px";

		eSpan.style.left = x + "px";
		eSpan.style.top = y + "px";

		eSpan.style.color = "#" + ("000000" + (Math.random() * 16777215 | 0).toString(16)).slice(-6);
		eSpan.innerHTML = arrTags[i][0];
		tagCont.appendChild(eSpan)

	}


};

function animate() {

	const container = document.getElementById('tagContainer');
	const tags = document.querySelectorAll('.tag')

	const predefinedColors = ['blue', 'coral', 'darkgreen', 'darkmagenta', 'deeppink', 'deepskyblue', 'firebrick', 'lime', 'orangered'];

	const containerWidth = container.clientWidth
	const containerHeight = container.clientHeight

	function sum(el) {
		return el[1] + el[2]
	}
	var obj = arrTags.reduce(function (a, b) {
		b = sum(b);
		if (a.min > b) a.min = b;
		if (a.max < b) a.max = b;
		return a
	}, {
		max: sum(arrTags[0]),
		min: sum(arrTags[0])
	});

	for (var i = 0; i < arrTags.length; i++) {

		var font = 12 + 52 * (arrTags[i][1] - obj.min) / (obj.max - obj.min);
		var x = Math.floor(Math.random() * (containerWidth - 200));
		var y = Math.floor(Math.random() * (containerHeight - 100));
		tags[i].style.fontSize = font + "px";

		tags[i].style.left = x + "px";
		tags[i].style.top = y + "px";

		tags[i].style.color = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

	}
}

const int = setInterval(() => {
	getAllCourses()
}, 2000)

render()