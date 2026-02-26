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

let Lside = [];
let Rside = [];

//blue is C
//green is G
//red is T
//yellow is A

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:
	PS.gridSize(30, 30);

	PS.statusText( "Synthesis" );

	drawHelix();

	//load sounds that will be used
	PS.audioLoad("fx_click"); //drag & drop
	PS.audioLoad("xylo_a4"); //sprite 1 select
	PS.audioLoad("xylo_b4"); //sprite 2 select
	PS.audioLoad("xylo_c5"); //sprite 3 select
	PS.audioLoad("perc_triangle"); //clear level sound
	PS.audioLoad("fx_tada"); //finished all stages sound

};

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

function drawBases(){

}

PS.touch = function( x, y, data, options ) {

};

PS.release = function( x, y, data, options ) {

};

PS.exitGrid = function( options ) {

};

PS.keyDown = function( key, shift, ctrl, options ) {
	/*switch(key){
		case PS.KEY_PAD_1:
			//PS.debug("Pressed 1\n");
			currentSprite = sprite1;
			break;
		case 49:
			//PS.debug("Pressed 1\n");
			currentSprite = sprite1;
			break;
		case PS.KEY_PAD_2:
			//PS.debug("Pressed 2\n");
			currentSprite = sprite2;
			break;
		case 50:
			//PS.debug("Pressed 2\n");
			currentSprite = sprite2;
			break;
		case PS.KEY_PAD_3:
			//PS.debug("Pressed 3\n");
			currentSprite = sprite3;
			break;
		case 51:
			//PS.debug("Pressed 3\n");
			currentSprite = sprite3;
			break;
		case 32: //space bar resets level
			reset();
			break;
		default:
			break;
	}*/
};