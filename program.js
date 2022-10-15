function start() 
{
    var maxsize=prompt('How big do you want the shapes to be?')
    var myColor=prompt('What color do you want?')
    if(myColor== 'black'){
        alert('Are you my grandpa?')
    }
    if(myColor=='lightblue' ||myColor=='aqua'){
        alert('The best choice!')
    }
    var sides=prompt('How many sides do you want?')
    var degree=prompt('What degree do you want the shape to be at?')
    color(myColor);
    for(var size=1;size<=maxsize;size = size +1){
        makeShape(size,sides);
        left(degree);
    }
 

}
function trefoil(){ 
    color('gs');
    for(var size=1;size<=1000;size = size +2){
        makeSquare(size); left(20);
    }
}

function manyShapes() {
    color('white');
    right(90);
    forward(250);
    left(90);
    color('lightblue');
    for(var size=1;size<=100;size = size +1){
        makeShape(size*5,size);
    }
}

function makeSquare(size){
    for(var side=0;side<4;side = side +1){
        forward(size);
        left(90);
    }   
}
function makeShape(size,sides){
    var angle=360/sides;
    for(var side=0;side<sides;side = side +1){
        forward(size);
        left(angle);
    }
}