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
let interval;
var timer;
let gameOver;
let startIndex = 0;
let strand1slots = [];
let strand2slots = [];
let baseSlotNum = [2, 4, 8, 10, 12, 14, 17, 19, 21, 23, 26, 28]; //keeps track of what row num so we can put glyphs in the appropriate place
let slotWidth = [3, 2, 2, 3, 3, 1, 2, 3, 3, 1, 2, 3]; //keeps track of the width of a sprite for a given slot
let lastEmptySlot = -1;
let streak = 0;
let multiplier = 1;

PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:
	PS.gridSize(30, 30);
	PS.color(PS.ALL, PS.ALL, PS.COLOR_GRAY_LIGHT);

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
	PS.glyph(12, 1, "S");
	PS.glyph(13, 1, "C");
	PS.glyph(14, 1, "O");
	PS.glyph(15, 1, "R");
	PS.glyph(16, 1, "E");
	PS.glyph(17, 1, ":");
	PS.glyph(18, 1, "0");

	PS.glyph(12, 3, "S");
	PS.glyph(13, 3, "T");
	PS.glyph(14, 3, "R");
	PS.glyph(15, 3, "E");
	PS.glyph(16, 3, "A");
	PS.glyph(17, 3, "K");
	PS.glyph(18, 3, ":");
	PS.glyph(19, 3, "0");

	PS.glyph(12, 5, "M");
	PS.glyph(13, 5, "U");
	PS.glyph(14, 5, "L");
	PS.glyph(15, 5, "T");
	PS.glyph(16, 5, "I");
	PS.glyph(17, 5, "P");
	PS.glyph(18, 5, "L");
	PS.glyph(19, 5, "I");
	PS.glyph(20, 5, "E");
	PS.glyph(21, 5, "R");
	PS.glyph(22, 5, ":");
	PS.glyph(23, 5, "x");
	PS.glyph(24, 5, "1");

	gameOver = false;
	interval = 80;
	timer = PS.timerStart(interval, frame);
	//remove grid lines
	PS.border(PS.ALL, PS.ALL, {top : 0, left : 0, bottom : 0, right : 0});
	//draw line separators
	for(let i = 0; i < 30; i++){
		PS.border(11, i, {top : 0, left : 3, bottom : 0, right : 0});
		PS.borderColor(11, i, PS.COLOR_BLACK);
	}

	for(let i = 11; i < 25; i++){
		PS.border(i, 11, {top : 0, left : 0, bottom : 3, right : 0});
		PS.borderColor(i, 11, PS.COLOR_BLACK);
	}

	PS.glyph(13, 13, "M");
	PS.glyph(14, 13, "A");
	PS.glyph(15, 13, "T");
	PS.glyph(16, 13, "C");
	PS.glyph(17, 13, "H");

	PS.glyph(19, 13, "T");
	PS.glyph(20, 13, "H");
	PS.glyph(21, 13, "E");

	PS.glyph(15, 14, "B");
	PS.glyph(16, 14, "A");
	PS.glyph(17, 14, "S");
	PS.glyph(18, 14, "E");
	PS.glyph(19, 14, "S");
	PS.glyph(20, 14, "!");
	//yellow is A - 1
	PS.color(12, 16, PS.COLOR_YELLOW);
	PS.glyph(12, 16, "A");
	PS.glyph(14, 16, "A");
	PS.glyph(15, 16, "D");
	PS.glyph(16, 16, "E");
	PS.glyph(17, 16, "N");
	PS.glyph(18, 16, "I");
	PS.glyph(19, 16, "N");
	PS.glyph(20, 16, "E");
	//blue is C - 2
	PS.color(12, 18, PS.COLOR_BLUE);
	PS.glyph(12, 18, "C");
	PS.glyph(14, 18, "C");
	PS.glyph(15, 18, "Y");
	PS.glyph(16, 18, "T");
	PS.glyph(17, 18, "O");
	PS.glyph(18, 18, "S");
	PS.glyph(19, 18, "I");
	PS.glyph(20, 18, "N");
	PS.glyph(21, 18, "E");
	//red is T - 3
	PS.color(12, 20, PS.COLOR_RED);
	PS.glyph(12, 20, "T");
	PS.glyph(14, 20, "T");
	PS.glyph(15, 20, "H");
	PS.glyph(16, 20, "Y");
	PS.glyph(17, 20, "M");
	PS.glyph(18, 20, "I");
	PS.glyph(19, 20, "N");
	PS.glyph(20, 20, "E");
	//green is G - 4
	PS.color(12, 22, PS.COLOR_GREEN);
	PS.glyph(12, 22, "G");
	PS.glyph(14, 22, "G");
	PS.glyph(15, 22, "U");
	PS.glyph(16, 22, "A");
	PS.glyph(17, 22, "N");
	PS.glyph(18, 22, "I");
	PS.glyph(19, 22, "N");
	PS.glyph(20, 22, "E");


	PS.color(12, 24, PS.COLOR_RED);
	PS.color(13, 24, PS.COLOR_RED);
	PS.color(14, 24, PS.COLOR_RED);
	PS.glyph(14, 24, "T");
	PS.glyph(15, 24, "A");
	PS.color(15, 24, PS.COLOR_YELLOW);
	PS.color(16, 24, PS.COLOR_YELLOW);
	PS.color(17, 24, PS.COLOR_YELLOW);
	PS.glyph(19, 24, "T");
	PS.glyph(20, 24, "+");
	PS.glyph(21, 24, "A");

	PS.color(12, 26, PS.COLOR_GREEN);
	PS.color(13, 26, PS.COLOR_GREEN);
	PS.color(14, 26, PS.COLOR_GREEN);
	PS.glyph(14, 26, "G");
	PS.glyph(15, 26, "C");
	PS.color(15, 26, PS.COLOR_BLUE);
	PS.color(16, 26, PS.COLOR_BLUE);
	PS.color(17, 26, PS.COLOR_BLUE);
	PS.glyph(19, 26, "G");
	PS.glyph(20, 26, "+");
	PS.glyph(21, 26, "C");

	displayBases();
	findEmptyBase();

	//load sounds that will be used
	PS.audioLoad("fx_ding");
	PS.audioLoad("fx_rip");
	PS.audioLoad("fx_click");
	PS.audioLoad("fx_coin1");

};

function frame(){
	PS.timerStop(timer);
	if(!gameOver){
		if(interval > 15){
			interval -= 1;
		}
		timer = PS.timerStart(interval, frame);
		moveDown();
		displayBases();
		findEmptyBase();
		displayScore();
		PS.audioPlay("fx_click", { volume: 0.1 });
	}
	else{
		PS.debug("Game Over! Your score was " + score + "\n");
		displayScore();
	}
}

function updateScore(){
	//score glyph text ends at (18, 1) so the actual score should start at (19, 1)
	if (streak > 0)
	{
		score += multiplier;
		if (streak % 5 === 0)
		{
			multiplier += 1;
			PS.audioPlay("fx_ding", { volume: 0.1, onEnd: multiplierSound});
		}
		else
		{
			PS.audioPlay("fx_ding", { volume: 0.1});
		}
	}
	displayScore();
}

function multiplierSound(){
	PS.audioPlay("fx_coin1", { volume: 0.1 });
}

function displayScore(){
	const scoreStr = String(score);
	let scoreLength = scoreStr.length;
	for(let i = 0; i < scoreLength; i++){
		PS.glyph(18+i, 1, scoreStr[i]);
	}

	const streakStr = String(streak);
	let streakLength = streakStr.length;
	for(let j = 19; j < 30; j++){
		PS.glyph(j, 3, ""); //reset glyphs
	}
	for(let i = 0; i < streakLength; i++){
		PS.glyph(19+i, 3, streakStr[i]);
	}

	const multStr = String(multiplier);
	let multLength = multStr.length;
	for(let j = 24; j < 30; j++){
		PS.glyph(j, 5, ""); //reset glyphs
	}
	for(let i = 0; i < multLength; i++){
		PS.glyph(24+i, 5, multStr[i]);
	}
}

//yellow is A - 1
//blue is C - 2
//red is T - 3
//green is G - 4
function checkInput(userInputBase){
	//get user input
	if(lastEmptySlot === -1) return; //if we don't have a currently open slot, then we can't take the user input
	strand2[startIndex + lastEmptySlot] = userInputBase; //put it into the strand data
	switch(userInputBase){ //checks if score should increase
		case 1:
			if(strand1[startIndex + lastEmptySlot] === 3){ //A and T match
				streak++;
			}
			else{
				//play error sound
				PS.audioPlay("fx_rip", { volume: 0.1 });
				multiplier = 1;
				streak = 0;
				displayScore();
			}
			break;
		case 2:
			if(strand1[startIndex + lastEmptySlot] === 4){ //C and G match
				streak++;
			}
			else{
				//play error sound
				PS.audioPlay("fx_rip", { volume: 0.1 });
				multiplier = 1;
				streak = 0;
				displayScore();
			}
			break;
		case 3:
			if(strand1[startIndex + lastEmptySlot] === 1){ //T and A match
				streak++;
			}
			else{
				//play error sound
				PS.audioPlay("fx_rip", { volume: 0.1 });
				multiplier = 1;
				streak = 0;
				displayScore();
			}
			break;
		case 4:
			if(strand1[startIndex + lastEmptySlot] === 2){ //G and C match
				streak++;
			}
			else{
				PS.audioPlay("fx_rip", { volume: 0.1 });
				//play error sound
				multiplier = 1;
				streak = 0;
				displayScore();
			}
			break;
	}

	updateScore();
	changeBorder(3, lastEmptySlot, false); //remove the border since it's been filled
	displayBases(); //call the draw bases to update
	findEmptyBase();
}

//yellow is A - 1
//blue is C - 2
//red is T - 3
//green is G - 4
function moveDown(){
	generateRandomBase();
	for(let i = 0; i < 12; i++) { //strand1 and strand2 should be the same length, there are 12 slots
		//get strand1 color of next item and set it to the current item
		let baseColor;
		switch (strand1[startIndex + i + 1]) { //get the next
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
		switch (strand2[startIndex + i + 1]) { //get the next
			case 0:
				baseColor = PS.COLOR_GRAY_LIGHT;
				break;
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
	for(let i = 0; i < 12; i++){ //using start index since the strand will move
		if (i >= strand1slots.length) break;
		switch(strand1[startIndex + i]){ //get the base
			case 1:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_YELLOW);
				PS.glyph(4, baseSlotNum[i], "A");
				break;
			case 2:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_BLUE);
				PS.glyph(4, baseSlotNum[i], "C");
				break;
			case 3:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_RED);
				PS.glyph(4, baseSlotNum[i], "T");
				break;
			case 4:
				PS.spriteSolidColor(strand1slots[i], PS.COLOR_GREEN);
				PS.glyph(4, baseSlotNum[i], "G");
				break;
		}
		if (i >= strand2slots.length) break;
		switch(strand2[startIndex + i]){
			case 0: //user needs to fill in
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_GRAY_LIGHT);
				PS.glyph(5, baseSlotNum[i], "");
				break;
			case 1:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_YELLOW);
				PS.glyph(5, baseSlotNum[i], "A");
				break;
			case 2:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_BLUE);
				PS.glyph(5, baseSlotNum[i], "C");
				break;
			case 3:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_RED);
				PS.glyph(5, baseSlotNum[i], "T");
				break;
			case 4:
				PS.spriteSolidColor(strand2slots[i], PS.COLOR_GREEN);
				PS.glyph(5, baseSlotNum[i], "G");
				break;
		}
	}
}

function findEmptyBase(){
	let emptyFound = false;
	for(let i = 0; i < 12; i++){
		if(emptyFound) return;
		if(strand2[startIndex + i] === 0){ //if this is empty
			if(lastEmptySlot !== -1){
				changeBorder(3, lastEmptySlot, false);
			}
			//remove the border, it doesn't matter the length bc just setting all borders to 0

			emptyFound = true;
			lastEmptySlot = i;
			let spriteWidth;
			if(i === 0 || i === 3 || i === 4 || i === 6 ||  i === 7 || i === 8 || i === 11){
				//the length of the border should be different depending on which sprite it is, since the sprites have different widths
				spriteWidth = 3;
			}
			else if(i === 1 || i === 2 || i === 10){
				spriteWidth = 2;
			}
			else{
				spriteWidth = 1;
			}

			//draw the border on the current empty slot
			changeBorder(spriteWidth, lastEmptySlot, true);
		}
	}
	if(!emptyFound){
		lastEmptySlot = -1;
	}
}

function changeBorder(spriteWidth, slotNum, drawBorder){
	//outline empty slot so player knows where they're putting the thing
	for(let j = 0; j < spriteWidth; j++) {
		if(drawBorder){
			PS.spriteSolidColor(strand2slots[slotNum], PS.COLOR_WHITE);
			//PS.border(5 + j, baseSlotNum[slotNum], {top: 2, left: 0, bottom: 2, right: 0});
			//PS.borderColor(5 + j, baseSlotNum[slotNum], PS.COLOR_GRAY_DARK);
		}
		else{
			//PS.border(5 + j, baseSlotNum[slotNum], {top: 0, left: 0, bottom: 0, right: 0});
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

//yellow is A - 1
//blue is C - 2
//red is T - 3
//green is G - 4
PS.keyDown = function( key, shift, ctrl, options ) {
	if(gameOver) return;
	switch(key){
		case 97:
			//a pressed
			checkInput(1);
			break;
		case 99:
			//c pressed
			checkInput(2);
			break;
		case 103:
			//t pressed
			checkInput(4);
			break;
		case 116:
			//g pressed
			checkInput(3);
			break;
		case PS.KEY_SPACE:
			//space pressed, ends game
			gameOver = true;
			break;
		default:
			break;
	}
};