import * as PIXI from 'pixi.js';
import { AppManager } from "./app-manager";
import { Config } from "./config";
import { ElementsSpinner } from "./elements-spinner";
import { SpinButton } from "./spin-button";

export class Main {

    spinButton;
    elementsSpinner;

    constructor() {
        AppManager.instance.loadAssets(Config.assets, this.initScene.bind(this));
    }

    initScene() {
        this.drawBg();
        this.drawSpinButton();
        this.drawElementsSpinner();
        
        AppManager.instance.ticker.add((delta) => {
            this.elementsSpinner.update(delta);
        });
    }

    drawElementsSpinner() {
        this.elementsSpinner = new ElementsSpinner(Config.elementsCount);
        this.elementsSpinner.setPosition(AppManager.instance.getSceneWidth() / 2, AppManager.instance.getSceneHeight() / 2);
        this.elementsSpinner.draw();
        this.elementsSpinner.setOnStop(() => {
            this.spinButton.setEnable(true);
        });
    }
 
    drawSpinButton() {
        this.spinButton = new SpinButton();
        this.spinButton.setPosition(AppManager.instance.getSceneWidth() - 70, AppManager.instance.getSceneHeight() - 70);
        this.spinButton.setOnClick(() => {
            this.spinButton.setEnable(false);
            this.elementsSpinner.startSpinning();
        });
    }

    drawBg() {
        const bg = new PIXI.Sprite(AppManager.instance.getTexture(Config.assets.bg)); 
        bg.width = AppManager.instance.getSceneWidth();
        bg.height = AppManager.instance.getSceneWidth();
        bg.buttonMode = true;
        AppManager.instance.stage.addChild(bg);
    }
}

window.onload = function () {
    new Main();
}