var canvas = document.getElementById("intro");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");
let xMove = 0;
let yMove = 0;

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



function fitToParentContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function draw() {
    //text of my name
    ctx.font = "50px Roboto";
    ctx.textAlign = "center";
    ctx.fillText("Matthew Y Leong", canvas.width / 2, canvas.height / 2);
}

//There should be a start game function to put everything in their starting places
//There should be a reset to be called when the canvas isn't in view
//Classes player, platforms (extend platforms so that they can have textures and not just words), items

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
}

class player extends gameObject{
    constructor(x, y, w, h, leftArr, rightArr) {
        super(x, y, w, h);
        this.leftArr = leftArr;
        this.rightArr = rightArr;
        this.xVel = 0;
        this.yVel = 0;
    }

    update(){
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.leftArr[0], this.x, this.y, this.w, this.h);
    }
}


var matt = new player(canvas.width - canvas.width * .20 + xMove, canvas.height - canvas.height * .30,
    canvas.width * .18, canvas.height *.3, picArray, picArray);

function animate(){
    requestAnimationFrame(animate);
    //fit to parent container needs to be here to resize the canvas whenever the screen is resized
    fitToParentContainer(canvas);
    draw();
    //Todo remove magic numbers
    matt.xCor = canvas.width - canvas.width * .20 + xMove;
    matt.yCor = canvas.height - canvas.height * .30;
    matt.height = canvas.height *.3;
    matt.weight = canvas.width * .18;
    matt.update();
    //console.log(matt.x);

}

animate();




document.querySelector('body').onkeydown = function (e) {

    //right direction
    if (e.keyCode == 39) {
        xMove += 15;
        console.log("heard");
    } else if(e.keyCode == 37){
        xMove -= 15;
    }
}