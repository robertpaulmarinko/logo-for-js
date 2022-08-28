function start() {
    for(var size=1;size<=1000;size = size +2){
        makeSquare(size); left(20);
    }

}

function makeSquare(size){
    for(var side=0;side<4;side = side +1){
        forward(size);
        left(90);
    }   
}