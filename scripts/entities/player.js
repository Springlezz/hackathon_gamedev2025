import AnimatedTexture from '../animated-texture.js';
import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const [textureStay, textureWalk, textureJump, textureBattery] = await Promise.all([
    Texture.load('player-stay'),
    AnimatedTexture.load('player-walk', 8, 70),
    AnimatedTexture.load('player-jump', 9, 120),
    Texture.load('battery'),
]);

export default class Player extends Entity {
    size = new Vector2(17, 43);
    static = false;
    onGround = false;
    onLadder = false;
    invert = false;
    hasBattery = false;

    getTexture() {
        return this.onGround || this.onLadder ? Math.abs(this.velocity.x) > 0.01 ? textureWalk : textureStay : textureJump;
    }

    render(ctx, dt) {
        if (this.velocity.x < 0 !== this.invert) this.invert = !this.invert;
        this.getTexture().render(ctx, dt, this.position, 0, this.invert ? -1 : 1);

        // if (this.hasBattery) textureBattery.render(ctx, dt, this.position.clone().add(new Vector2(0, -this.size.y / 2 - 5)), 0, this.invert ? -1 : 1);
    }
}