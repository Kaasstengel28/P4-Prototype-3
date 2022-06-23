import * as PIXI from "pixi.js"

export class Bubble extends PIXI.Sprite {
    public speedx: number;
    public speedy: number;

    constructor(texture: PIXI.Texture) {
        super(texture)

        //de positie van de bubbels wordt hier bepaalt
        this.x = Math.random() * 1880
        this.y = Math.random() * 800;

        //hier wordt de snelheid van de bubbels bepaalt
        this.speedy = Math.random() * 0.5;
        this.speedx = Math.random() * 2;

        this.scale.set(0.05, 0.05)
    }

    update(delta: number) {
        //hier wordt de snelheid toegepast zodat ze bewegen
        this.y += this.speedy
        this.x += this.speedx

        if (this.x > 2000) {
            this.x = -100
            this.y = Math.random() * 600
        } else if (this.y > 600) {
            this.x = -100
            this.y = Math.random() * 600
        }
    }
}
