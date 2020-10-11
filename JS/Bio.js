//Ideally all the canvas and ground stuff would go in a class for the game board
var canvas2 = document.getElementById("bio");
//ctx allows for the drawing of 2d elements on the canvas
var ctx2 = canvas2.getContext("2d");
fitToParentContainer(canvas2);


function fitToParentContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
