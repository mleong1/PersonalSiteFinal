//Ideally all the canvas and ground stuff would go in a class for the game board
var canvas = document.getElementById("intro");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");
let ground = canvas.height - canvas.height * .30;
fitToParentContainer(canvas);
let oldWidth = canvas.width;
let oldHeight = canvas.height;
let outOfBounds = 100;

//todo develop a ratio so that pixel art isn't scrunched


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
    //Resize sprite contantly controls sprites size
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
        this.isJumping = false;
        this.currentFrame = 0;
        this.collisionPointX = this.w/2;
        this.collisionPointY = this.y + this.h;
        this.prevCollisionPointY = this.collisionPointY;
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

        //order of these operations really matters
        //Collision point x and y both depend on x and y after they are affected by velocity, they need to be updated
        //after x and y have been updated
        if(this.yVel > 0){
            this.isJumping = true;
            //prevCollisionPointY is really apex jump height
            matt.prevCollisionPointY = matt.collisionPointY;
        } else {
            this.isJumping = false;
        }

        this.resizeSprite();

        this.x += this.xVel;
        this.y -= this.yVel;
        this.xVel *= 0.8;
        this.yVel *= 0.9;

        this.collisionPointX = this.x + this.w /2;
        this.collisionPointY = this.y + this.h;
        console.log("This is the y vel: " + this.yVel);
        this.yVel -= 3;



        //really just need a statement saying don't go past the ground


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
        if(this.facingRight) {
            ctx.drawImage(this.rightArr[Math.floor(this.currentFrame/2)], this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.leftArr[Math.floor(this.currentFrame/2)], this.x, this.y, this.w, this.h);
        }
    }

    //Function to check to see if character's xVelocity and yVelocity has been multiplied by 0.9 enough so that its basically 0.
    checkIfStopped(){
        if(this.xVel > 0 && this.xVel < 1){
            this.xVel = 0;
        }

        if(this.xVel < 0 && this.xVel > -1){
            this.xVel = 0;
        }

    }

    //function to check collisions with platforms
    checkCollision(platform){

        if (this.collisionPointX >= platform.left && this.collisionPointX <= platform.right) {
            //console.log("This is the previous y: " + this.prevCollisionPointY);
            //console.log("This is the current y: " + this.collisionPointY);
            console.log("This is my current x pos: " + this.collisionPointX);
            //console.log("This is the top of the plat: " + platform.top);
            console.log("this is the left of the plat: " + platform.left);
            console.log("This is the right of the plat: " + platform.right);
            //possibly need two checks here? if the previous collisionPointY was greater than the platform top too
            //problem here is as soon as I hit the jump key I'm above the ground and below platform1 so I'll teleport up
            //if the old position is above the collidable plat and the new one dips below
            if(this.prevCollisionPointY <= platform.top) {
                if (this.collisionPointY >= platform.top) {
                    console.log("collision detected");
                    this.y = platform.top - this.h;
                    this.yVel = 0;
                    this.prevCollisionPointY = platform.top;
                }
            }
        }
    }
}


class platform extends gameObject{
    constructor(x, y, w, h){
        super(x,y,w,h);
    }

    get top(){
        return this.y;
    }

    get left(){
        return this.x;
    }

    get right(){
        return this.x + this.w;
    }

    resizeSprite() {
        //proportionate x and y positions based on canvas resizing
        this.x = this.x * canvas.width / oldWidth;
        this.y = this.y * canvas.height / oldHeight;
        this.w = this.w * canvas.width / oldWidth;
        this.h = this.h * canvas.height /oldHeight;
    }
    update(){
        this.resizeSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    //platforms need their own resizing method
}

var theFloor = new platform(0 - outOfBounds, canvas.height - 2, canvas.width + outOfBounds, 2);
var matt = new player(canvas.width - canvas.width * .95, ground - 2,
    canvas.width * .18, canvas.height *.3, picArray, picLeftArray);
var platform2 = new platform(canvas.width/2 - 200, canvas.height - 200, canvas.width/2, 20);
var platform1 = new platform(0, canvas.height - 500, canvas.width/2 + 200, 20);
var platArray = [platform1, platform2, theFloor];


function animate(){
    requestAnimationFrame(animate);
    //fit to parent container needs to be here to resize the canvas whenever the screen is resized
    fitToParentContainer(canvas);
    draw();

    platArray.forEach(function(plat){
        plat.update();
    })

    matt.update();
    //this is probably not where this loop should go, probably in the board class down the line
    //controls scrolling so you don't go out of bounds of the canvas
    if(matt.x < -matt.w){
        console.log("This is Matt's x: " + matt.x);
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
document.querySelector('body').onkeydown = function (e) {

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
}