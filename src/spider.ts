import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Game } from "./game";

export class Spider extends PIXI.Sprite {
  private rigidBody: Matter.Body;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 400
    this.y = 50
    this.anchor.set(0.5);
    this.scale.set(0.5);

    this.rigidBody = Matter.Bodies.circle(100, 100, 30 , { friction: 0.00001, restitution: 0.5, density: 0.001});
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.reset()
  }

  public update() {
    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
    this.rotation = this.rigidBody.angle;
    Matter.Body.setVelocity(this.rigidBody, { x: 2, y: 5});

    if (this.rigidBody.position.y > 1000) {
      this.reset()
    }
  }

  reset(){
      Matter.Body.setPosition(this.rigidBody, { x: 400, y: 50 });
    }
  }