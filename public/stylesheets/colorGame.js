
const PAGE_BACKGROUNG = "#232323";
const NumSquaresEasy = 3;
const NumSquaresMedium = 6;
const NumSquaresHard = 9;
var body = document.querySelector("body");
body.style.backgroundColor = PAGE_BACKGROUNG;



var numOfSquares = 9;
var colors = generateRandomColors(numOfSquares);
var squares = document.querySelectorAll(".squares");

var pickedColor = pickColor();

//display the RGB value of picked color to the page
var colorValueDisplay = document.querySelector("#colorValueDisplay");
colorValueDisplay.textContent = pickedColor;

var resultMessage = document.querySelector("#resultMessage");

var h1 = document.querySelector("h1");

var bar = document.querySelector("#bar");

var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var mediumButton = document.querySelector("#mediumButton");
var hardButton = document.querySelector("#hardButton");

//initialize all squares
for (var i = 0; i < squares.length; i++) {
	//add initial color to squares
	squares[i].style.backgroundColor = colors[i]; 

	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		//Compare this.color to pickedColor
		if (clickedColor === pickedColor) {
			var userWin = true;
			changeColor(pickedColor);
			resultMessage.textContent = "Correct";
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again";
		} else {
			var UserWin = false;
			this.style.backgroundColor = PAGE_BACKGROUNG;
			resultMessage.textContent = "Wrong! Try Again STUPID!";
		}
	});
}

// Reset Actions
resetButton.addEventListener("click", function() {
	//generate random colors
	colors = generateRandomColors(numOfSquares);
	//pick one of them
	pickedColor = pickColor();
	//Change the displayed RGB color on page
	colorValueDisplay.textContent = pickedColor;
	//clear title background
	//change color of squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
	//clear result message
	resultMessage.textContent = "";
	//clear title background
	h1.style.backgroundColor = "dimgray";
	//change button display to "new color"
	this.textContent = "New Color";
});


// when easybutton is clicked
easyButton.addEventListener("click",function() {
	hardButton.classList.remove("selected");
	mediumButton.classList.remove("selected");
	easyButton.classList.add("selected");
	numOfSquares = NumSquaresEasy;
	//generate easyColors
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorValueDisplay.textContent = pickedColor;
	//clear title background
	h1.style.backgroundColor = "dimgray";
	// deal with squares, for EASY part, assign new color
	// for (HARD - EASY) part, hide them
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
});

// when mediumbutton is clicked
mediumButton.addEventListener("click",function(){
	easyButton.classList.remove("selected");
	hardButton.classList.remove("selected");
	mediumButton.classList.add("selected");
	numOfSquares = NumSquaresMedium;
	// deal with squares
	// for (HARD - MEDIUM) part, unhide them
	// for each square, assign new colors
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorValueDisplay.textContent = pickedColor;
	//clear title background
	h1.style.backgroundColor = "dimgray";
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
});

// when hardButton is clicked
hardButton.addEventListener("click", function() {
	easyButton.classList.remove("selected");
	mediumButton.classList.remove("selected");
	hardButton.classList.add("selected");
	numOfSquares = NumSquaresHard;
	// deal with squares
	// for (HARD - EASY) part, unhide them
	// for each square, assign new colors
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorValueDisplay.textContent = pickedColor;
	//clear title background
	h1.style.backgroundColor = "dimgray";
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.display = "block";
		squares[i].style.backgroundColor = colors[i];
	}
});
//when pick correct answer, change all squares to the same color
function changeColor(color) {
	//when correct, set all squares to the pickedColor
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

//randomly pick one of color in the tabel
function pickColor() {
	var randomNum = Math.floor(Math.random() * colors.length);
	return colors[randomNum];
}

//generate (num) random colors and store in an array
function generateRandomColors(num) {
	//make an array
	var colors = [];
	//add num random arrays to arrays
	for (var i = 0; i < num; i++) {
		colors.push(randomColor());
	}
	return colors;
}

//generate a random color, store in String in "rgb(r, g, b)" format
function randomColor() {
	var rValue = Math.floor(Math.random()*256);
	var gValue = Math.floor(Math.random()*256);
	var bValue = Math.floor(Math.random()*256);
	var result = "rgb(" + rValue +", " + gValue + ", " + bValue +")";
	return result;
}

//when (reset) button is clicked
void function colorReset() {
	//generate random colors
	colors = generateRandomColors(6);
	//pick one of them
	pickedColor = pickColor();
	//Change the displayed RGB color on page
	colorValueDisplay.textContent = pickedColor;
	//change color of squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
}