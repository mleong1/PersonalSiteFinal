class TextPlatform extends Platform{
    constructor(x, y, w, h, text) {
        super(x, y, w, h);
        this.text = text;
    }

    /*Have to override the platform class top method here because it seems fillText starts from the y value as the bottom
      and goes up, and fillRect starts from the y value as the top of the rectangle.
    */
    get top(){
        return this.y - this.h;
    }

    update(gameWorld) {
        this.resizeSprite(gameWorld.currWidth, gameWorld.oldWidth, gameWorld.currHeight, gameWorld.oldHeight);
        gameWorld.context.font = this.h + 'px Arial';
        gameWorld.context.imageSmoothingEnabled = false;
        this.w = gameWorld.context.measureText(this.text).width;
        //ctx.fillText("A really cool guy.", this.x + canvas.width * 0.11, this.y + this.h * 1.75, this.w);
        gameWorld.context.fillText(this.text, this.x, this.y);
    }
}