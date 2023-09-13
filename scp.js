const start = document.getElementById('start')
const stop = document.getElementById('stop')

start.addEventListener('click', () => {
	const int = setInterval(() => {
		getAllCourses()
	}, 3000)

	stop.addEventListener('click', () => {
		clearInterval(int)
	})
})

// Данные для тегов с их весами
let tags = [
	{ text: "JavaScript", size: 30, color: getRandomColor() },
	{ text: "HTML", size: 25, color: getRandomColor() },
	{ text: "CSS", size: 20, color: getRandomColor() },
	{ text: "Web Development", size: 18, color: getRandomColor() },
	{ text: "Programming", size: 15, color: getRandomColor() },
	// Добавьте больше тегов и настройте их размеры и цвета
	// Добавьте больше тегов и настройте их размеры
];

// Настройки для облака тегов
const width = 800; // Ширина контейнера
const height = 400; // Высота контейнера

// Генерируем случайный цвет в формате RGB
function getRandomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}

const appLink = `https://script.google.com/macros/s/AKfycbxkQkFFvlRylt4iu57ZYXqbvEr5oQVOdpLTh3OtEVSqOulGzyYOuVGexnduDaXK_-sB/exec`

async function getAllCourses() {
	try {
		const response = await axios.get(appLink)
		console.log(response.data);

	
		// Функция для сравнения двух массивов объектов
		function arraysOfObjectsAreEqual(arr1, arr2) {
			if (arr1.length !== arr2.length) {
				return false;
			}

			for (let i = 0; i < arr1.length; i++) {
				const obj1 = arr1[i];
				const obj2 = arr2[i];

				// Сравниваем каждое свойство объекта
				if (
					obj1.text !== obj2.text ||
					obj1.size !== obj2.size
				) {
					return false; // Если хотя бы одно свойство отличается, возвращаем false
				}
			}

			// Если массивы объектов идентичны, возвращаем true
			return true;
		}

		// Вызываем функцию сравнения и выполняем другую функцию, если массивы отличаются
		if (!arraysOfObjectsAreEqual(tags, response.data)) {
			// Ваши действия, если массивы отличаются
			tags = response.data

			tags.map(tag => tag.color = getRandomColor())
			updateTagCloud(tags)
			console.log('render');
			// Здесь вы можете вызвать нужную вам функцию
		} else {
			console.log('ожидание');
			// return
		}
		
	} catch (err) {
		console.error(err)
	}
}

getAllCourses()

// Создаем функцию для создания облака тегов
function createTagCloud() {
	d3.layout.cloud()
		// .size([width, height])
		.words(tags)
		.padding(5)
		.timeInterval(2000)
		.rotate(function () { return ~~(Math.random() * 2) * 90; }) // Случайные углы поворота
		.fontSize(d => d.size)
		.on("end", draw)
		.start();

	function draw(words) {
		d3.select("#tagCloud").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${width / 2},${height / 2})`)
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.style("font-size", d => `${d.size}px`)
			.style("fill", d => d.color)
			.attr("text-anchor", "middle")
			.attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
			.text(d => d.text);
	}
}

function updateTagCloud(newTags) {
	// Удалите текущее облако тегов, если оно существует
	d3.select("#tagCloud svg").remove();

	// Создайте новое облако тегов с новыми данными
	d3.layout.cloud()
		// .size([width, height])
		.words(newTags)
		.padding(5)
		.rotate(function () { return ~~(Math.random() * 2) * 90; }) // Случайные углы поворота
		.fontSize(d => d.size)
		.on("end", draw)
		.start();

	function draw(words) {
		d3.select("#tagCloud").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${width / 2},${height / 2})`)
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.style("font-size", d => `${d.size}px`)
			.style("fill", d => d.color) // Применяем цвет к тексту на основе данных
			.attr("text-anchor", "middle")
			.attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
			.text(d => d.text);
	}
}

// Вызываем функцию для создания облака тегов
createTagCloud();

