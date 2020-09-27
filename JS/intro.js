//Ideally all the canvas and ground stuff would go in a class for the game board
var canvas = document.getElementById("intro");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");
let ground = canvas.height - canvas.height * .30;
fitToParentContainer(canvas);
let oldWidth = canvas.width;
let oldHeight = canvas.height;
/*outOfBounds here is just a little buffer that I end up adding to the floor to give 100 pixels to the left and 100 to the
  right more space.*/
let outOfBounds = canvas.width/2;

//todo develop a ratio so that pixel art isn't scrunched
//todo look into import statements instead of loading each separate JS file



<!--Loading sprites-->
var idleImg = new Image();
idleImg.src = 'Assets/pixelMeFolderRight/pixelMert.png';

var moveImg1 = new Image();
moveImg1.src = 'Assets/pixelMeFolderRight/pixelMe1.png';

var moveImg2 = new Image();
moveImg2.src = 'Assets/pixelMeFolderRight/pixelMe2.png';

var moveImg3 = new Image();
moveImg3.src = 'Assets/pixelMeFolderRight/pixelMe3.png';

var moveImg4 = new Image();
moveImg4.src = 'Assets/pixelMeFolderRight/pixelMe4.png';

var moveImg5 = new Image();
moveImg5.src = 'Assets/pixelMeFolderRight/pixelMe5.png';

var moveImg6 = new Image();
moveImg6.src = 'Assets/pixelMeFolderRight/pixelMe6.png';

var moveImg7 = new Image();
moveImg7.src = 'Assets/pixelMeFolderRight/pixelMe7.png';

var jumpImg = new Image();
jumpImg.src = 'Assets/pixelMeFolderRight/pixelMeJump.png';

var picArray = [idleImg, moveImg1, moveImg2, moveImg3, moveImg4, moveImg5, moveImg6, moveImg7];

//loading the left facing movement pictures
var idleImgLeft = new Image();
idleImgLeft.src = 'Assets/pixelMeFolderLeft/pixelMertLeft.png';

var moveLeftImg1 = new Image();
moveLeftImg1.src = 'Assets/pixelMeFolderLeft/pixelMe1Left.png';

var moveLeftImg2 = new Image();
moveLeftImg2.src = 'Assets/pixelMeFolderLeft/pixelMe2Left.png';

var moveLeftImg3 = new Image();
moveLeftImg3.src = 'Assets/pixelMeFolderLeft/pixelMe3Left.png';

var moveLeftImg4 = new Image();
moveLeftImg4.src = 'Assets/pixelMeFolderLeft/pixelMe4Left.png';

var moveLeftImg5 = new Image();
moveLeftImg5.src = 'Assets/pixelMeFolderLeft/pixelMe5Left.png';

var moveLeftImg6 = new Image();
moveLeftImg6.src = 'Assets/pixelMeFolderLeft/pixelMe6Left.png';

var moveLeftImg7 = new Image();
moveLeftImg7.src = 'Assets/pixelMeFolderLeft/pixelMe7Left.png';

var jumpLeftImg = new Image();
jumpLeftImg.src = 'Assets/pixelMeFolderLeft/pixelMeJumpLeft.png';

var picLeftArray = [idleImgLeft, moveLeftImg1, moveLeftImg2, moveLeftImg3, moveLeftImg4, moveLeftImg5,
    moveLeftImg6, moveLeftImg7];



function fitToParentContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ground = canvas.height - canvas.height * .30;
}

function updateOldCanvas(){
    if(canvas.width != oldWidth){
        oldWidth = canvas.width;
    }

    if(canvas.height != oldHeight){
        oldHeight = canvas.height;
    }
}

function draw() {
    //text of my name
    ctx.font = "50px Roboto";
    ctx.textAlign = "center";
    ctx.fillText("Matthew Y Leong", canvas.width / 2, canvas.height / 2);
}

function logInformation(){
    console.log("This is the canvas height: " + canvas.height);
    //console.log("This is the ground: " + ground);
    //console.log("This is player's x: " + matt.x);
    //console.log("This is player's y: " + matt.y);
    console.log("This is the player's feet: " + matt.collisionPointY);
    //console.log("This is collision point x: " + matt.collisionPointX);
    console.log("This is the platform's y: " + theFloor.y);
    //console.log("Canvas height - matt.h: " + matt.h);
    //console.log("This is matt's yVe;: " + matt.yVel);
}

//There should be a start game function to put everything in their starting places
//There should be a reset to be called when the canvas isn't in view
//Classes player, platforms (extend platforms so that they can have textures and not just words), items, gameObj, and controller

//*****Classes*****//


class TextPlatform extends Platform{
}


/*
Controller inputs, need to think of a better way to handle these
 */

var rightPressed;
var leftPressed;
var upPressed;

class Controller{
    constructor(){
        //todo need to get these constructor variables to work somehow
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
    }

    //I had three instance variables here, one for each input set to false, didn't work
    keyDownHandler(e){
        if (e.key == 'd') {
            //move right
            rightPressed = true;
            console.log("right key is pressed!");
            console.log(this.rightPressed);
        }
        if (e.key == 'a'){
            //move left
            leftPressed = true;
        }
        if(e.key == "w"){
            //jump
            upPressed = true;
        }
    }

    keyUpHandler(e){
        if (e.keyCode == 68) {
            //move right
            console.log("right key is not pressed.");
            rightPressed = false;
            console.log(this.rightPressed);
        }
        if(e.keyCode == 65){
            //move left
            leftPressed = false;
        }
        if(e.keyCode == 87){
            //jump
            upPressed = false;
        }
    }
}


/*class Game{
    constructor(player, controller){
        this.player = player;
        this.controller = controller;
    }

    update(){
        console.log("Got here at least");
        if(controller.rightPressed){
            console.log("We have an input");
        }
    }
}*/

var controller = new Controller();
document.addEventListener('keydown', controller.keyDownHandler);
document.addEventListener('keyup', controller.keyUpHandler);

var theFloor = new Platform(0 - outOfBounds, canvas.height - 2, canvas.width + (outOfBounds * 2), 2);
var matt = new Player(canvas.width - canvas.width * .95, ground - 40,
    canvas.width * .18, canvas.height *.3, picArray, picLeftArray);
var platform2 = new Platform(canvas.width/2 - 200, canvas.height - 200, canvas.width * 0.22, 20);
var platform1 = new Platform(0, canvas.height - 500, canvas.width/2 + 200, 20);
var platArray = [platform1, platform2, theFloor];


function animate(){
    requestAnimationFrame(animate);
    //fit to parent container needs to be here to resize the canvas whenever the screen is resized
    fitToParentContainer(canvas);

    platArray.forEach(function(plat){
        plat.update();
    })

    //console.log("Inside the game loop: " + controller.rightPressed + " " + matt.xVel + " ");
    //if checks can't be conditional here otherwise you won't be able to run and jump
    //https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
    if(rightPressed){
        console.log("Got here");
        matt.xVelocity += 5;
    }
    if(leftPressed){
        matt.xVelocity -= 5;
    }
    if(upPressed){
        matt.jump(canvas.height * 0.1);
    }

    matt.update();
    //this is probably not where this loop should go, probably in the board class down the line
    //controls scrolling so you don't go out of bounds of the canvas
    if(matt.x < -matt.w){
        matt.x = canvas.width;
    } else if (matt.x > canvas.width){
        matt.x = -matt.w;
    }

    //matt.checkCollision(theFloor);
    platArray.forEach(function (plat) {
        matt.checkCollision(plat);
    })

    updateOldCanvas();
    //logInformation();
}

animate();



//Need to move this controller out into its own class
//You can only go one direction at a time it seems
/*document.querySelector('body').onkeydown = function (e) {
    //right direction
    if (e.keyCode == 68) {
        //xMove += 15;
        matt.xVelocity += 10;
    } else if(e.keyCode == 65){
        //xMove -= 15;
        matt.xVelocity -= 10;
    } else if(e.keyCode == 87){
        matt.yVelocity += canvas.height * 0.1;
    }
}*/