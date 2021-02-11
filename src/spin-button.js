import * as PIXI from 'pixi.js';
import { AppManager } from "./app-manager";
import { Config } from "./config";
import { GameObject } from './game-object';

export class SpinButton extends GameObject {

    initScale = 0.7;
    onClick;
    
    constructor() {
        super();

        this.sprite = new PIXI.Sprite();   
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(this.initScale);

        this.sprite.on('pointerover', this.onPointerOver.bind(this));
        this.sprite.on('pointerout', this.onPointerOut.bind(this));
        this.sprite.on('pointerdown', this.onPointerDown.bind(this));
        this.sprite.on('pointerup', this.onPointerUp.bind(this));

        AppManager.instance.stage.addChild(this.sprite);

        this.setEnable(true);
    }

    setOnClick(callback) {
        this.onClick = callback;
    }

    onPointerOver() {
        this.sprite.scale.set(this.initScale * 1.05);
    }

    onPointerOut() {
        this.sprite.scale.set(this.initScale);
    }

    onPointerUp() {
        this.sprite.scale.set(this.initScale);
    }

    onPointerDown() {
        this.sprite.scale.set(this.initScale * 0.95);
        this.onClick();
    }
    
    onPointerUp() {
        this.sprite.scale.set(this.initScale);
    }

    setEnable(enable) {
        if (enable) {
            this.sprite.texture = AppManager.instance.getTexture(Config.assets.spinEnabled);         
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
        }
        else {
            this.sprite.texture = AppManager.instance.getTexture(Config.assets.spinDisabled);         
            this.sprite.interactive = false;
            this.sprite.buttonMode = false;            
        }
    }
}