class Platform extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    get top() {
        return this.y;
    }

    get left() {
        return this.x;
    }

    //this doesn't work well when the left is negative
    //the floor platform seems to be the only thing that dips into negative space so it might be OK to just add more to the right to compensate
    get right() {
        return this.x + this.w;
    }

    update(gameWorld) {
        this.resizeSprite(gameWorld.currWidth, gameWorld.oldWidth, gameWorld.currHeight, gameWorld.oldHeight);
        gameWorld.context.imageSmoothingEnabled = false;
        //ctx.fillText("A really cool guy.", this.x + canvas.width * 0.11, this.y + this.h * 1.75, this.w);
        gameWorld.context.fillRect(this.x, this.y, this.w, this.h);
    }

    //platforms need their own resizing method
}