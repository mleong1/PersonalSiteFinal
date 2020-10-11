class GameObject{
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
    //Resize sprite constantly controls sprites size
    resizeSprite(currWidth, oldWidth, currHeight, oldHeight){
        //proportionate x and y positions based on canvas resizing
        this.x = this.x * currWidth/oldWidth;
        this.y = this.y * currHeight/oldHeight;
        this.h = this.h * currHeight/oldHeight;
        this.w = this.w * currWidth/oldWidth;
    }
}