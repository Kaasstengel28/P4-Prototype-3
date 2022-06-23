import * as PIXI from 'pixi.js'
import matter from 'matter-js'
//fotos importeren
import bubbleImage from "./images/sakura.png"
import backgroundImage from "./images/background.png"
import deathImage from "./images/bones.png"
import foregroundImage from "./images/foreground.png"
import godslugImage from "./images/godslug.png"
import idle from "./images/idle.png"
import platformImage from "./images/foreground.png"
import spiderImage from "./images/shark.png"

//classes importeren
import { TilingSprite } from 'pixi.js'
import { Bubble } from "./particles"
import { Player } from "./player"
import { Foreground } from "./wereld"
import { Platform } from "./platform"
import { Spider } from "./spider"

export class Game {
    //hier import hij de classes
    public bubble: Bubble;
    public bubbles: Bubble[];
    public player: Player;
    public spider: Spider;

    public platform: Platform;
    public foreground: Foreground;
    public background: PIXI.TilingSprite;

    public pixi: PIXI.Application
    public loader: PIXI.Loader
    public mylistener: EventListener
    public engine: matter.Engine;

    constructor() {
        this.engine = matter.Engine.create()
        this.bubbles = [];

        this.mylistener = (e: Event) => this.logMessage(e)
        window.addEventListener('click', this.mylistener)

        //het gameveld wordt aangemaakt
        this.pixi = new PIXI.Application({ width: 1800, height: 600 })
        document.body.appendChild(this.pixi.view)

        //laad de images alvast
        this.loader = new PIXI.Loader()
        this.loader
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', backgroundImage)
            .add('deadTexture', deathImage)
            .add('foreground', foregroundImage)
            .add('stinkySprite', godslugImage)
            .add('playerTexture', idle)
            .add('platformTexture', platformImage)
            .add('spiderTexture', spiderImage)

        //al zijn de images geladen roept hij de functie aan
        this.loader.load(() => this.doneLoading())
    }
    //hier  zet hij de event listeners uit
    private logMessage(e: Event) {
        console.log("hij is maar nu niet meer")
        window.removeEventListener("click", this.mylistener)
    }

    //zodra de sprites klaar zijn met laden begint hij met updaten
    private doneLoading() {
        this.engine = matter.Engine.create()
        //hier maakt hij de wereld (achtergrond/voorgrond) aan
        this.background = new PIXI.TilingSprite(this.loader.resources["waterTexture"].texture!, this.pixi.view.width, this.pixi.view.height)
        this.pixi.stage.addChild(this.background)

        //hier maakt hij alle sprites aan
        this.player = new Player(this.loader.resources["playerTexture"].texture!, this)
        this.pixi.stage.addChild(this.player)

        this.bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
        this.pixi.stage.addChild(this.bubble)

        this.platform = new Platform(this.loader.resources["platformTexture"].texture!, this)
        this.pixi.stage.addChild(this.platform)

        this.spider = new Spider(this.loader.resources["spiderTexture"].texture!, this)
        this.pixi.stage.addChild(this.spider)

        //hier zorgt hij ervoor dat er meerdere sprites komen
        for (let i = 0; i < 20; i++) {
            let temp = new Bubble(this.loader.resources["bubbleTexture"].texture!);
            this.pixi.stage.addChild(temp);
            this.bubbles.push(temp);
        }
        //dit zorgt ervoor dat de update functie kan updaten
        this.pixi.ticker.add((delta) => this.update(delta))

        this.foreground = new Foreground(this.loader.resources["foreground"].texture!, this)
        this.pixi.stage.addChild(this.foreground)
    }

    private update(delta: number) {
        matter.Engine.update(this.engine, 1000 / 60)
        //dit update de bubbels zodat ze bewegen
        for (let bubble of this.bubbles) {
            bubble.update(delta)
        }

        //dit update de ahtergrond en de player
        this.background.tilePosition.x += 0.25
        this.player.update()
        this.spider.update()
    }
}

new Game()