class Controller{
    constructor(){
        //todo need to get these constructor variables to work somehow
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false
    }

    //I had three instance variables here, one for each input set to false, didn't work
    keyDownHandler(e){
        if (e.key == 'd') {
            //move right
            rightPressed = true;
            console.log("right key is pressed!");
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
        if (e.key == 'd') {
            //move right
            console.log("right key is not pressed.");
            rightPressed = false;
            console.log(this.rightPressed);
        }
        if(e.key == 'a'){
            //move left
            leftPressed = false;
        }
        if(e.key == 'w'){
            //jump
            upPressed = false;
        }
    }
}