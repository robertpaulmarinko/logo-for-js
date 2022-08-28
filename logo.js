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

init();

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
// Helper functions
//-----------------------------------------------------------------------

/**
 * Called when the page first loads
 */
function init() {
    document.getElementById("runProgram").onclick = () => {
        document.location.reload();
    }

    // Its assumed this is defined in the program.js file
    start();
}


function degToRad(degrees) {
    return degrees * (Math.PI / 180);
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
