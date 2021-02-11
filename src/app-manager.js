import * as PIXI from 'pixi.js';

export class AppManager {

    _instance;
    pixiApp;
    resources;
    sceneWidth = 500;
    sceneHeight = 500;
    
    constructor() {
        if (AppManager._instance) {
            throw new Error("Error - use AppManager.шnstance");
        }
        this.initPixiApp();   
    }

    static get instance() {
        if (!AppManager._instance) {
            AppManager._instance = new AppManager();
        }
        return AppManager._instance;
    }

    get stage() {
        return this.pixiApp.stage;
    }

    get ticker() {
        return this.pixiApp.ticker;
    }

    initPixiApp() {
        this.pixiApp = new PIXI.Application({ 
            width: this.sceneWidth, 
            height: this.sceneHeight, 
            backgroundColor: 0xFFFFFF,
        });
        document.body.appendChild(this.pixiApp.view);
    }

    loadAssets(assets, onComplete) {
        const loader = new PIXI.Loader();
    
        Object.keys(assets).forEach(key => {
            loader.add(assets[key], assets[key]);
        });

        loader.onComplete.add((loader, resources) => {
            this.resources = resources;
            onComplete.call(this);
        });

        loader.load();
    }  
    
    getTexture(name) {
        return this.resources[name].texture;
    }

    getSceneWidth() {
        return this.sceneWidth;
    }

    getSceneHeight() {
        return this.sceneHeight;
    }    
}