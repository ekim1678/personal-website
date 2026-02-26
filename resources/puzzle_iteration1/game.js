/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/


"use strict"; // Do NOT remove this directive!

//sprite global variables
var level = 1;
var currentSprite = null;
var sprite1;
let sprite1_xmin;
let sprite1_xmax;
let sprite1_ymin;
let sprite1_ymax;
var sprite2;
let sprite2_xmin;
let sprite2_xmax;
let sprite2_ymin;
let sprite2_ymax;
var sprite3;
let sprite3_xmin;
let sprite3_xmax;
let sprite3_ymin;
let sprite3_ymax;
var solution; //stores image of solution
var startX;
var startY;
let gameComplete = false;
let dragging = false;
var currentSpriteColor = PS.COLOR_BLACK;
let maxLevels = 8;

PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:
	PS.gridSize(15, 15);
	renderGrid();
	drawPanels();
	//define answer space
	PS.glyph(5, 0, "G");
	PS.glyph(6, 0, "O");
	PS.glyph(7, 0, "A");
	PS.glyph(8, 0, "L");
	PS.glyph(9, 0, ":");

	PS.statusText( "Lenses" );
	levelOne();
	//load sounds that will be used
	PS.audioLoad("fx_click"); //drag & drop
	PS.audioLoad("xylo_a4"); //sprite 1 select
	PS.audioLoad("xylo_b4"); //sprite 2 select
	PS.audioLoad("xylo_c5"); //sprite 3 select
	PS.audioLoad("perc_triangle"); //clear level sound
	PS.audioLoad("fx_tada"); //finished all stages sound

};

function renderGrid(){
	PS.gridPlane(0);
	PS.gridColor(PS.COLOR_WHITE);
	PS.border(PS.ALL, PS.ALL, 1);
	PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_GRAY);
	// 5x5 grid in the top center, top left corner at (5, 1),bottom right at (9, 6)
	//remove grid from answer space
	for(let col = 6; col < 9; col++) {
		for(let row = 2; row < 5; row++) {
			PS.border(col, row, {top : 0, left : 0, bottom : 0, right : 0});
		}
	}
	//remove grid from puzzle space
	for(let col = 6; col < 9; col++) {
		for(let row = 10; row < 15; row++) {
			PS.border(col, row, {top : 0, left : 0, bottom : 0, right : 0});
		}
	}
}

function drawPanels(){
	PS.gridPlane(0);
	//define edges of answer space grid
	for(let col= 5; col < 10; col++) {
		PS.border(col, 1, {top : 3, left : 0, bottom : 0, right : 0});
		PS.border(col, 5, {top : 0, left : 0, bottom : 3, right : 0});
	}
	for(let row = 1; row<6; row++){
		PS.border(5, row, {top : 0, left : 3, bottom : 0, right : 0});
		PS.border(9, row, {top : 0, left : 0, bottom : 0, right : 3});
	}
	// define corners
	PS.border(5, 1, {top : 3, left : 3, bottom : 0, right : 0});
	PS.border(5, 5, {top : 0, left : 3, bottom : 3, right : 0});
	PS.border(9, 1, {top : 3, left : 0, bottom : 0, right : 3});
	PS.border(9, 5, {top : 0, left : 0, bottom : 3, right : 3});

	//draw line between spaces
	for(let i = 0; i<15; i++){
		PS.border(i, 6, {top : 1, left : 1, bottom : 3, right : 1});
	}
	for(let col = 5; col < 10; col++){
		PS.borderColor(col, 1, PS.COLOR_BLACK);
		PS.borderColor(col, 5, PS.COLOR_BLACK);
	}
	for(let row = 1; row < 6; row++){
		PS.borderColor(5, row, PS.COLOR_BLACK);
		PS.borderColor(9, row, PS.COLOR_BLACK);
	}

	//define puzzle space
	// 5x5 grid in the bottom center, top left corner at (5, 10),bottom right at (9, 14)
	//define edges of puzzle space grid
	for(let col= 5; col < 10; col++) {
		PS.border(col, 10, {top : 3, left : 0, bottom : 0, right : 0});
		PS.border(col, 14, {top : 0, left : 0, bottom : 3, right : 0});
	}
	for(let row = 10; row<15; row++){
		PS.border(5, row, {top : 0, left : 3, bottom : 0, right : 0});
		PS.border(9, row, {top : 0, left : 0, bottom : 0, right : 3});
	}
	//define corners
	PS.border(5, 10, {top : 3, left : 3, bottom : 0, right : 0});
	PS.border(5, 14, {top : 0, left : 3, bottom : 3, right : 0});
	PS.border(9, 10, {top : 3, left : 0, bottom : 0, right : 3});
	PS.border(9, 14, {top : 0, left : 0, bottom : 3, right : 3});
	//set puzzle space grid to black
	for(let col = 5; col < 10; col++){
		PS.borderColor(col, 10, PS.COLOR_BLACK);
		PS.borderColor(col, 14, PS.COLOR_BLACK);
	}
	for(let row = 10; row < 15; row++){
		PS.borderColor(5, row, PS.COLOR_BLACK);
		PS.borderColor(9, row, PS.COLOR_BLACK);
	}
}

function reset(){
	PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	if(sprite1){
		PS.spriteDelete(sprite1);
		sprite1_xmin = 0;
		sprite1_xmax = 0;
		sprite1_ymin = 0;
		sprite1_ymax = 0;
	}
	if(sprite2){
		PS.spriteDelete(sprite2);
		sprite2_xmin = 0;
		sprite2_xmax = 0;
		sprite2_ymin = 0;
		sprite2_ymax = 0;
	}
	if(sprite3){
		PS.spriteDelete(sprite3);
		sprite3_xmin = 0;
		sprite3_xmax = 0;
		sprite3_ymin = 0;
		sprite3_ymax = 0;
	}
	renderGrid();
	drawPanels();
	switch (level){
		case 1:
			levelOne();
			break;
		case 2:
			levelTwo();
			 break;
		case 3:
			levelThree();
			break;
		case 4:
			levelFour();
			break;
		case 5:
			levelFive();
			break;
		case 6:
			levelSix();
			break;
		case 7:
			levelSeven();
			break;
		case 8:
			levelEight();
			break;
		default:
			levelOne();
			break;
	}
	gameComplete = false;
	selectMySprite(sprite1); //default select
	currentSprite = sprite1;
}

function setAnswer(){
	PS.gridPlane(0);
	PS.applyRect(5, 1, 5, 5, PS.alpha, 255);
	PS.imageBlit(solution, 5, 1);
}

function outline(sprite){
	let minimumx, maximumx, minimumy, maximumy;
	switch(currentSprite){
		case sprite1:
			PS.gridPlane(1);
			minimumx = sprite1_xmin;
			minimumy = sprite1_ymin;
			maximumx = sprite1_xmax;
			maximumy = sprite1_ymax;
			break;
		case sprite2:
			PS.gridPlane(2);
			minimumx = sprite2_xmin;
			minimumy = sprite2_ymin;
			maximumx = sprite2_xmax;
			maximumy = sprite2_ymax;
			break;
		case sprite3:
			PS.gridPlane(3);
			minimumx = sprite3_xmin;
			minimumy = sprite3_ymin;
			maximumx = sprite3_xmax;
			maximumy = sprite3_ymax;
			break;
		default:
			//PS.debug("default");
			return;
	}

	//if the edges of sprite are outside of the grid bounds, only draw the ones within them
	if(minimumx < 0){
		minimumx = 0;
	}
	if(minimumy < 0){
		minimumy = 0;
	}
	if(maximumx > 14){
		maximumx = 14;
	}
	if(maximumy > 14){
		maximumy = 14;
	}

	//PS.debug("Outline called y was " + minimumy);

	//remove grid from selected sprite
	for(let x = minimumx; x < maximumx; x++) {
		for(let y = minimumy; y < maximumy ; y++) {
			PS.border(x, y, {top : 0, left : 0, bottom : 0, right : 0});
			PS.borderColor(x, y, PS.COLOR_GRAY);
		}
	}

	//define edges of sprite
	for(let x = minimumx + 1; x < maximumx; x++) {
		PS.border(x, minimumy, {top : 3, left : 0, bottom : 0, right : 0});
		PS.border(x, maximumy, {top : 0, left : 0, bottom : 3, right : 0});
		PS.borderColor(x, minimumy, currentSpriteColor);
		PS.borderColor(x, maximumy, currentSpriteColor);
	}
	for(let y = minimumy + 1; y < maximumy ; y++){
		PS.border(minimumx, y, {top : 0, left : 3, bottom : 0, right : 0});
		PS.border(maximumx, y, {top : 0, left : 0, bottom : 0, right : 3});
		PS.borderColor(minimumx, y, currentSpriteColor);
		PS.borderColor(maximumx, y, currentSpriteColor);
	}

	//set corners
	PS.border(minimumx, minimumy, {top : 3, left : 3, bottom : 0, right : 0});
	PS.borderColor(minimumx, minimumy, currentSpriteColor);
	PS.border(minimumx, maximumy, {top : 0, left : 3, bottom : 3, right : 0});
	PS.borderColor(minimumx, maximumy, currentSpriteColor);
	PS.border(maximumx, minimumy, {top : 3, left : 0, bottom : 0, right : 3});
	PS.borderColor(maximumx, minimumy, currentSpriteColor);
	PS.border(maximumx, maximumy, {top : 0, left : 0, bottom : 3, right : 3});
	PS.borderColor(maximumx, maximumy, currentSpriteColor);
}

function removeColorOutline(sprite){
	let minimumx, minimumy, maximumx, maximumy;
	switch(sprite){
		case sprite1:
			PS.gridPlane(1);
			minimumx = sprite1_xmin;
			minimumy = sprite1_ymin;
			maximumx = sprite1_xmax;
			maximumy = sprite1_ymax;
			break;
		case sprite2:
			PS.gridPlane(2);
			minimumx = sprite2_xmin;
			minimumy = sprite2_ymin;
			maximumx = sprite2_xmax;
			maximumy = sprite2_ymax;
			break;
		case sprite3:
			PS.gridPlane(3);
			minimumx = sprite3_xmin;
			minimumy = sprite3_ymin;
			maximumx = sprite3_xmax;
			maximumy = sprite3_ymax;
			break;
		default:
			//PS.debug("default remove outline");
			return;
	}

	//if the edges of sprite are outside of the grid bounds, only draw the ones within them
	if(minimumx < 0){
		minimumx = 0;
	}
	if(minimumy < 0){
		minimumy = 0;
	}
	if(maximumx > 14){
		maximumx = 14;
	}
	if(maximumy > 14){
		maximumy = 14;
	}

	//remove grid from selected sprite
	for(let x = minimumx; x < maximumx; x++) {
		for(let y = minimumy; y < maximumy ; y++) {
			PS.border(x, y, {top : 0, left : 0, bottom : 0, right : 0});
			PS.borderColor(x, y, PS.COLOR_GRAY);
		}
	}

	//define edges of sprite
	for(let x = minimumx + 1; x < maximumx; x++) {
		PS.border(x, minimumy, {top : 3, left : 0, bottom : 0, right : 0});
		PS.border(x, maximumy, {top : 0, left : 0, bottom : 3, right : 0});
		PS.borderColor(x, minimumy, PS.COLOR_GRAY);
		PS.borderColor(x, maximumy, PS.COLOR_GRAY);
	}
	for(let y = minimumy + 1; y < maximumy ; y++){
		PS.border(minimumx, y, {top : 0, left : 3, bottom : 0, right : 0});
		PS.border(maximumx, y, {top : 0, left : 0, bottom : 0, right : 3});
		PS.borderColor(minimumx, y, PS.COLOR_GRAY);
		PS.borderColor(maximumx, y, PS.COLOR_GRAY);
	}

	//set corners
	PS.border(minimumx, minimumy, {top : 3, left : 3, bottom : 0, right : 0});
	PS.borderColor(minimumx, minimumy, PS.COLOR_GRAY);
	PS.border(minimumx, maximumy, {top : 0, left : 3, bottom : 3, right : 0});
	PS.borderColor(minimumx, maximumy, PS.COLOR_GRAY);
	PS.border(maximumx, minimumy, {top : 3, left : 0, bottom : 0, right : 3});
	PS.borderColor(maximumx, minimumy, PS.COLOR_GRAY);
	PS.border(maximumx, maximumy, {top : 0, left : 0, bottom : 3, right : 3});
	PS.borderColor(maximumx, maximumy, PS.COLOR_GRAY);
}

function checkAnswer(){
	let answerInput = PS.imageCapture(3, {left: 5, top: 10, width: 5, height: 5});
	return JSON.stringify(solution.data) === JSON.stringify(answerInput.data);
}

function moveMySprite(changex, changey){
	//PS.debug("in moveMySprite\n");
	//takes in the sprite to move and the amount to move it by on the y and x axes
	switch(currentSprite){
		case sprite1:
			PS.gridPlane(1);
			sprite1_xmin = sprite1_xmin + changex;
			sprite1_xmax = sprite1_xmax + changex;
			sprite1_ymin = sprite1_ymin + changey;
			sprite1_ymax = sprite1_ymax + changey;
			PS.spriteMove(sprite1, sprite1_xmin, sprite1_ymin);
			break;
		case sprite2:
			PS.gridPlane(2);
			sprite2_xmin = sprite2_xmin + changex;
			sprite2_xmax = sprite2_xmax + changex;
			sprite2_ymin = sprite2_ymin + changey;
			sprite2_ymax = sprite2_ymax + changey;
			PS.spriteMove(sprite2, sprite2_xmin, sprite2_ymin);
			break;
		case sprite3:
			PS.gridPlane(3);
			sprite3_xmin = sprite3_xmin + changex;
			sprite3_xmax = sprite3_xmax + changex;
			sprite3_ymin = sprite3_ymin + changey;
			sprite3_ymax = sprite3_ymax + changey;
			PS.spriteMove(sprite3, sprite3_xmin, sprite3_ymin);
			break;
		default:
			break;
	}
	PS.audioPlay("fx_click", { volume: 0.3 });
	renderGrid();
	outline(currentSprite);
	drawPanels();
	setAnswer();
	if(checkAnswer()){
		nextLevel();
	}
}

function selectMySprite(sprite){
	switch(sprite){
		case sprite1:
			currentSpriteColor = PS.COLOR_BLUE;
			PS.audioPlay("xylo_a4", { volume: 0.3 });
			break;
		case sprite2:
			currentSpriteColor = PS.COLOR_RED;
			PS.audioPlay("xylo_b4", { volume: 0.3 });
			break;
		case sprite3:
			currentSpriteColor = PS.COLOR_GREEN;
			PS.audioPlay("xylo_c5", { volume: 0.3 });
			break;
		default: //no sprite selected
			return;
	}
	outline(sprite);
	drawPanels();
}

PS.touch = function( x, y, data, options ) {
	if(!dragging){ //&& isInSprite(currentSprite, x, y)
		//need to not be dragging one already, and also in the correct sprite
		startX = x;
		startY = y;
		dragging = true;
		//PS.debug("Mouse down in sprite\n");
	}
};

PS.release = function( x, y, data, options ) {
	if(dragging){
		moveMySprite(x-startX, y-startY);
		//PS.debug("X was " + (x-startX) + "Y was " + (y-startY) + "\n");
	}
	dragging = false;
};

PS.exitGrid = function( options ) {
	dragging = false;
};

PS.keyDown = function( key, shift, ctrl, options ) {
	switch(key){
		case PS.KEY_PAD_1:
			//PS.debug("Pressed 1\n");
			if(currentSprite !== sprite1){
				currentSprite = sprite1;
				PS.debug("Selected sprite: Blue\n");
			}
			break;
		case 49:
			if(currentSprite !== sprite1){
				removeColorOutline(currentSprite);
				currentSprite = sprite1;
				PS.debug("Selected sprite: Blue\n");
			}
			break;
		case PS.KEY_PAD_2:
			if(currentSprite !== sprite2){
				removeColorOutline(currentSprite);
				currentSprite = sprite2;
				PS.debug("Selected sprite: Red\n");
			}
			//PS.debug("Pressed 2\n");
			break;
		case 50:
			if(currentSprite !== sprite2){
				removeColorOutline(currentSprite);
				currentSprite = sprite2;
				PS.debug("Selected sprite: Red\n");
			}
			break;
		case PS.KEY_PAD_3:
			if(level === 1 || level === 2){
				break;
			}
			//PS.debug("Pressed 3\n");
			if(currentSprite !== sprite3){
				removeColorOutline(currentSprite);
				currentSprite = sprite3;
				PS.debug("Selected sprite: Green\n");
			}
			break;
		case 51:
			if(level === 1 || level === 2){
				break;
			}
			//PS.debug("Pressed 3\n");
			if(currentSprite !== sprite3){
				removeColorOutline(currentSprite);
				currentSprite = sprite3;
				PS.debug("Selected sprite: Green\n");
			}
			break;
		case 32: //space bar resets level
			removeColorOutline(currentSprite);
			reset();
			PS.debug("Level reset! \n");
			break;
		default:
			return;
	}
	selectMySprite(currentSprite);
};

function nextLevel(){
	PS.debug("Cleared level " + level + "! \n");
	PS.audioPlay("perc_triangle", { volume: 0.3 });
	if(level < maxLevels){
		level += 1;
		reset();
	}
	else{
		if(gameComplete){
			return;
		}
		PS.debug("Congratulations, you finished all the levels available!\n");
		PS.audioPlay("fx_tada", { volume: 0.3 });
		gameComplete = true;
	}
}

function levelOne(){
	level = 1;
	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(5, 5);
	PS.spriteMove(sprite1, 5, 1);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spritePlane(sprite1, 1);
	PS.spriteSolidAlpha(sprite1, 128);


	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(5, 5);
	PS.spriteMove(sprite2, 5, 1);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});

	PS.spriteMove(sprite1, 0, 10);
	sprite1_xmin = 0;
	sprite1_ymin = 10;
	sprite1_xmax = 4;
	sprite1_ymax = 14;
	PS.spriteMove(sprite2, 10, 10);
	sprite2_xmin = 10;
	sprite2_ymin = 10;
	sprite2_xmax = 14;
	sprite2_ymax = 14;
	setAnswer();

}

function levelTwo(){
	level = 2;
	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(5, 5);
	PS.spriteMove(sprite1, 5, 1);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spriteSolidAlpha(sprite1, 128);
	PS.spritePlane(sprite1, 1);


	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(5, 5);
	PS.spriteMove(sprite2, 4, 1);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});

	PS.spriteMove(sprite1, 0, 10);
	sprite1_xmin = 0;
	sprite1_ymin = 10;
	sprite1_xmax = 4;
	sprite1_ymax = 14;
	PS.spriteMove(sprite2, 10, 10);
	sprite2_xmin = 10;
	sprite2_ymin = 10;
	sprite2_xmax = 14;
	sprite2_ymax = 14;
	setAnswer();
}

function levelThree(){
	level = 3;
	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(2, 5);
	PS.spriteMove(sprite1, 5, 1);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spriteSolidAlpha(sprite1, 128);
	PS.spritePlane(sprite1, 1);

	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(3, 2);
	PS.spriteMove(sprite2, 4, 0);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	PS.gridPlane(3);
	sprite3 = PS.spriteSolid(5, 5);
	PS.spriteMove(sprite3, 5, 1);
	PS.spriteSolidColor(sprite3, PS.COLOR_GREEN);
	PS.spritePlane(sprite3, 3);
	PS.spriteSolidAlpha(sprite3, 128);


	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});
	PS.spriteMove(sprite1, 1, 10);
	sprite1_xmin = 1;
	sprite1_ymin = 10;
	sprite1_xmax = 2;
	sprite1_ymax = 14;
	PS.spriteMove(sprite2, 1, 8);
	sprite2_xmin = 1;
	sprite2_ymin = 8;
	sprite2_xmax = 3;
	sprite2_ymax = 9;
	PS.spriteMove(sprite3, 10, 10);
	sprite3_xmin = 10;
	sprite3_ymin = 10;
	sprite3_xmax = 14;
	sprite3_ymax = 14;
	setAnswer();
}

function levelFour(){
	level = 4;

	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(3, 3);
	PS.spriteMove(sprite1, 6, 1);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spriteSolidAlpha(sprite1, 128);
	PS.spritePlane(sprite1, 1);

	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(2, 5);
	PS.spriteMove(sprite2, 5, 1);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	PS.gridPlane(3);
	sprite3 = PS.spriteSolid(6, 3);
	PS.spriteMove(sprite3, 5, 4);
	PS.spriteSolidColor(sprite3, PS.COLOR_GREEN);
	PS.spritePlane(sprite3, 3);
	PS.spriteSolidAlpha(sprite3, 128);

	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});
	PS.spriteMove(sprite1, 10, 7);
	sprite1_xmin = 10;
	sprite1_ymin = 7;
	sprite1_xmax = 12;
	sprite1_ymax = 9;
	PS.spriteMove(sprite2, 0, 8);
	sprite2_xmin = 0;
	sprite2_ymin = 8;
	sprite2_xmax = 1;
	sprite2_ymax = 12;
	PS.spriteMove(sprite3, 10, 13);
	sprite3_xmin = 10;
	sprite3_ymin = 13;
	sprite3_xmax = 15;
	sprite3_ymax = 15;
	setAnswer();
}


function levelFive(){
	level = 5;
	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(4, 2);
	PS.spriteMove(sprite1, 6, 1);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spriteSolidAlpha(sprite1, 128);
	PS.spritePlane(sprite1, 1);

	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(5, 4);
	PS.spriteMove(sprite2, 4, 1);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	PS.gridPlane(3);
	sprite3 = PS.spriteSolid(4, 2);
	PS.spriteMove(sprite3, 6, 2);
	PS.spriteSolidColor(sprite3, PS.COLOR_GREEN);
	PS.spritePlane(sprite3, 3);
	PS.spriteSolidAlpha(sprite3, 128);


	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});
	PS.spriteMove(sprite1, 1, 13);
	sprite1_xmin = 1;
	sprite1_ymin = 13;
	sprite1_xmax = 4;
	sprite1_ymax = 14;
	PS.spriteMove(sprite2, 0, 8);
	sprite2_xmin = 0;
	sprite2_ymin = 8;
	sprite2_xmax = 4;
	sprite2_ymax = 11;
	PS.spriteMove(sprite3, 10, 10);
	sprite3_xmin = 10;
	sprite3_ymin = 10;
	sprite3_xmax = 13;
	sprite3_ymax = 11;
	setAnswer();
}


function levelSix(){
	level = 6;
	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(2, 5);
	PS.spriteMove(sprite1, 6, 1);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spriteSolidAlpha(sprite1, 128);
	PS.spritePlane(sprite1, 1);

	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(5, 4);
	PS.spriteMove(sprite2, 4, 1);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	PS.gridPlane(3);
	sprite3 = PS.spriteSolid(2, 2);
	PS.spriteMove(sprite3, 5, 4);
	PS.spriteSolidColor(sprite3, PS.COLOR_GREEN);
	PS.spritePlane(sprite3, 3);
	PS.spriteSolidAlpha(sprite3, 128);


	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});
	PS.spriteMove(sprite1, 10, 7);
	sprite1_xmin = 10;
	sprite1_ymin = 7;
	sprite1_xmax = 11;
	sprite1_ymax = 11;
	PS.spriteMove(sprite2, 0, 8);
	sprite2_xmin = 0;
	sprite2_ymin = 8;
	sprite2_xmax = 4;
	sprite2_ymax = 11;
	PS.spriteMove(sprite3, 10, 13);
	sprite3_xmin = 10;
	sprite3_ymin = 13;
	sprite3_xmax = 11;
	sprite3_ymax = 14;
	setAnswer();
}

function levelSeven(){
	level = 7;
	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(2, 3);
	PS.spriteMove(sprite1, 9, 1);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spriteSolidAlpha(sprite1, 128);
	PS.spritePlane(sprite1, 1);

	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(3, 4);
	PS.spriteMove(sprite2, 9, 2);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	PS.gridPlane(3);
	sprite3 = PS.spriteSolid(4, 2);
	PS.spriteMove(sprite3, 5, 1);
	PS.spriteSolidColor(sprite3, PS.COLOR_GREEN);
	PS.spritePlane(sprite3, 3);
	PS.spriteSolidAlpha(sprite3, 128);


	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});
	PS.spriteMove(sprite1, 2, 7);
	sprite1_xmin = 2;
	sprite1_ymin = 7;
	sprite1_xmax = 3;
	sprite1_ymax = 9;
	PS.spriteMove(sprite2, 1, 11);
	sprite2_xmin = 1;
	sprite2_ymin = 11;
	sprite2_xmax = 3;
	sprite2_ymax = 14;
	PS.spriteMove(sprite3, 10, 10);
	sprite3_xmin = 10;
	sprite3_ymin = 10;
	sprite3_xmax = 13;
	sprite3_ymax = 11;
	setAnswer();
}

function levelEight(){
	level = 8;
	//define sprites
	PS.gridPlane(1);
	sprite1 = PS.spriteSolid(3, 4);
	PS.spriteMove(sprite1, 9, 5);
	PS.spriteSolidColor(sprite1, PS.COLOR_BLUE);
	PS.spriteSolidAlpha(sprite1, 128);
	PS.spritePlane(sprite1, 1);

	PS.gridPlane(2);
	sprite2 = PS.spriteSolid(2, 5);
	PS.spriteMove(sprite2, 9, 5);
	PS.spriteSolidColor(sprite2, PS.COLOR_RED);
	PS.spritePlane(sprite2, 2);
	PS.spriteSolidAlpha(sprite2, 128);

	PS.gridPlane(3);
	sprite3 = PS.spriteSolid(7, 3);
	PS.spriteMove(sprite3, 9, 5);
	PS.spriteSolidColor(sprite3, PS.COLOR_GREEN);
	PS.spritePlane(sprite3, 3);
	PS.spriteSolidAlpha(sprite3, 128);

	solution = PS.imageCapture(PS.DEFAULT, {left : 5, top : 1, width : 5, height : 5});
	PS.spriteMove(sprite1, 10, 7);
	sprite1_xmin = 10;
	sprite1_ymin = 7;
	sprite1_xmax = 12;
	sprite1_ymax = 10;
	PS.spriteMove(sprite2, 0, 8);
	sprite2_xmin = 0;
	sprite2_ymin = 8;
	sprite2_xmax = 1;
	sprite2_ymax = 12;
	PS.spriteMove(sprite3, 10, 13);
	sprite3_xmin = 10;
	sprite3_ymin = 13;
	sprite3_xmax = 16;
	sprite3_ymax = 15;
	setAnswer();
}