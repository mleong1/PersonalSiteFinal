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

    get right() {
        return this.x + this.w;
    }

    resizeSprite() {
        //proportionate x and y positions based on canvas resizing
        this.x = this.x * canvas.width / oldWidth;
        this.y = this.y * canvas.height / oldHeight;
        this.w = this.w * canvas.width / oldWidth;
        this.h = this.h * canvas.height / oldHeight;
    }

    update() {
        this.resizeSprite();
        ctx.imageSmoothingEnabled = false;
        //ctx.fillText("A really cool guy.", this.x + canvas.width * 0.11, this.y + this.h * 1.75, this.w);
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    //platforms need their own resizing method
}