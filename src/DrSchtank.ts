import * as PIXI from "pixi.js"

export class Godslug extends PIXI.Sprite {
    talking = false;
    
    constructor(texture: PIXI.Texture, ) {
        super(texture)

        this.interactive = true;
        this.buttonMode = true;
        
        this.on('pointerdown', () => this.stinkyClicked())        
        
        this.x = 1600;
        this.y = 249;
        
       this.scale.set(0.3, 0.3)
    }

    public stinkyClicked() {
        console.log("you smell like you farded")
        this.talking = !this.talking;
        this.stinkyTalking()
    }

    stinkyTalking() {
    }

    update(delta:number) {
        if(this.talking == true) {


        }
    }
}