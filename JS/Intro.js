//Ideally all the canvas and ground stuff would go in a class for the game board
var canvas = document.getElementById("intro");
//ctx allows for the drawing of 2d elements on the canvas
var ctx = canvas.getContext("2d");
fitToParentContainer(canvas);
let oldWidth = canvas.width;
let oldHeight = canvas.height;
/*outOfBounds here is just a little buffer that I end up adding to the floor to give 100 pixels to the left and 100 to the
  right more space.*/
var gameworld = new GameWorld(canvas, ctx, oldWidth, oldHeight);
//this line will probably work if we remove all the canvas calls when creating gameobjects
//gameworld.fitToParentContainer();

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
}

var controller = new Controller();
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
function keyDownHandler(e){
    if (e.key == 'd') {
        //move right
        controller.rightPressed = true;
        console.log(this.rightPressed);
    }
    if (e.key == 'a'){
        //move left
        controller.leftPressed = true;
    }
    if(e.key == "w"){
        //jump
        controller.upPressed = true;
    }
}

function keyUpHandler(e){
    if (e.key == 'd') {
        //move right
        console.log("right key is not pressed.");
        controller.rightPressed = false;
        console.log(this.rightPressed);
    }
    if(e.key == 'a'){
        //move left
        controller.leftPressed = false;
    }
    if(e.key == 'w'){
        //jump
        controller.upPressed = false;
    }
}

//There should be a start game function to put everything in their starting places
//There should be a reset to be called when the canvas isn't in view
//Classes player, platforms (extend platforms so that they can have textures and not just words), items, gameObj, and controller


var theFloor = new Platform(0 - gameworld.outOfBounds, gameworld.currHeight - 2, gameworld.currWidth + (gameworld.outOfBounds * 2), 2);
var matt = new Player(gameworld.currWidth - gameworld.currWidth * .95, gameworld.currHeight * 0.65,
    gameworld.currWidth * .18, gameworld.currHeight *.3, picArray, picLeftArray);
//text plat width value here is meaningless, its calculated later S
var textPlatTest2 = new TextPlatform(0, Math.round(canvas.height * 0.50), canvas.width/2, 40, "With an interest in front end design");
var textPlatTest1 = new TextPlatform(canvas.width/2 - canvas.width * 0.11, Math.round(canvas.height * 0.80), canvas.width * 0.22,
    40, "A programmer");
var textPlatTest3 = new TextPlatform(canvas.width/2 - canvas.width * 0.11, Math.round(canvas.height * 0.20), canvas.width * 0.22,
    40, "Matthew Leong");
var progLang = new TextPlatform(canvas.width * 0.05, Math.round(canvas.height * 0.55), canvas.width, 40, "Prog Languages");
var webTech = new TextPlatform(canvas.width * 0.36, Math.round(canvas.height * 0.55), canvas.width, 40, "Web Technologies");
var dataTech = new TextPlatform(canvas.width * 0.67, Math.round(canvas.height * 0.55), canvas.width, 40, "Database Technologies");
var java = new TextPlatform(canvas.width * 0.06, Math.round(canvas.height * 0.65), canvas.width, 40, "6 years of Java");
var python = new TextPlatform(canvas.width * 0.05, Math.round(canvas.height * 0.75), canvas.width, 40, "3 years of Python");
var frontEnd1 = new TextPlatform(canvas.width * 0.34, Math.round(canvas.height * 0.65), canvas.width, 40, "2 years of CSS, HTML,");
var frontEnd2 = new TextPlatform(canvas.width * 0.38, Math.round(canvas.height * 0.75), canvas.width, 40,"and Javascript");
var otherFrontEnd1 = new TextPlatform(canvas.width * 0.32, Math.round(canvas.height * 0.85), canvas.width, 40,"Experienced with Bootstrap");
var otherFrontEnd2 = new TextPlatform(canvas.width * 0.40, Math.round(canvas.height * 0.95), canvas.width, 40, "and jQuery");
var mySQL = new TextPlatform(canvas.width * 0.70, Math.round(canvas.height * 0.65), canvas.width, 40, "2 years of mySQL");

var platArray = [textPlatTest2, theFloor, textPlatTest1, textPlatTest3];
var bioPlatArray = [theFloor, progLang, webTech, dataTech, java, python, frontEnd1, frontEnd2, otherFrontEnd1, otherFrontEnd2, mySQL];
var projectPlatArray = [];
var game = new Game(matt, platArray, controller, gameworld);

//https://stackoverflow.com/questions/49228608/start-css-animation-after-scrolling-to-particular-section-of-page
//If we use this on scroll listener we can dynamically change which canvas is in use currently by just switching the
//canvas and context to point to the canvas in the next div. GameWorld is updating the scrollpos currently, not the right place.
var scrollpos = window.scrollY; // window scroll position
var endOfIntro = window.innerHeight; // as soon as element touches bottom with offset event starts
var endOfBio = window.innerHeight * 2;


var canvas2 = document.getElementById("bio");
//ctx allows for the drawing of 2d elements on the canvas
var ctx2 = canvas2.getContext("2d");
fitToParentContainer(canvas2);

var canvas3 = document.getElementById("projects");
var ctx3 = canvas3.getContext("2d");
fitToParentContainer(canvas3);

window.addEventListener('scroll', function(){
    if(scrollpos < 50){
        //clear the current canvas
        gameworld.context.clearRect(0, 0, canvas.width, canvas.height);
        gameworld.canvas = canvas;
        gameworld.context = ctx;
        game.gameWorld = gameworld;
        game.platArray = platArray;
    }
    if(scrollpos > endOfIntro && scrollpos < endOfBio){
        //clear the current canvas
        gameworld.context.clearRect(0, 0, canvas.width, canvas.height);
        gameworld.canvas = canvas2;
        gameworld.context = ctx2;
        game.gameWorld = gameworld;
        game.platArray = bioPlatArray;
    }
    if(scrollpos > endOfBio) {
        gameworld.context.clearRect(0, 0, canvas.width, canvas.height);
        gameworld.canvas = canvas3;
        gameworld.context = ctx3;
        game.gameworld = gameworld;
        game.platArray = projectPlatArray;
    }
});

function animate(){

    //fit to parent container needs to be here to resize the canvas whenever the screen is resized
    //fit to parent also seems to control redrawing the canvas
    game.gameWorld.fitToParentContainer();

    game.updateAllPlats();

    game.controlPlayer();

    game.updatePlayer();

    //this is the right spot for this for sure, no clue why it has to be - 40 as opposed to 3 or 10
    game.stopPlayerOutOfBoundsResize();

    game.keepPlayerInXBounds();

    game.checkCollisions();

    game.gameWorld.updateOldCanvas();

    requestAnimationFrame(animate);


}

animate();