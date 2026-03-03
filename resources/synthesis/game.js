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

let strand1 = [];
let strand2 = [];
let slot1base1;
let slot1base2;
let slot2base1;
let slot2base2;
let slot3base1;
let slot3base2;
let slot4base1;
let slot4base2;
let slot5base1;
let slot5base2;
let slot6base1;
let slot6base2;
let slot7base1;
let slot7base2;
let slot8base1;
let slot8base2;
let slot9base1;
let slot9base2;
let slot10base1;
let slot10base2;
let slot11base1;
let slot11base2;
let slot12base1;
let slot12base2;
let score;
var timer;
let gameOver;
let startIndex = 0;
let strand1slots = [];
let strand2slots = [];

PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:
	PS.gridSize(30, 30);

	PS.statusText( "Synthesis" );
	PS.seed(0.5); //set seed

	//initialize sprites for bases
	slot1base1 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot1base1, 2, 2);
	PS.spriteSolidColor(slot1base1, PS.COLOR_WHITE);
	slot1base2 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot1base2, 5, 2);
	PS.spriteSolidColor(slot1base2, PS.COLOR_WHITE);
	slot2base1 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot2base1, 3, 4);
	PS.spriteSolidColor(slot2base1, PS.COLOR_WHITE);
	slot2base2 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot2base2, 5, 4);
	PS.spriteSolidColor(slot2base2, PS.COLOR_WHITE);
	slot3base1 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot3base1, 3, 8);
	PS.spriteSolidColor(slot3base1, PS.COLOR_WHITE);
	slot3base2 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot3base2, 5, 8);
	PS.spriteSolidColor(slot3base2, PS.COLOR_WHITE);
	slot4base1 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot4base1, 2, 10);
	PS.spriteSolidColor(slot4base1, PS.COLOR_WHITE);
	slot4base2 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot4base2, 5, 10);
	PS.spriteSolidColor(slot4base2, PS.COLOR_WHITE);
	slot5base1 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot5base1, 2, 12);
	PS.spriteSolidColor(slot5base1, PS.COLOR_WHITE);
	slot5base2 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot5base2, 5, 12);
	PS.spriteSolidColor(slot5base2, PS.COLOR_WHITE);
	slot6base1 = PS.spriteSolid(1, 1);
	PS.spriteMove(slot6base1, 4, 14);
	PS.spriteSolidColor(slot6base1, PS.COLOR_WHITE);
	slot6base2 = PS.spriteSolid(1, 1);
	PS.spriteMove(slot6base2, 5, 14);
	PS.spriteSolidColor(slot6base2, PS.COLOR_WHITE);
	slot7base1 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot7base1, 3, 17);
	PS.spriteSolidColor(slot7base1, PS.COLOR_WHITE);
	slot7base2 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot7base2, 5, 17);
	PS.spriteSolidColor(slot7base2, PS.COLOR_WHITE);
	slot8base1 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot8base1, 2, 19);
	PS.spriteSolidColor(slot8base1, PS.COLOR_WHITE);
	slot8base2 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot8base2, 5, 19);
	PS.spriteSolidColor(slot8base2, PS.COLOR_WHITE);
	slot9base1 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot9base1, 2, 21);
	PS.spriteSolidColor(slot9base1, PS.COLOR_WHITE);
	slot9base2 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot9base2, 5, 21);
	PS.spriteSolidColor(slot9base2, PS.COLOR_WHITE);
	slot10base1 = PS.spriteSolid(1, 1);
	PS.spriteMove(slot10base1, 4, 23);
	PS.spriteSolidColor(slot10base1, PS.COLOR_WHITE);
	slot10base2 = PS.spriteSolid(1, 1);
	PS.spriteMove(slot10base2, 5, 23);
	PS.spriteSolidColor(slot10base2, PS.COLOR_WHITE);
	slot11base1 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot11base1, 3, 26);
	PS.spriteSolidColor(slot11base1, PS.COLOR_WHITE);
	slot11base2 = PS.spriteSolid(2, 1);
	PS.spriteMove(slot11base2, 5, 26);
	PS.spriteSolidColor(slot11base2, PS.COLOR_WHITE);
	slot12base1 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot12base1, 2, 28);
	PS.spriteSolidColor(slot12base1, PS.COLOR_WHITE);
	slot12base2 = PS.spriteSolid(3, 1);
	PS.spriteMove(slot12base2, 5, 28);
	PS.spriteSolidColor(slot12base2, PS.COLOR_WHITE);

	//push to arrays
	strand1slots.push(slot1base1);
	strand1slots.push(slot2base1);
	strand1slots.push(slot3base1);
	strand1slots.push(slot4base1);
	strand1slots.push(slot5base1);
	strand1slots.push(slot6base1);
	strand1slots.push(slot7base1);
	strand1slots.push(slot8base1);
	strand1slots.push(slot9base1);
	strand1slots.push(slot10base1);
	strand1slots.push(slot11base1);
	strand1slots.push(slot12base1);

	strand2slots.push(slot1base2);
	strand2slots.push(slot2base2);
	strand2slots.push(slot3base2);
	strand2slots.push(slot4base2);
	strand2slots.push(slot5base2);
	strand2slots.push(slot6base2);
	strand2slots.push(slot7base2);
	strand2slots.push(slot8base2);
	strand2slots.push(slot9base2);
	strand2slots.push(slot10base2);
	strand2slots.push(slot11base2);
	strand2slots.push(slot12base2);

	for(let i = 0; i < 12; i++){ //draw the initial helix to solve
		generateRandomBase();
	}

	score = 0;
	drawHelix();
	PS.glyph(13, 1, "S");
	PS.glyph(14, 1, "C");
	PS.glyph(15, 1, "O");
	PS.glyph(16, 1, "R");
	PS.glyph(17, 1, "E");
	PS.glyph(18, 1, ":");

	gameOver = false;
	timer = PS.timerStart(60, frame);
	//remove grid lines
	PS.border(PS.ALL, PS.ALL, {top : 0, left : 0, bottom : 0, right : 0});
	//draw line separator
	for(let i = 0; i < 30; i++){
		PS.border(11, i, {top : 0, left : 3, bottom : 0, right : 0});
		PS.borderColor(11, i, PS.COLOR_BLACK);
	}

	displayBases();

	//load sounds that will be used
	PS.audioLoad("fx_click"); //drag & drop
	PS.audioLoad("xylo_a4"); //sprite 1 select
	PS.audioLoad("xylo_b4"); //sprite 2 select
	PS.audioLoad("xylo_c5"); //sprite 3 select
	PS.audioLoad("perc_triangle"); //clear level sound
	PS.audioLoad("fx_tada"); //finished all stages sound

};

function frame(){
	if(!gameOver){
		updateScore();
		moveDown();
		displayBases();
	}
	else{
		PS.debug("Game Over! Your score was " + score + "\n");
		PS.timerStop(timer);
	}
}

function updateScore(){
	//score glyph text ends at (18, 1) so the actual score should start at (19, 1)
	score += 1;
	const scoreStr = String(score);
	let scoreLength = scoreStr.length;
	for(let i = 0; i < scoreLength; i++){
		PS.glyph(19+i, 1, scoreStr[i]);
	}
}

//yellow is A - 1
//blue is C - 2
//red is T - 3
//green is G - 4
function moveDown(){
	generateRandomBase();
	for(let i = 0; i < strand1slots.length; i++){ //strand1 and strand2 should be the same length
		//get strand1 color of next item and set it to the current item
		let baseColor;

		switch(strand1[startIndex + i + 1]){ //get the next
			case 1:
				baseColor = PS.COLOR_YELLOW;
				break;
			case 2:
				baseColor = PS.COLOR_BLUE;
				break;
			case 3:
				baseColor = PS.COLOR_RED;
				break;
			case 4:
				baseColor = PS.COLOR_GREEN;
				break;
		}

		PS.spriteSolidColor(strand1slots[i], baseColor);
		//get strand2 color of next item and set it to the current item
		switch(strand2[startIndex + i + 1]){ //get the next
			case 0:
				if (i >= strand2slots.length) break;
				baseColor = PS.COLOR_WHITE;
				break;
			case 1:
				if (i >= strand2slots.length) break;
				baseColor = PS.COLOR_YELLOW;
				break;
			case 2:
				if (i >= strand2slots.length) break;
				baseColor = PS.COLOR_BLUE;
				break;
			case 3:
				if (i >= strand2slots.length) break;
				baseColor = PS.COLOR_RED;
				break;
			case 4:
				if (i >= strand2slots.length) break;
				baseColor = PS.COLOR_GREEN;
				break;
		}
		PS.spriteSolidColor(strand2slots[i], baseColor);
	}
	startIndex += 1;
}

// 4 Col for every strand1, 5col for every strand2, different rows

//yellow is A - 1
//blue is C - 2
//red is T - 3
//green is G - 4
function displayBases(){
	for(let i = startIndex; i < startIndex+12; i++){ //using start index since the strand will move
		if (i >= strand1slots.length) break;
		switch(strand1[i]){ //get the base
			case 1:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_YELLOW);
				//PS.glyph(4, , "A");
				break;
			case 2:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_BLUE);
				break;
			case 3:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_RED);
				break;
			case 4:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_GREEN);
				break;
		}
		if (i >= strand2slots.length) break;
		switch(strand2[i]){
			case 0: //user needs to fill in
				//do nothing
				break;
			case 1:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_YELLOW);
				break;
			case 2:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_BLUE);
				break;
			case 3:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_RED);
				break;
			case 4:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_GREEN);
				break;
		}
	}
}

function drawHelix(){
	for(let i = 0; i < 3; i++){
		//TOP
		//left side
		PS.color(1, 1+(9*i), PS.COLOR_BLACK);
		PS.color(1, 2+(9*i), PS.COLOR_BLACK);
		PS.color(1, 3+(9*i), PS.COLOR_BLACK);
		PS.color(2, 4+(9*i), PS.COLOR_BLACK);
		PS.color(3, 5+(9*i), PS.COLOR_BLACK);
		PS.color(4, 6+(9*i), PS.COLOR_BLACK);
		//right side
		PS.color(8, 1+(9*i), PS.COLOR_BLACK);
		PS.color(8, 2+(9*i), PS.COLOR_BLACK);
		PS.color(8, 3+(9*i), PS.COLOR_BLACK);
		PS.color(7, 4+(9*i), PS.COLOR_BLACK);
		PS.color(6, 5+(9*i), PS.COLOR_BLACK);
		PS.color(5, 6+(9*i), PS.COLOR_BLACK);
		//BOTTOM
		//left side
		PS.color(4, 6+(9*i), PS.COLOR_BLACK);
		PS.color(3, 7+(9*i), PS.COLOR_BLACK);
		PS.color(2, 8+(9*i), PS.COLOR_BLACK);
		PS.color(1, 9+(9*i), PS.COLOR_BLACK);
		PS.color(1, 10+(9*i), PS.COLOR_BLACK);
		//right side
		PS.color(5, 6+(9*i), PS.COLOR_BLACK);
		PS.color(6, 7+(9*i), PS.COLOR_BLACK);
		PS.color(7, 8+(9*i), PS.COLOR_BLACK);
		PS.color(8, 9+(9*i), PS.COLOR_BLACK);
		PS.color(8, 10+(9*i), PS.COLOR_BLACK);
	}
}

//yellow is A - 1
//blue is C - 2
//red is T - 3
//green is G - 4
function generateRandomBase(){
	let base = PS.random(4);
	strand1.push(base);
	let userMatch = PS.random(2);
	if(userMatch === 1){
		strand2.push(0); //stay as white so it needs to be inputted by user
	}
	else{
		switch(base){
			//find matching base
			case 1:
				strand2.push(3);
				break;
			case 2:
				strand2.push(4);
				break;
			case 3:
				strand2.push(1);
				break;
			case 4:
				strand2.push(2);
				break;
		}
	}
}

PS.touch = function( x, y, data, options ) {

};

PS.release = function( x, y, data, options ) {

};

PS.exitGrid = function( options ) {

};

PS.keyDown = function( key, shift, ctrl, options ) {
	switch(key){
		case 97:
			//a pressed
			break;
		case 99:
			//c pressed
			break;
		case 103:
			//g pressed
			break;
		case 116:
			//t pressed
			break;
		case PS.KEY_SPACE:
			//space pressed, ends game
			gameOver = true;
			break;
		default:
			break;
	}
};