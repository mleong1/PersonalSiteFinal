class Game{
    constructor(player, platArray, controller, gameWorld){
        this.player = player;
        this.platArray = platArray;
        this.controller = controller;
        this.gameWorld = gameWorld;
    }

    updateAllPlats(){
        this.platArray.forEach(function(plat){
            plat.update(gameworld);
        })
    }

    updatePlayer(){
        this.player.update(this.gameWorld);
    }

    controlPlayer(){
        //if checks can't be conditional here otherwise you won't be able to run and jump
        //https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
        //game.checkControllerRightPressed();
        if(this.controller.rightPressed){
            this.player.xVelocity += 5;
        }
        if(this.controller.leftPressed){
            this.player.xVelocity -= 5;
        }
        if(this.controller.upPressed){
            this.player.jump(canvas.height * 0.1);
        }
    }


    stopPlayerOutOfBoundsResize() {
        if (this.controller.leftPressed == false && this.controller.rightPressed == false && this.controller.upPressed == false) {
            //buffer of 3
            this.player.prevCollisionPointY = this.player.collisionPointY - 40;
        }
    }

    keepPlayerInXBounds(){
        if(this.player.x < -this.player.w){
            this.player.x = this.gameWorld.currWidth;
        } else if (this.player.x > canvas.width){
            this.player.x = -this.player.w
        }
    }

    checkCollisions(){
        //https://stackoverflow.com/questions/29626729/how-to-function-call-using-this-inside-foreach-loop/29626762
        let self = this;
        this.platArray.forEach(function(plat){
            self.player.checkCollision(plat);
        })
    }
}