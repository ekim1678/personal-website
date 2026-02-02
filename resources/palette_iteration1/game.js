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

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

let currentSelect = [-1, -1]; //keeps track of position of node currently selected
//color variables, named based on correct final placement, row#col#
const row0col1 = [255, 111, 150];
const row0col2 = [235, 0, 39];
const row1col0 = [255, 215, 241];
const row1col1 = [235, 117, 180];
const row1col2 = [175, 23, 104];
const row1col3 = [73, 0, 40];
const row2col0 = [207, 206, 255];
const row2col1 = [134, 131, 248];
const row2col2 = [59, 56, 195];
const row2col3 = [27, 25, 117];
const row3col1 = [74, 134, 255];
const row3col2 = [0, 53, 235];

let isDragging = false; //checks if dragging current bead
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

	//PS.debug( "Drag and drop the squares!\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!

	PS.gridSize(4,4);

	//set the corner colors
	PS.color(0,0,[255, 221, 235]);
	PS.color(0,3,[158, 194, 255]);
	PS.color(3,0,[106, 8, 31]);
	PS.color(3,3,[0, 29, 151]);

	//assign all in between colors, doesn't really matter how they are arranged as long as they're not in order
	PS.color(0, 1, row3col1);
	PS.color(0, 2, row2col2);
	PS.color(1, 0, row2col1);
	PS.color(1, 1, row0col2);
	PS.color(1, 2, row1col3);
	PS.color(1, 3, row3col2);
	PS.color(2, 0, row0col1);
	PS.color(2, 1, row2col3);
	PS.color(2, 2, row1col2);
	PS.color(2, 3, row1col0);
	PS.color(3, 1, row2col0);
	PS.color(3, 2, row1col1);

	PS.scale(PS.ALL, PS.ALL, 90);

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	PS.statusText( "Palette v0.1" );
	PS.debug("Drag and drop with your mouse!\n");
	PS.debug("Turn your sound on :)");

	//load sounds that will be used
	PS.audioLoad("fx_click"); //used for bead selection
	PS.audioLoad("xylo_a4"); //used for bead movement sound
	PS.audioLoad("perc_triangle"); //used for all row matching
	PS.audioLoad("fx_scratch"); //used if trying to select a unselectable bead or drag to a bad location
	// Add any other initialization code you need here.
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	if((x===0 && y===0) || (x===0 && y===3) || (x===3 && y===0) || (x===3 && y===3)){ //not able to select the corners, since they're the guidelines
		PS.audioPlay("fx_scratch", { volume: 0.3 });
		return;
	}
	if(currentSelect[0] !== -1 && currentSelect[1] !== -1){
		//resize last selection before scaling up this one
		PS.scale(currentSelect[0], currentSelect[1], 90);
	}
	PS.audioPlay("fx_click", { volume: 0.75 });
	currentSelect = [x, y];
	PS.scale(x, y, 100);
	isDragging = true;
	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches
	// over a bead.
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:
	if(isDragging) {
		if((x===0 && y===0) || (x===0 && y===3) || (x===3 && y===0) || (x===3 && y===3)){ //not able to move to the corners, since they're the guidelines
			PS.audioPlay("fx_scratch", { volume: 0.3 });
			isDragging = false;
		}
		else{
			isDragging = false;
			if(currentSelect[0] !== -1 && currentSelect[1] !== -1){
				//resize last selection before dropping the bead
				PS.scale(currentSelect[0], currentSelect[1], 90);
				//switch color of the last bead and the color of the new position bead
				let selectedBeadColor = PS.color(currentSelect[0], currentSelect[1]);
				let dropBeadColor = PS.color(x, y);
				PS.color(x, y, selectedBeadColor);
				PS.color(currentSelect[0], currentSelect[1], dropBeadColor);
				PS.audioPlay("xylo_a4");
			}
		}
		//PS.debug("about to checkgrid\n");
		if(checkrow(y) || checkrow(currentSelect[1]) || checkcol(x) || checkcol(currentSelect[0])){
			PS.audioPlay("perc_triangle", { volume: 0.3 });
		}
	}
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:
	if(isDragging) {
		isDragging = false;
	}
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:
	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};


function checkrow(rownum){
	//PS.debug("checking row " + rownum + "\n");
	let rgbCol0 = PS.color(0, rownum);
	let rgbCol1 =  PS.color(1, rownum);
	let rgbCol2 = PS.color(2, rownum);
	let rgbCol3 = PS.color(3, rownum);
	switch(rownum){
		case 0:
			//PS.debug("row0col1 " + checkColor(rgbCol1, row0col1) + "row0col2 " + checkColor(rgbCol2, row0col2) + "\n");
			return checkColor(rgbCol1, row0col1) && checkColor(rgbCol2, row0col2);
		case 1:
			return checkColor(rgbCol0, row1col0) && checkColor(rgbCol1, row1col1) &&
				checkColor(rgbCol2, row1col2) && checkColor(rgbCol3, row1col3);
		case 2:
			return checkColor(rgbCol0, row2col0) && checkColor(rgbCol1, row2col1) &&
				checkColor(rgbCol2, row2col2) && checkColor(rgbCol3, row2col3);
		case 3:
			return checkColor(rgbCol1, row3col1) && checkColor(rgbCol2, row3col2);
	}
}

function checkcol(colnum){
	let rgbRow0 = PS.color(colnum, 0);
	let rgbRow1 =  PS.color(colnum, 1);
	let rgbRow2 = PS.color(colnum, 2);
	let rgbRow3 = PS.color(colnum, 3);

	switch(colnum){
		case 0:
			return checkColor(rgbRow1, row1col0) && checkColor(rgbRow2, row2col0);
		case 1:
			return checkColor(rgbRow0, row0col1) && checkColor(rgbRow1, row1col1) &&
				checkColor(rgbRow2, row2col1) && checkColor(rgbRow3, row3col1);
		case 2:
			return checkColor(rgbRow0, row0col2) && checkColor(rgbRow1, row1col2) &&
				checkColor(rgbRow2, row2col2) && checkColor(rgbRow3, row3col2);
		case 3:
			return checkColor(rgbRow1, row1col3) && checkColor(rgbRow2, row2col3);
	}
}

//takes a PS.unmakeRGB and a declared color array and checks if they have equal RGB values
function checkColor(passedvalue, array){
	var color = PS.unmakeRGB(passedvalue, {});
	let correctColor = true;
	if(color.r !== array[0]){ //check red value
		//PS.debug("red: " + color.r + " vs " + array[1]);
		correctColor = false;
	}
	if(color.g !== array[1]){ //check green value
		//PS.debug("green: " + color.g + " vs " + array[1]);
		correctColor = false;
	}
	if(color.b !== array[2]){ //check blue value
		//PS.debug("blue: " + color.b + " vs " + array[1]);
		correctColor = false;
	}
	//PS.debug(correctColor + "\n");
	return correctColor;
}