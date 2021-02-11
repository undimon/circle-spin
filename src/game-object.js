export class GameObject {

    sprite;

    setPosition(x, y) {
        this.sprite.position.set(x, y);
    }

    randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}