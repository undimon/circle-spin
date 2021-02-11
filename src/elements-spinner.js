import * as PIXI from 'pixi.js';
import { Element } from "./element";
import { Config } from '../src/config';
import { AppManager } from './app-manager';
import { GameObject } from './game-object';

export class ElementsSpinner extends GameObject {

    totalSpinsCount = Config.spinsCount;
    currentSpinsCount = 0;
    angle = 0;
    speed = 0;
    acceleration = 0;
    radius = Config.circleRadius;
    circlePosition = new PIXI.Point(200, 200);
    isSpinning = false;
    onStop;
    elements = [];

    constructor(elementsCount) {
        super();

        for (let i = 0; i < elementsCount; i++) {
            const element = new Element();
            this.elements.push(element);
        }         
    }

    setPosition(x, y) {
        this.circlePosition = new PIXI.Point(x, y);
    }

    setOnStop(callback) {
        this.onStop = callback;
    }

    startSpinning() {
        this.isSpinning = true;
        this.currentSpinsCount = 0;
        this.acceleration = 1;
        this.angle = 0;
        this.speed = 0;
    }

    stopSpinning() {
        this.isSpinning = false;
        this.onStop();
    }

    update(delta) {
        if (!this.isSpinning) {
            return;
        }
        this.draw(delta);
    }
    
    draw(delta = 0) {
        this.elements.forEach((element, i) => {
            const angle = this.angle + (360 / this.elements.length) * i;
            const newX = this.circlePosition.x + this.radius * Math.cos(angle * Math.PI / 180);
            const newY = this.circlePosition.y + this.radius * Math.sin(angle * Math.PI / 180);
            element.setPosition(newX, newY);
            element.setAngle(angle);
        })

        if (this.currentSpinsCount < 2) {
            this.speed++;
        }
        if (this.currentSpinsCount > this.totalSpinsCount - 2 && this.speed > 2) {
            this.speed--;
        }

        this.angle = this.angle + this.speed * 0.1 * delta;

        if (this.angle > 360) { 
            this.angle = 0;
            this.currentSpinsCount++;
        }

        if (this.currentSpinsCount > this.totalSpinsCount) {
            this.stopSpinning();
        }
    }
}