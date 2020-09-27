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
    resizeSprite(){
        //proportionate x and y positions based on canvas resizing
        this.x = this.x * canvas.width/oldWidth;
        this.y = this.y * canvas.height/oldHeight;
        this.h = canvas.height *.3;
        this.w = canvas.width * .18;
    }
}