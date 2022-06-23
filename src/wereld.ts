import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Game } from "./game";

export class Foreground extends PIXI.Sprite {
  private rigidBody: Matter.Body;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 100;
    this.y = 530;
    this.anchor.set(0.5);
    this.width = 18000
    this.height = 200

    this.rigidBody = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, {

      isStatic: true
    });
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
  }
}