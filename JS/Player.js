class Player extends GameObject{
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


    update(gameWorld){
        //Order of these operations really matters
        //Collision point x and y both depend on x and y after they are affected by velocity, they need to be updated
        //after x and y have been updated

        //todo this doesn't stop double jumps, yVel goes positive during a jump yes, but on the way down its negative in air: FIXED!
        /*really you want to update the previous collision point y if you're falling or jumping. If you're falling and you don't update
          prev collision point y, you will satisfy the conditions of the collision detection if you fall off a platform but move your x
          pos inside of it.
         */

        this.checkIfCanJump();
        //prevCollisionPointY has to go here first
        this.updatePreviousYColPoint();

        //Because the y collision point isn't factored into resize sprite, if you resize the browser the collisionPointY
        //will go beyond the ground or whatever plat you're on.
        this.resizeSprite(gameWorld.currWidth, gameWorld.oldWidth, gameWorld.currHeight, gameWorld.oldHeight);
        this.updateXPos();
        this.updateYPos();
        this.updateCollisionPoints();
        this.checkIfStoppedX();
        //7 total walking frames, total number of frames is 20 for 0 - 20. Every 3 updates is represented by a frame in this case
        this.drawFrame(20, gameWorld.context);
    }


    //Function to check if the characters's yVel is 0 to restore its jump
    checkIfCanJump(){
        if(this.yVel == 0){
            this.isJumping = false;
        }
    }

    //Function that updates the previous Y Col Point if you are jumping or falling. Used in collision detection to see if the character
    //is coming from a higher place to land on the top of a platform
    updatePreviousYColPoint(){
        if(this.yVel != 0){
            this.prevCollisionPointY = this.collisionPointY;
            //prevCollisionPointY is really y pos + whatever the jump height is set to
        }
    }

    //Function to update the X position of the player based on the xVel. xVel gets updated by game logic via controller inputs
    updateXPos(){
        this.x += this.xVel;
        this.xVel *= 0.8;
    }

    //Function to update the Y position of the player based on the yVel. vVel gets updated by game logic via controller inputs
    updateYPos(){
        this.y -= this.yVel;
        this.yVel *= 0.9;
        //gravity
        this.yVel -= 3;
    }

    //Function to set collision point at the very bottom and middle of the player object
    updateCollisionPoints(){
        this.collisionPointX = this.x + this.w /2;
        this.collisionPointY = this.y + this.h;
    }

    //Function to check to see if character's xVelocity and yVelocity has been multiplied by 0.9 enough so that its basically 0
    checkIfStoppedX(){
        if(this.xVel > 0 && this.xVel < 1){
            this.xVel = 0;
        }
        if(this.xVel < 0 && this.xVel > -1){
            this.xVel = 0;
        }
    }

    //Function that handles drawing the next frame of animation in the character's walk cycle from the left and right image arrays.
    //Requires the number of walking frames (more cycles through animation frames slower) and the context to draw in.
    drawFrame(numWalkingFrames, ctx){
        if(this.currentFrame > numWalkingFrames){
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
            ctx.drawImage(this.rightArr[Math.floor(this.currentFrame/(numWalkingFrames/7))], this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.leftArr[Math.floor(this.currentFrame/(numWalkingFrames/7))], this.x, this.y, this.w, this.h);
        }
    }

    //Function that increases character's yVel if they have a jump
    jump(height){
        if(!this.isJumping){
            this.yVelocity += height;
            this.isJumping = true;
        }
    }

    //Function to check collisions with platforms via box method
    checkCollision(platform){

        if (this.collisionPointX >= platform.left && this.collisionPointX <= platform.right) {
            /*
            console.log("This is the previous y: " + this.prevCollisionPointY);
            console.log("This is the current y: " + this.collisionPointY);
            console.log("This is my current x pos: " + this.collisionPointX);

            console.log("This is the top of the plat: " + platform.top);
            console.log("this is the left of the plat: " + platform.left);
            console.log("This is the right of the plat: " + platform.right);*/

            //Todo resize bug: top condition will fall through if I resize the browser on a platform because the prev doesn't change while
            //not moving but the platform top will be resizing
            if(this.prevCollisionPointY <= platform.top) {
                if (this.collisionPointY >= platform.top) {
                    //at this point you're on top of the plat
                    this.y = platform.top - this.h;
                    this.yVel = 0;
                }
            }
        }
    }
}