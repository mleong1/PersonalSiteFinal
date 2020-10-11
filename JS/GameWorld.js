class GameWorld{
    constructor(canvas, ctx, oldWidth, oldHeight){
        this.canvas = canvas;
        this.ctx = ctx;
        this.oldWidth = oldWidth;
        this.oldHeight = oldHeight;
        /*outOfBounds here is just a little buffer that I end up adding to the floor to give 100 pixels to the left and 100 to the
        right more space.*/
        this.outOfBounds = 1000;
    }

    get currHeight(){
        return this.canvas.height;
    }

    get currWidth(){
        return this.canvas.width;
    }

    get context(){
        return this.ctx;
    }

    set context(ctx){
        this.ctx = ctx;
    }

    fitToParentContainer() {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.width = canvas.offsetWidth;
        this.canvas.height = canvas.offsetHeight;
        scrollpos = window.scrollY;
    }

    updateOldCanvas(){
        if(this.canvas.width != this.oldWidth){
            this.oldWidth = this.canvas.width;
        }

        if(this.canvas.height != this.oldHeight){
            this.oldHeight = this.canvas.height;
        }
    }
}