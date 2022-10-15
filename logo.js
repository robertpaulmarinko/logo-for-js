const MAX_X = 500;
const MAX_Y = 500;

let turtle = {
    direction: 0,
    x: MAX_X / 2,
    y: MAX_Y / 2,
    color: 'black'
};
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//-----------------------------------------------------------------------
// Logo commands
//-----------------------------------------------------------------------

/**
 * Move the turtle forward
 * @param {number} distance 
 */
function forward(distance) {
    newX = turtle.x + (distance * Math.cos(degToRad(turtle.direction)));
    newY = turtle.y + (distance * Math.sin(degToRad(turtle.direction)));

    ctx.beginPath();
    ctx.strokeStyle = turtle.color;
    ctx.moveTo(turtle.x, turtle.y);
    ctx.lineTo(newX, newY);
    ctx.closePath();
    ctx.stroke();

    turtle.x = newX;
    turtle.y = newY;
}

/**
 * Turn the turtle to the right
 * @param {number} degrees 
 */
function right(degrees) {
    turtle.direction += degrees;
    while (turtle.direction >= 360) turtle.direction =- 360;
}

/**
 * Turn the turtle to the left
 * @param {number} degrees 
 */
function left(degrees) {
    turtle.direction -= degrees;
    while (turtle.direction < 0) turtle.direction += 360;
}

/**
 * Sets the color of the pen
 * @param {string} color
 */
function color(color) {
    if (color === 'gs') {
        turtle.color ='rgb(0,174,88)'
    } else {
        turtle.color = color;
    }
}

//-----------------------------------------------------------------------
// Turtle Drawing Functions
//-----------------------------------------------------------------------
function drawTurtle() {
    const sideDistance = 20;
    let direction = turtle.direction - 90;
    while (direction < 0) direction += 360;
    const [x1, y1] = getLineEndXY(turtle.x, turtle.y, direction, sideDistance);

    direction = direction + 45;
    while (turtle.direction >= 360) turtle.direction =- 360;
    const [x2, y2] = getLineEndXY(x1, y1, direction, sideDistance * 2);

    direction = direction + 90;
    while (turtle.direction >= 360) turtle.direction =- 360;
    const [x3, y3] = getLineEndXY(x2, y2, direction, sideDistance * 2);

    ctx.beginPath();
    ctx.strokeStyle = turtle.color;
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
}


//-----------------------------------------------------------------------
// Helper functions
//-----------------------------------------------------------------------

/**
 * Called when the page first loads.  
 * Calls a start() function defined in the program.js file
 * to run a batch process.
 */
function init() {
    document.getElementById("runProgram").onclick = () => {
        document.location.reload();
    }

    // Its assumed this is defined in the program.js file
    start();
}

/**
 * Called when the interactive page first loaded.
 * WIll call the "keyPressed" function defined in programInteractive.js
 * whenever a key is pressed.
 */
function initInteractive() {
    document.getElementById("runProgram").onclick = () => {
        document.location.reload();
    }

    window.addEventListener("keyup", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
      
        document.getElementById("keyPressed").innerHTML = event.key;
        keyPressed(event.key);

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);
      // the last option dispatches the event to the listener first,
      // then dispatches event to window
}


function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Given the start of a line, a direction in degrees and 
 * a distance, returns the ending X,Y of the line.
 */
function getLineEndXY(startX, startY, direction, distance) {
    const newX = startX + (distance * Math.cos(degToRad(direction)));
    const newY = startY + (distance * Math.sin(degToRad(direction)));

    return [newX, newY];
}

function draw(distance, distanceDrawn) {
    const INTERVAL = 10;

    setTimeout(() => {
        distanceDrawn += INTERVAL;
        let interval = INTERVAL;
        if (distanceDrawn > distance) {
            interval = distanceDrawn - distance;
            distanceDrawn = distance;
        }

        newX = turtle.x + (interval * Math.cos(degToRad(turtle.direction)));
        newY = turtle.y + (interval * Math.sin(degToRad(turtle.direction)));

        ctx.beginPath();
        ctx.moveTo(turtle.x, turtle.y);
        ctx.lineTo(newX, newY);
        ctx.closePath();
        ctx.stroke();
        
        turtle.x = newX;
        turtle.y = newY;

        if (distanceDrawn < distance) {
            draw(distance, distanceDrawn);
        }
    }, 200);
}
