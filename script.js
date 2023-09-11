const appLink = 'https://script.google.com/macros/s/AKfycbxkQkFFvlRylt4iu57ZYXqbvEr5oQVOdpLTh3OtEVSqOulGzyYOuVGexnduDaXK_-sB/exec'
const stopBtn = document.getElementById('stop')
const startBtn = document.getElementById('start')

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


stopBtn.addEventListener('click', () => {
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
	const predefinedColors = ['blue', 'coral', 'darkgreen', 'darkmagenta', 'deeppink', 'deepskyblue', 'firebrick', 'lime', 'orangered'];

	const predefinedPositions = [
		{ x: 100, y: 40 },
		{ x: 800, y: 50 },
		{ x: 400, y: 60 },
		{ x: 400, y: 300 },
		{ x: 800, y: 450 },
		{ x: 100, y: 450 },
		{ x: 100, y: 250 },
		{ x: 700, y: 250 },
		{ x: 350, y: 200 },
		{ x: 700, y: 150 },
	];
	const tagCont = document.getElementById("tagContainer");

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

	const usedPositions = new Set();
	for (var i = 0; i < arrTags.length; i++) {

		var eSpan = document.createElement("span");
		eSpan.className = "tag";
		var font = 12 + 52 * (arrTags[i][1] - obj.min) / (obj.max - obj.min);
		eSpan.style.fontSize = font + "px";

		let randomPosition;
		do {
			randomPosition = predefinedPositions[Math.floor(Math.random() * predefinedPositions.length)];
		} while (usedPositions.has(JSON.stringify(randomPosition)));

		usedPositions.add(JSON.stringify(randomPosition));

		var x = randomPosition.x;
		var y = randomPosition.y;
		

		eSpan.style.left = x + "px";
		eSpan.style.top = y + "px";

		var randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
		eSpan.style.color = randomColor;

		eSpan.innerHTML = `${arrTags[i][0]}<i class="count"></i>`;
		tagCont.appendChild(eSpan)

	}


};

function animate() {

	const tags = document.querySelectorAll('.tag')

	const predefinedColors = ['blue', 'coral', 'darkgreen', 'darkmagenta', 'deeppink', 'deepskyblue', 'firebrick', 'lime', 'orangered'];

	const predefinedPositions = [
		{ x: 100, y: 40 },
		{ x: 800, y: 50 },
		{ x: 400, y: 60 },
		{ x: 400, y: 300 },
		{ x: 800, y: 450 },
		{ x: 100, y: 450 },
		{ x: 100, y: 250 },
		{ x: 700, y: 250 },
		{ x: 350, y: 200 },
		{ x: 700, y: 150 },
	];

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

	const usedPositions = new Set();

	for (var i = 0; i < arrTags.length; i++) {
		var font = 12 + 52 * (arrTags[i][1] - obj.min) / (obj.max - obj.min);

		// Выбираем случайную позицию из predefinedPositions, которая еще не используется
		let randomPosition;
		do {
			randomPosition = predefinedPositions[Math.floor(Math.random() * predefinedPositions.length)];
		} while (usedPositions.has(JSON.stringify(randomPosition)));

		usedPositions.add(JSON.stringify(randomPosition));

		// Используем выбранные координаты
		var x = randomPosition.x;
		var y = randomPosition.y;

		
		// Выбираем случайный цвет из predefinedColors
		var randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

		tags[i].style.fontSize = font + "px";
		tags[i].querySelector('.count').innerHTML = arrTags[i][1];
		tags[i].style.left = x + "px";
		tags[i].style.top = y + "px";
		tags[i].style.color = randomColor;
	}
}

const int = setInterval(() => {
	getAllCourses()
}, 3000)

render()