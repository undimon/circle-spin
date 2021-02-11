import * as PIXI from 'pixi.js';
import { AppManager } from "./app-manager";
import { Config } from "./config";
import { GameObject } from './game-object';

export class Element extends GameObject {

    angleOffset = 100;
    size = 70;
    imageNames = [
        Config.assets.a,
        Config.assets.j,
        Config.assets.k,
        Config.assets.q
    ]

    constructor() {
        super();
        this.sprite = PIXI.Sprite.from(AppManager.instance.getTexture(this.getRandomImageName()));         
        this.sprite.width = this.size;
        this.sprite.height = this.size;
        AppManager.instance.stage.addChild(this.sprite);
    }

    getRandomImageName() {
        return this.imageNames[this.randomInt(0, this.imageNames.length - 1)];
    }

    setAngle(degrees) {
        this.sprite.angle = degrees + this.angleOffset;
    }
}