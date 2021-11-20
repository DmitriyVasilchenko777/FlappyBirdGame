let $canvas = document.getElementById("canvas");

let context = $canvas.getContext("2d");

// Загрузка изображений

let bird = new Image(); 
let background = new Image(); 
let bottom = new Image(); 
let trubaTop = new Image(); 
let trubaBottom = new Image(); 

bird.src = "../IMG/Bird.png";
background.src = "../IMG/Background.png";
bottom.src = "../IMG/Bottom.png";
trubaTop.src = "../IMG/TrubaTop.png";
trubaBottom.src = "../IMG/TrubaBottom.png";

// Добавляем звуковые файлы 

let pryshokAudio = new Audio();
let scoreAudio = new Audio();

pryshokAudio.src = "../AUDIO/Pryshok.mp3";
scoreAudio.src = "../AUDIO/Score.mp3";

// Переменная для хранения счета

let score = 0;

// Позиция птицы

let xPosition = 10;
let yPosition = 150;
let grav = 1.5;

let rastoenieMeshduTrubamiPoVerticali = 90;

// При нажатии на какую-либо кнопку

document.addEventListener("keydown", prishokMoveUp);

// При прыжке птицы уменьшаем растояние у координаты и проигрываем звук

function prishokMoveUp()
{
	yPosition -= 30;
	pryshokAudio.play();	
}

// Создание блококв

let pipe = [];

pipe[0] =
{
	x: $canvas.width,
	y: 0
}

// Функция для рисовки обьектов на canvas

function draw()
{
	context.drawImage(background, 0, 0);

	for(let i = 0; i < pipe.length; i++)
	{
		context.drawImage(trubaTop, pipe[i].x, pipe[i].y);
		context.drawImage(trubaBottom, pipe[i].x, pipe[i].y + trubaTop.height + rastoenieMeshduTrubamiPoVerticali);

		pipe[i].x--;

		// Если труба достигла растояние в 125 по горезонтали то генерируем новый обьект трубы

		if(pipe[i].x === 125)
		{
			pipe.push
			(
				{
					x: $canvas.width,
					y: Math.floor(Math.random() * trubaTop.height) - trubaTop.height
				}
		    );
		}

		// Проверка на столкновения по вертикали и горизонтали 

		if
		(
			xPosition + bird.width >= pipe[i].x
			&& xPosition <= pipe[i].x + trubaTop.width
			&& (yPosition <= pipe[i].y + trubaTop.height || yPosition + bird.height >= pipe[i].y + trubaTop.height + rastoenieMeshduTrubamiPoVerticali)
			|| yPosition + bird.height >= $canvas.height - bottom.height
		)
		{
			// Перезагрузка страницы при столкновении

			location.reload();
		}

		// Если труба находиться позади птицы на ростаянии 5px тогда увеличиваем счет на 1 и проигрываем звук

		if(pipe[i].x === 5)
		{
			score++;
			scoreAudio.play();
		}
	}


	context.drawImage(bottom, 0, $canvas.height - bottom.height);
	context.drawImage(bird, xPosition, yPosition);

	yPosition += grav;

	// Создание надписи Счет

	context.fillStyle = "#000";
	context.font = "20px Verdana";
	context.fillText("Счет: " + score, 10, $canvas.height - 20);

	// Функция сробатывает постаянно для гравитации птицы

	requestAnimationFrame(draw);
}

// Если последнее изображение загружено вызываем функцию draw

trubaBottom.onload = draw;