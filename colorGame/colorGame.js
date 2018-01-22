//Variable for the number of squares
var numSquares = 6;
//set colors to use
colors = [];
//call the pickedColor function to get a random number
var pickedColor;
//select square classes - squares becomes a NodeList 
var squares = document.querySelectorAll(".square");
//select the colorDisplay id for h1 updates
var colorDisplay = document.getElementById("colorDisplay");
//select the message id 
var messageDisplay = document.querySelector("#message");
//select h1
var h1 = document.querySelector("h1");
//select button for reset
var resetButton = document.querySelector("#reset");

//select mode buttons
var modeButtons = document.querySelectorAll(".mode");

//call to function init()
init();

//initializes the game
function init() {

setupModeButtons();
setupSquares();
reset();

}

//setup mode buttons
function setupModeButtons(){
	//loop through mode buttons
	for(var i = 0; i < modeButtons.length; i++) {
		//mode buttons event listeners
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//if easy set numSquares to 3, else 6
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //? ternary operater like if else
			reset();
		});
	}
}

//setup squares
function setupSquares() {
	//loop through the squares NodeList
	for(var i = 0; i < squares.length; i++) {
		//square event listeners
		squares[i].addEventListener("click", function(){
			//grab color of clicked square - use this in place of squares[i]
			var clickedColor = this.style.backgroundColor; 
			//compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again?";
				h1.style.backgroundColor = clickedColor;
				//call changeColors function to change all square colors
				changeColors(clickedColor);
			}else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

//reset
function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//change color display to match new colors
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	//reset to New Colors
	resetButton.textContent = "New Colors"; //use this instead of resetButton
	//reset message to empty string
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) { //if there is a color
			//bring all squares back
			squares[i].style.display = "block"; 
			//put color in that square
			squares[i].style.backgroundColor = colors[i];
		} 	else {
			squares[i].style.display = "none";
		}
	}
	//reset h1 background color
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

//changes the background color of each square
function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

//generates a random number index
function pickColor() {
	//sets random equal to a random number
	//Math.random finds a number between 0 and 1
	//Then multiple number between 0 and 1 but the length of colors array
	//Math.floor chops off the decimal
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//generate random colors 
function generateRandomColors(num) {
	//make an array
	var arr = [];
	//repeat num times
	for(var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

//random color
function randomColor() {
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; //add spaces after commas

}


