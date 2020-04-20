//Ideally all the canvas and ground stuff would go in a class for the game board
var canvas = document.getElementById("intro");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");
let ground = canvas.height - canvas.height * .30;
fitToParentContainer(canvas);
let oldWidth = canvas.width;
let oldHeight = canvas.height;


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

//There should be a start game function to put everything in their starting places
//There should be a reset to be called when the canvas isn't in view
//Classes player, platforms (extend platforms so that they can have textures and not just words), items, gameObj, and controller

//*****Classes*****//
class gameObject{
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    get xCor(){
        return this.x;
    }

    set xCor(xCor){
        this.x = xCor;
    }

    get yCor(){
        return this.y;
    }

    set yCor(yCor){
        this.y = yCor;
    }

    get weight(){
        return this.w;
    }

    set weight(w){
        this.w = w;
    }

    get height(){
        return this.h;
    }

    set height(h){
        this.h = h;
    }

    //Function to resize sprite to canvas browser since the canvas resizes based on parent
    resizeSprite(){
        //proportionate x and y positions based on canvas resizing
        this.x = this.x * canvas.width/oldWidth;
        this.y = this.y * canvas.height/oldHeight;
        this.h = canvas.height *.3;
        this.w = canvas.width * .18;
    }
}

class player extends gameObject{
    constructor(x, y, w, h, rightArr, leftArr) {
        super(x, y, w, h);
        this.rightArr = rightArr;
        this.leftArr = leftArr;
        this.xVel = 0;
        this.yVel = 0;
        this.facingRight = true;
        this.isMoving = false;
        this.currentFrame = 0;
    }

    get xVelocity(){
        return this.xVel;
    }

    set xVelocity(xVel){
        this.xVel = xVel;
    }

    get yVelocity(){
        return this.yVel;
    }

    set yVelocity(yVel){
        this.yVel = yVel;
    }


    update(){
        //frames are doubled here so the running animation is slower

        //Resize sprite here works because this update is called before updateOldCanvas!
        this.resizeSprite();

        this.x += this.xVel;
        this.xVel *= 0.8;

        this.checkIfStopped();

        if(this.currentFrame > 13){
            this.currentFrame = 1;
        }

        if(this.isMoving){
            this.currentFrame ++;
        } else {
            this.currentFrame = 0;
        }

        if(this.xVel > 0){
            this.facingRight = true;
            this.isMoving = true;
        } else if (this.xVel < 0) {
            this.facingRight = false;
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }

        ctx.imageSmoothingEnabled = false;
        console.log(this.xVel);
        if(this.facingRight) {
            ctx.drawImage(this.rightArr[Math.floor(this.currentFrame/2)], this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.leftArr[Math.floor(this.currentFrame/2)], this.x, this.y, this.w, this.h);
        }
    }

    //Function to check to see if character's xVelocity has been multiplied by 0.9 enough so that its basically 0.
    checkIfStopped(){
        if(this.xVel > 0 && this.xVel < 1){
            this.xVel = 0;
        }
        if(this.xVel < 0 && this.xVel > -1){
            this.xVel = 0;
        }
    }

}


var matt = new player(canvas.width - canvas.width * .95, ground,
    canvas.width * .18, canvas.height *.3, picArray, picLeftArray);


function animate(){
    requestAnimationFrame(animate);
    //fit to parent container needs to be here to resize the canvas whenever the screen is resized
    fitToParentContainer(canvas);
    draw();

    //this is probably not where this loop should go, probably in the board class down the line
    if(matt.x < -matt.w){
        console.log("This is Matt's x: " + matt.x);
        matt.x = canvas.width;
    } else if (matt.x > canvas.width){
        matt.x = -matt.w;
    }

    matt.update();
    //console.log(matt.x);
    updateOldCanvas();
}

animate();



//Need to move this controller out into its own class
//You can only go one direction at a time it seems
document.querySelector('body').onkeydown = function (e) {

    //right direction
    if (e.keyCode == 68) {
        //xMove += 15;
        matt.xVelocity += 10;
        console.log("heard");
    } else if(e.keyCode == 65){
        //xMove -= 15;
        matt.xVelocity -= 10;
    }
}